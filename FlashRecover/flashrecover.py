"""FlashRecover 0.1 - Windows removable media laboratory."""
import base64, ctypes, hashlib, json, os, queue, secrets, subprocess, sys, threading, time
from ctypes import wintypes as W
from pathlib import Path

MIB=1024**2
GIB=1024**3
START=MIB
VERSION="0.1.1"
BUS={"USB","SD","MMC"}
class Cancelled(Exception): pass

def disk_identity(d):
    return tuple(str(d.get(k,"")) for k in ("Number","Path","UniqueId","SerialNumber","Size","LogicalSectorSize","PhysicalSectorSize","BusType"))
def eligible(d):
    return (d.get("Number") not in (None,0,"0") and d.get("BusType") in BUS
            and d.get("IsBoot") is False and d.get("IsSystem") is False
            and d.get("IsOffline") is False and d.get("IsReadOnly") is False
            and bool(d.get("Path")) and int(d.get("Size") or 0)>2*MIB
            and int(d.get("LogicalSectorSize") or 0) in (512,1024,2048,4096)
            and int(d.get("PhysicalSectorSize") or 0) in (512,1024,2048,4096))
def ps(script):
    script="$ErrorActionPreference='Stop'; $ProgressPreference='SilentlyContinue'; [Console]::OutputEncoding=[Text.Encoding]::UTF8; "+script
    encoded=base64.b64encode(script.encode("utf-16-le")).decode("ascii")
    p=subprocess.run(["powershell.exe","-NoProfile","-NonInteractive","-EncodedCommand",encoded],
        capture_output=True,encoding="utf-8",errors="replace",creationflags=getattr(subprocess,"CREATE_NO_WINDOW",0))
    if p.returncode: raise RuntimeError((p.stderr or p.stdout).strip())
    return p.stdout.strip()
FIELDS="Number,FriendlyName,Path,UniqueId,SerialNumber,Size,LogicalSectorSize,PhysicalSectorSize,BusType,IsBoot,IsSystem,IsOffline,IsReadOnly,NumberOfPartitions,PartitionStyle,HealthStatus,OperationalStatus"
def disks():
    raw=ps("Get-Disk | Select-Object "+FIELDS+" | ForEach-Object { $_.BusType=[string]$_.BusType; $_.PartitionStyle=[string]$_.PartitionStyle; $_ } | ConvertTo-Json -Depth 4 -Compress")
    if not raw:return []
    d=json.loads(raw)
    return d if isinstance(d,list) else [d]
def check(d,empty=False):
    visible=disks()
    current=next((x for x in visible if x["Number"]==d["Number"]),None)
    if not current or not eligible(current) or disk_identity(current)!=disk_identity(d):
        raise RuntimeError("Dispositivo mudou, desapareceu ou nao passou na protecao de disco.")
    if empty and sum(eligible(x) for x in visible)!=1:
        raise RuntimeError("Desconecte outros dispositivos externos elegiveis antes de gravar.")
    if empty and (current.get("NumberOfPartitions")!=0 or current.get("PartitionStyle") not in ("RAW","MBR")):
        raise RuntimeError("O teste RAW exige disco vazio, sem particoes, RAW ou MBR.")
    return current
def quote(s): return "'"+str(s).replace("'","''")+"'"
def guarded_ps(d,action,empty=False):
    check(d,empty)
    checks=["$d.IsBoot","$d.IsSystem","$d.IsOffline","$d.IsReadOnly","$d.Number -eq 0",
            "@('USB','SD','MMC') -notcontains [string]$d.BusType"]
    for key in ("Path","UniqueId","SerialNumber","Size","LogicalSectorSize","PhysicalSectorSize","BusType"):
        checks.append("[string]$d."+key+" -cne "+quote(d.get(key,"") if d.get(key) is not None else ""))
    if empty: checks+=["$d.NumberOfPartitions -ne 0","@('RAW','MBR') -notcontains [string]$d.PartitionStyle"]
    return ps("$d=Get-Disk -Number "+str(int(d["Number"]))+"; if ("+" -or ".join("("+s+")" for s in checks)+"){throw 'Identidade ou protecao de disco mudou'}; "+action)
def sample_offsets(size,align,count):
    last=(size-align)//align*align
    if last<START: raise ValueError("Disco pequeno demais")
    offsets={START,last}
    for i in range(count):
        offsets.add((START+(last-START)*i//max(1,count-1))//align*align)
    x=2*MIB
    while x<=last:
        offsets.update((x-align,x))
        x*=2
    return sorted(x for x in offsets if START<=x<=last)
def pattern(seed,offset,length):
    return hashlib.shake_256(seed+offset.to_bytes(8,"little")).digest(length)
def verify(io,offsets,length,log,cancel,write=False,seed=None):
    """Writes ALL positions before any readback, exposing sampled aliasing."""
    seed=seed or secrets.token_bytes(32)
    results={}
    consecutive=0
    if write:
        for i,o in enumerate(offsets):
            if cancel.is_set():raise Cancelled()
            try:
                io.write(o,pattern(seed,o,length));consecutive=0
            except OSError as e:
                results[o]=("write_error",str(e));consecutive+=1
                log("Falha de gravacao em 0x%x: %s"%(o,e))
                if consecutive>=3:raise RuntimeError("Tres falhas consecutivas de gravacao; operacao abortada. Nenhuma capacidade aprovada.") from e
            if i%32==0:log("Gravacao %d/%d"%(i+1,len(offsets)))
        io.flush()
        io.reopen()
    consecutive=0
    for i,o in enumerate(offsets):
        if cancel.is_set():raise Cancelled()
        try:
            data=io.read(o,length);consecutive=0
            if o not in results:
                results[o]=("ok","") if not write or data==pattern(seed,o,length) else ("mismatch","Dados retornados diferentes")
        except OSError as e:
            consecutive+=1
            if o not in results:results[o]=("read_error",str(e))
            log("Falha de leitura em 0x%x: %s"%(o,e))
            if consecutive>=3 and write:raise RuntimeError("Tres falhas consecutivas de leitura apos gravacao; nenhuma capacidade aprovada.") from e
            if consecutive>=3 and not write:
                log("Leitura interrompida apos tres falhas consecutivas. Restante nao testado.");break
        if i%32==0:log("Leitura %d/%d"%(i+1,len(offsets)))
    return results
def continuous_prefix(results,chunk):
    end=START
    for o in sorted(results):
        if o!=end or results[o][0]!="ok":break
        end+=chunk
    return end
def summary(results):
    out={}
    for state,_ in results.values():out[state]=out.get(state,0)+1
    return out

class RawDisk:
    """Unbuffered, aligned I/O via Windows APIs. Never selects a disk itself."""
    def __init__(self,d,writable):
        self.d=d;self.writable=writable;self.handle=None;self.ptr=None
        self.k=ctypes.WinDLL("kernel32",use_last_error=True)
        k=self.k
        k.CreateFileW.argtypes=[W.LPCWSTR,W.DWORD,W.DWORD,ctypes.c_void_p,W.DWORD,W.DWORD,W.HANDLE];k.CreateFileW.restype=W.HANDLE
        k.CloseHandle.argtypes=[W.HANDLE];k.CloseHandle.restype=W.BOOL
        k.SetFilePointerEx.argtypes=[W.HANDLE,ctypes.c_longlong,ctypes.c_void_p,W.DWORD];k.SetFilePointerEx.restype=W.BOOL
        for fn in (k.ReadFile,k.WriteFile):
            fn.argtypes=[W.HANDLE,ctypes.c_void_p,W.DWORD,ctypes.POINTER(W.DWORD),ctypes.c_void_p];fn.restype=W.BOOL
        k.VirtualAlloc.argtypes=[ctypes.c_void_p,ctypes.c_size_t,W.DWORD,W.DWORD];k.VirtualAlloc.restype=ctypes.c_void_p
        k.VirtualFree.argtypes=[ctypes.c_void_p,ctypes.c_size_t,W.DWORD];k.VirtualFree.restype=W.BOOL
        k.FlushFileBuffers.argtypes=[W.HANDLE];k.FlushFileBuffers.restype=W.BOOL
        self.align=max(int(d["LogicalSectorSize"]),int(d["PhysicalSectorSize"]))
        self.open()
    def open(self):
        check(self.d,self.writable)
        access=0x80000000 | (0x40000000 if self.writable else 0)
        h=self.k.CreateFileW(r"\\.\PhysicalDrive"+str(self.d["Number"]),access,3,None,3,0x20000000|(0x80000000 if self.writable else 0),None)
        if h in (None,ctypes.c_void_p(-1).value):raise ctypes.WinError(ctypes.get_last_error())
        self.handle=h
        try:check(self.d,self.writable)
        except Exception:
            self.close();raise
    def close(self):
        if self.handle is not None:self.k.CloseHandle(self.handle);self.handle=None
    def __enter__(self):return self
    def __exit__(self,*args):self.close()
    def reopen(self):
        self.close()
        check(self.d,self.writable)
        self.open()
    def flush(self):
        if self.writable and not self.k.FlushFileBuffers(self.handle):raise ctypes.WinError(ctypes.get_last_error())
    def transfer(self,offset,n,data=None):
        if offset<0 or offset+n>int(self.d["Size"]) or offset%self.align or n%self.align or n<=0 or n>8*MIB:
            raise ValueError("I/O fora dos limites ou desalinhado")
        if data is not None and (not self.writable or offset<START):raise PermissionError("Gravacao bloqueada")
        buf=self.k.VirtualAlloc(None,n,0x3000,4)
        if not buf:raise ctypes.WinError(ctypes.get_last_error())
        try:
            if not self.k.SetFilePointerEx(self.handle,offset,None,0):raise ctypes.WinError(ctypes.get_last_error())
            done=W.DWORD()
            if data is None:ok=self.k.ReadFile(self.handle,buf,n,ctypes.byref(done),None)
            else:
                ctypes.memmove(buf,data,n)
                ok=self.k.WriteFile(self.handle,buf,n,ctypes.byref(done),None)
            if not ok:raise ctypes.WinError(ctypes.get_last_error())
            if done.value!=n:raise OSError("Transferencia incompleta: %s/%s"%(done.value,n))
            return ctypes.string_at(buf,n) if data is None else None
        finally:self.k.VirtualFree(buf,0,0x8000)
    def read(self,o,n):return self.transfer(o,n)
    def write(self,o,b):self.transfer(o,len(b),b)

def self_test():
    class Fake:
        def __init__(self,size):self.data=bytearray(size)
        def write(self,o,b):
            o%=len(self.data);self.data[o:o+len(b)]=b
        def read(self,o,n):
            o%=len(self.data);return bytes(self.data[o:o+n])
        def flush(self):pass
        def reopen(self):pass
    ev=threading.Event(); quiet=lambda s:None
    result=verify(Fake(8*MIB),[START,2*MIB,3*MIB],4096,quiet,ev,True,b"x"*32)
    assert summary(result)=={"ok":3}
    result=verify(Fake(2*MIB),[START,3*MIB],4096,quiet,ev,True,b"x"*32)
    assert summary(result)=={"mismatch":1,"ok":1}
    assert continuous_prefix({START:("ok",""),2*MIB:("read_error",""),3*MIB:("ok","")},MIB)==2*MIB
    assert continuous_prefix({START:("ok",""),3*MIB:("ok","")},MIB)==2*MIB
    offsets=sample_offsets(960*GIB,4096,256)
    assert offsets==sorted(set(offsets)) and offsets[0]==START and offsets[-1]==960*GIB-4096
    assert all(x%4096==0 for x in offsets)
    assert not eligible({"Number":0,"BusType":"USB"})
    assert not eligible({"Number":2,"BusType":"SATA"})
    class Broken(Fake):
        def write(self,o,b):raise OSError("simulated disconnect")
        def read(self,o,n):raise OSError("simulated disconnect")
    try:
        verify(Broken(8*MIB),[START,2*MIB,3*MIB,4*MIB],4096,quiet,ev,True)
    except RuntimeError as e:assert "Tres falhas" in str(e)
    else:raise AssertionError("write circuit breaker did not fire")
    assert len(verify(Broken(8*MIB),[START,2*MIB,3*MIB,4*MIB],4096,quiet,ev))==3
    ev.set()
    try:verify(Fake(8*MIB),[START],4096,quiet,ev)
    except Cancelled:pass
    else:raise AssertionError("cancel ignored")
    print("Self-test OK: patterns, aliasing, prefix, offsets, disk exclusion, fault cutoff and cancellation.")

def main():
    if "--self-test" in sys.argv:self_test();return
    if os.name!="nt":raise SystemExit("FlashRecover requer Windows 10/11.")
    import tkinter as tk
    from tkinter import ttk,messagebox,simpledialog,filedialog
    if not ctypes.windll.shell32.IsUserAnAdmin():
        root=tk.Tk();root.withdraw()
        messagebox.showerror("FlashRecover","Execute como administrador usando INICIAR.cmd.")
        root.destroy();return
    root=tk.Tk();root.title("FlashRecover 0.1.1 | Laboratorio de memoria");root.geometry("1000x720");root.minsize(820,560)
    root.configure(bg="#111827")
    style=ttk.Style(root);style.theme_use("clam")
    style.configure("TFrame",background="#111827");style.configure("TLabel",background="#111827",foreground="#e5e7eb")
    style.configure("TButton",padding=8);style.configure("Title.TLabel",font=("Segoe UI",23,"bold"),foreground="#93c5fd")
    frame=ttk.Frame(root,padding=18);frame.pack(fill="both",expand=True)
    ttk.Label(frame,text="FLASHRECOVER / 0.1.1",style="Title.TLabel").pack(anchor="w")
    ttk.Label(frame,text="Diagnostico RAW  /  Capacidade real  /  Reconstrucao limitada").pack(anchor="w",pady=(0,12))
    row=ttk.Frame(frame);row.pack(fill="x")
    selector=ttk.Combobox(row,state="readonly");selector.pack(side="left",fill="x",expand=True)
    controls=ttk.Frame(frame);controls.pack(fill="x",pady=10)
    status=tk.StringVar(value="Pronto. Apenas discos externos elegiveis sao exibidos.")
    ttk.Label(frame,textvariable=status,wraplength=930).pack(anchor="w")
    canvas=tk.Canvas(frame,height=85,bg="#1f2937",highlightthickness=0);canvas.pack(fill="x",pady=8)
    logbox=tk.Text(frame,bg="#0b1220",fg="#dbeafe",insertbackground="white",font=("Consolas",10),wrap="word",state="disabled")
    logbox.pack(fill="both",expand=True)
    ttk.Label(frame,text="Verde: OK na amostra | Vermelho: divergencia | Amarelo: gravacao | Azul: leitura | Cinza: nao testado").pack(anchor="w")
    state={"devices":[],"busy":False,"results":{},"report":{},"verified":None}
    events=queue.Queue();cancel=threading.Event();buttons=[]
    def log(s):events.put(("log",str(s)))
    def append(s):
        logbox.configure(state="normal");logbox.insert("end",time.strftime("%H:%M:%S")+"  "+s+"\n");logbox.see("end");logbox.configure(state="disabled")
    def selected():
        i=selector.current()
        if i<0:raise RuntimeError("Selecione o cartao externo.")
        return state["devices"][i]
    def render():
        canvas.delete("all");w=max(canvas.winfo_width(),320);n=256;colors=["#374151"]*n
        size=int(state["report"].get("device",{}).get("Size") or 1)
        rank={"#374151":0,"#22c55e":1,"#60a5fa":2,"#eab308":3,"#ef4444":4}
        for o,(s,_) in state["results"].items():
            i=min(n-1,int(o*n/size));c={"ok":"#22c55e","read_error":"#60a5fa","write_error":"#eab308","mismatch":"#ef4444"}[s]
            if rank[c]>=rank[colors[i]]:colors[i]=c
        for i,c in enumerate(colors):
            x=(i%64)*w/64;y=(i//64)*20
            canvas.create_rectangle(x+1,y+1,x+w/64-1,y+18,fill=c,outline="")
    canvas.bind("<Configure>",lambda e:render())
    def refresh():
        state["verified"]=None
        try:
            state["devices"]=[d for d in disks() if eligible(d)]
            selector["values"]=["Disco %s | %s | %.2f GiB | %s | %s"%(d["Number"],d["FriendlyName"],int(d["Size"])/GIB,d["BusType"],d["PartitionStyle"]) for d in state["devices"]]
            selector.set("")
            if len(state["devices"])==1:selector.current(0)
            status.set("Discos elegiveis: %d. Disco 0 e discos do sistema excluidos."%len(state["devices"]))
        except Exception as e:messagebox.showerror("Falha de enumeracao",str(e))
    def confirm(d,action):
        if not messagebox.askyesno("Operacao destrutiva",action+"\n\nTODOS OS DADOS DO CARTAO PODEM SER PERDIDOS. Remova outros dispositivos USB de armazenamento. Nao desconecte o cartao durante a operacao.\n\nDisco %s - %s - %.2f GiB\nContinuar?"%(d["Number"],d["FriendlyName"],int(d["Size"])/GIB)):return False
        phrase="APAGAR DISCO "+str(d["Number"])
        return simpledialog.askstring("Confirmacao","Digite exatamente: "+phrase,parent=root)==phrase
    def launch(name,job):
        if state["busy"]:return
        state["busy"]=True;cancel.clear()
        for b in buttons:b.configure(state="disabled")
        selector.configure(state="disabled");status.set(name+" em andamento...")
        def work():
            try:job()
            except Cancelled:log("Cancelado. Uma operacao de gravacao cancelada deixa dados invalidos.")
            except Exception as e:log("ERRO: "+str(e));events.put(("error",str(e)))
            finally:events.put(("done",name))
        threading.Thread(target=work,daemon=True).start()
    def run_scan(mode):
        try:
            d=selected();check(d,mode!="read")
            length=max(int(d["LogicalSectorSize"]),int(d["PhysicalSectorSize"]))
            if mode=="full":
                amount=simpledialog.askinteger("Teste integral","Quantos MiB verificar a partir do primeiro MiB? (ex.: 8192)",initialvalue=8192,minvalue=16,maxvalue=(int(d["Size"])-START)//MIB,parent=root)
                if amount is None:return
                chunk=MIB;offsets=range(START,START+amount*MIB,chunk)
            else:
                chunk=length;offsets=sample_offsets(int(d["Size"]),length,256)
            if mode!="read" and not confirm(d,"Teste RAW destrutivo: gravar padroes unicos e verificar todos depois."):return
            state["verified"]=None;state["results"]={};state["report"]={};render()
            def job():
                check(d,mode!="read")
                seed=secrets.token_bytes(32)
                with RawDisk(d,mode!="read") as io:
                    results=verify(io,offsets,chunk,log,cancel,mode!="read",seed)
                check(d,mode!="read")
                report={"version":VERSION,"mode":mode,"device":d,"chunk_bytes":chunk,"counts":summary(results),"results":[{"offset":o,"status":s,"detail":e} for o,(s,e) in results.items()]}
                verified=None
                if mode=="full":
                    end=continuous_prefix(results,chunk)
                    report["contiguous_prefix_bytes"]=end-START
                    if end>START:verified=(disk_identity(d),end,seed)
                    log("Prefixo contiguo verificado: %.2f MiB (nao garante durabilidade)."%((end-START)/MIB))
                log("Resultado: "+json.dumps(report["counts"]))
                if mode!="full":log("Amostragem: nao certifica capacidade real nem autoriza reconstrucao.")
                events.put(("result",(report,results,verified)))
            launch({"read":"Leitura RAW","sample":"Teste RAW amostral","full":"Teste integral de prefixo"}[mode],job)
        except Exception as e:messagebox.showerror("FlashRecover",str(e))
    def erase():
        try:
            d=selected();check(d)
            if sum(eligible(x) for x in disks())!=1:raise RuntimeError("Desconecte outros discos externos antes de limpar particoes.")
            if not confirm(d,"Remover todas as particoes existentes para liberar o teste RAW."):return
            state["verified"]=None
            def job():
                if check(d).get("NumberOfPartitions")==0 and check(d).get("PartitionStyle") in ("RAW","MBR"):
                    log("Disco ja esta sem particoes.");return
                log(guarded_ps(d,"Clear-Disk -InputObject $d -RemoveData -RemoveOEM -Confirm:$false; Update-HostStorageCache; Get-Disk -Number $d.Number | Format-List Number,PartitionStyle,NumberOfPartitions | Out-String"))
                check(d,True)
            launch("Remocao de particoes",job)
        except Exception as e:messagebox.showerror("FlashRecover",str(e))
    def rebuild():
        try:
            d=selected();check(d,True);v=state["verified"]
            if not v or v[0]!=disk_identity(d):raise RuntimeError("Execute primeiro um teste integral de prefixo neste disco, nesta sessao.")
            max_mib=(v[1]-START)//MIB
            if max_mib<16:raise RuntimeError("Menos de 16 MiB contiguos; nao ha prefixo suficiente.")
            default=max(16,int(max_mib*.9))
            amount=simpledialog.askinteger("Reconstruir","Tamanho em MiB (maximo verificado: %d). Recomenda-se margem."%max_mib,initialvalue=default,minvalue=16,maxvalue=min(max_mib,2*1024*1024-2),parent=root)
            if amount is None or not confirm(d,"Criar particao MBR exFAT de %d MiB no prefixo testado."%amount):return
            state["verified"]=None
            def job():
                size=amount*MIB
                # Re-read unique challenges on the same media immediately before destructive changes.
                points=sorted({START, START+((size//MIB)//2)*MIB, START+size-MIB})
                with RawDisk(d,False) as io:
                    for o in points:
                        if cancel.is_set():raise Cancelled()
                        if io.read(o,MIB)!=pattern(v[2],o,MIB):
                            raise RuntimeError("Identidade dos dados ou persistencia falhou; reconstrucao bloqueada.")
                check(d,True)
                if cancel.is_set():raise Cancelled()
                action=("if ($d.PartitionStyle -eq 'RAW'){Initialize-Disk -InputObject $d -PartitionStyle MBR}; "
                        "$p=New-Partition -DiskNumber $d.Number -Offset 1048576 -Size "+str(size)+" -AssignDriveLetter; "
                        "if ($p.DiskNumber -ne $d.Number -or $p.Offset -lt 1048576 -or ($p.Offset+$p.Size) -gt "+str(v[1])+"){throw 'Particao fora do prefixo validado'}; "
                        "Format-Volume -Partition $p -FileSystem exFAT -NewFileSystemLabel FLASHRECOVER -Confirm:$false | Format-List DriveLetter,FileSystem,Size,HealthStatus | Out-String")
                log(guarded_ps(d,action,True))
                log("Formatacao concluida se nao houve erro. Valide novamente com H2testw apos reconectar. Nao use para dados importantes.")
            launch("Reconstrucao MBR/exFAT",job)
        except Exception as e:messagebox.showerror("FlashRecover",str(e))
    def export():
        if not state["report"]:messagebox.showinfo("Relatorio","Nenhum teste concluido.");return
        filename=filedialog.asksaveasfilename(defaultextension=".json",filetypes=[("JSON","*.json")],initialfile="flashrecover-report.json")
        if filename:
            try:Path(filename).write_text(json.dumps(state["report"],indent=2,ensure_ascii=False),encoding="utf-8");append("Relatorio salvo.")
            except Exception as e:messagebox.showerror("Relatorio",str(e))
    def poll():
        try:
            while True:
                typ,value=events.get_nowait()
                if typ=="log":append(value)
                elif typ=="error":messagebox.showerror("Operacao interrompida",value)
                elif typ=="result":
                    state["report"],state["results"],state["verified"]=value;render()
                elif typ=="done":
                    state["busy"]=False
                    for b in buttons:b.configure(state="normal")
                    selector.configure(state="readonly");status.set(value+" encerrado. Confira o log.")
        except queue.Empty:pass
        root.after(100,poll)
    for label,fn in [("Atualizar discos",refresh),("1 / Ler RAW",lambda:run_scan("read")),("2 / Limpar particoes",erase),("3 / Testar amostras",lambda:run_scan("sample")),("4 / Testar prefixo",lambda:run_scan("full")),("5 / Reconstruir",rebuild),("Exportar",export)]:
        b=ttk.Button(controls,text=label,command=fn);b.pack(side="left",padx=2);buttons.append(b)
    ttk.Button(frame,text="Solicitar cancelamento (entre operacoes)",command=cancel.set).pack(anchor="e",pady=4)
    def close():
        if state["busy"]:
            cancel.set();messagebox.showinfo("Operacao em andamento","Cancelamento solicitado. Aguarde o retorno da operacao de I/O antes de fechar.")
        else:root.destroy()
    root.protocol("WM_DELETE_WINDOW",close);refresh();poll();root.mainloop()
if __name__=="__main__":main()
