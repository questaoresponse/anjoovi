@echo off
cd C:/Programs/nginx

if "%1"=="start" (
    echo Iniciando Nginx...
    start /B nginx
    exit /b
)

if "%1"=="stop" (
    echo Parando Nginx...
    taskkill /F /IM nginx.exe
    exit /b
)

if "%1"=="restart" (
    echo Reiniciando Nginx...
    nginx -s reload
    exit /b
)

echo Uso: nginx-control.bat [start|stop|restart]
exit /b