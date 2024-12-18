@echo off
set "folderPath=.\..\public_html\assets"

if exist "%folderPath%" (
    rmdir /s /q "%folderPath%" 
)
npx tsc && npx vite build
@echo on
