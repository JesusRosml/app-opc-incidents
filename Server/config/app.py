from flask import Flask
from connection_db import get_db_connection

app = Flask(__name__)

@app.route('/')
def index():
    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT DATABASE()")
            result = cursor.fetchone()
            return f"Conectado a la base de datos: {result[0]}"
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)