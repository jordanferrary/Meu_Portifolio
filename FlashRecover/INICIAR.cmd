@echo off
setlocal
cd /d "%~dp0"
where py >nul 2>nul
if not errorlevel 1 (
  py -3 "%~dp0flashrecover.py"
  goto :done
)
where python >nul 2>nul
if not errorlevel 1 (
  python "%~dp0flashrecover.py"
  goto :done
)
echo Python 3 nao encontrado. Instale pelo site python.org e habilite o PATH.
:done
if errorlevel 1 pause
