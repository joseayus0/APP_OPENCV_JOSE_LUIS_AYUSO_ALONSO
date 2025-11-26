@echo off
cd /d "G:\Other computers\My laptop\UNI\Apuntes UNI\TERCERO\PRIMER CUATRI\APPLIED MACHINE LEARNING\APP_OPENCV"
echo Iniciando servidor local...
start "" python -m http.server 8000
echo Servidor iniciado en http://localhost:8000
pause
