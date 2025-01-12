@echo off

REM Instalar dependencias
pip install -r requirements.txt

REM Iniciar el servidor
python manage.py runserver