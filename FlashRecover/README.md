# FlashRecover 0.1.1
Aplicativo desktop experimental para diagnosticar e tentar reutilizar cartoes SD/microSD e armazenamento USB com capacidade suspeita. Windows 10/11, Python 3.10+ com Tkinter, sem bibliotecas externas.

## Executar
1. Baixe esta pasta completa. Instale Python para Windows pelo site https://www.python.org/downloads/windows/ caso necessario, incluindo Tkinter.
2. Desconecte outros dispositivos USB de armazenamento. Mantenha apenas o leitor e o cartao alvo.
3. Clique com o botao direito em INICIAR.cmd e escolha Executar como administrador. Leia os avisos. Se o disco nao aparecer, o Windows nao o expôs de forma elegivel; nao desative as protecoes.
4. Se houver dados importantes, NAO use nenhum modo de gravacao. Procure recuperacao de dados antes de modificar a midia.

## Sequencia
- Atualizar discos: lista apenas discos USB/SD/MMC online, gravaveis, que nao sejam boot/system, nem disco 0.
- 1 / Ler RAW: amostragem de leitura direta, inclusive sem sistema de arquivos. Nao escreve na midia.
- 2 / Limpar particoes: destrutivo; remove todas as particoes do disco selecionado. So para midia dispensavel.
- 3 / Testar amostras: destrutivo; grava padroes pseudoaleatorios diferentes por endereco, sincroniza, reabre o dispositivo e verifica todos os pontos. A sobreposicao de enderecos pode ser revelada por divergencias, mas o resultado nao comprova capacidade total.
- 4 / Testar prefixo: destrutivo; grava todos os blocos de 1 MiB do intervalo escolhido a partir do primeiro MiB, sincroniza, reabre e verifica. O primeiro bloco com erro ou divergencia encerra o prefixo contiguo aprovado, embora a leitura continue para diagnostico. Comece com 1024 MiB ou menos se a midia estiver instavel. O limite de 16 MiB e proposital.
- 5 / Reconstruir: destrutivo; somente apos teste integral concluido nesta sessao e no mesmo dispositivo identificado. Cria particao MBR exFAT a partir de 1 MiB, limitada ao prefixo verificado, com margem sugerida. Requer Windows Storage cmdlets.
- Exportar: salva JSON com dispositivo, offsets, estado, erros e contagens. Nao publica dados na internet.

## Limites e riscos
Este projeto NAO reprograma firmware, nao identifica com certeza o chip NAND, nao recupera arquivos apagados e nao repara dano fisico. Mesmo os blocos aprovados podem falhar posteriormente. Um controlador fraudulento pode simular gravacoes, perder dados apos desligamento ou sobrescrever enderecos. Os resultados nao certificam a capacidade fisica nem a autenticidade. O mapa mostra amostras/blocos logicos, nao celulas NAND. As operacoes RAW podem falhar se o leitor/controlador/Windows bloquear a comunicacao; nao tente burlar essa restricao. A leitura sem buffer e a sincronizacao reduzem efeitos de cache, mas nao eliminam caches internos. A reconstrucao pode falhar se o controlador recusar metadados MBR ou se houver problema no primeiro MiB. Se o cartao desconectar, pare e tente outro leitor compativel SDXC. A identidade pode corresponder ao leitor em vez do cartao; nao troque a midia durante a sessao. Feche e reinicie o programa apos trocar o cartao. Nao use o cartao recuperado para dados importantes; confirme com H2testw/F3, incluindo apos desligar/reconectar. Solicite troca/reembolso se houver suspeita de falsificacao.

## Testes
Execute `py -3 flashrecover.py --self-test`. O autoteste verifica padroes, deteccao de aliasing em memoria simulada, calculo do prefixo, alinhamento e filtros. Nao testa hardware real nem o comportamento da API do Windows. O aplicativo precisa ser validado em midia descartavel antes de uso.

## Referencias
- https://fight-flash-fraud.readthedocs.io/en/stable/introduction.html
- https://github.com/AltraMayor/f3 (F3probe/F3fix em Linux; nao incluido no app)
- https://learn.microsoft.com/en-us/windows/win32/api/fileapi/nf-fileapi-createfilew
- https://learn.microsoft.com/en-us/windows/win32/fileio/file-buffering
- https://learn.microsoft.com/en-us/powershell/module/storage/new-partition
- https://learn.microsoft.com/en-us/powershell/module/storage/format-volume
- https://www.sdcard.org/downloads/formatter/

## Protecoes adicionais (0.1.1)
- Interrompe a fase de gravacao ou verificacao destrutiva apos tres falhas de I/O consecutivas, sem aprovar capacidade nessa tentativa. A leitura simples retorna apenas os resultados parciais.
- Confere novamente a identidade antes e depois de abrir o disco e exige apenas um dispositivo externo elegivel para testes destrutivos RAW. A limpeza tambem exige essa condicao na verificacao inicial.
- Atualizar a lista invalida a aprovacao anterior. Antes de reconstruir, rele tres blocos com padroes aleatorios da sessao para detectar troca de midia ou perda dos dados; isto nao elimina todas as possibilidades de erro.
- Inclui simulacoes de falha consecutiva e cancelamento no autoteste.
- A interrupcao nao desfaz gravacoes ja realizadas e nao pode cancelar instantaneamente uma chamada bloqueada do driver. Nenhum modo promete recuperar dados ou hardware fisicamente danificado. Firmware universal nao e suportado.
