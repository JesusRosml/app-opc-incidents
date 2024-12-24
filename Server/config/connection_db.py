import pymysql

def get_db_connection():
    try:
        connection = pymysql.connect(
            host='localhost',
            user='root',
            password='',
            database='inventario',
            charset='utf8mb4'
        )
        print("Conexión exitosa a la base de datos")
        return connection
    except pymysql.MySQLError as e:
        print(f"Error al conectar a la base de datos: {e}")
        return None