import pymysql

<<<<<<< HEAD
try:
    connection = pymysql.connect(
        host='localhost',
        user='root',
        password='',
        database='inventario',
        charset='utf8mb4'
    )
    print("Conexión exitosa a la base de datos")
except pymysql.MySQLError as e:
    print(f"Error al conectar a la base de datos: {e}")
finally:
    if connection:
        connection.close()
        print("Conexión cerrada")
=======
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
>>>>>>> 667f16ccf77acd683ae19b70145d89ebb4dea74d
