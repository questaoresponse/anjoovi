@echo off
setlocal enabledelayedexpansion

REM Defina o caminho da pasta onde os arquivos MP3 estão
set "inputFolder=C:\musicas"

REM Defina o caminho da pasta onde quer salvar os arquivos M4A
set "outputFolder=C:\musicas2"

REM Cria a pasta de saída se ela não existir
if not exist "%outputFolder%" mkdir "%outputFolder%"

REM Para cada arquivo MP3 na pasta de entrada
for %%f in ("%inputFolder%\*.mp3") do (
    REM Nome do arquivo sem extensão
    set "filename=%%~nf"
    REM Conversão usando FFmpeg
    ffmpeg -i "%%f" -map 0:a -c:a aac -b:a 192k "%outputFolder%\!filename!.m4a"
)

echo Conversão completa!
pause