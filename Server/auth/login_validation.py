from flask import Flask, request, session, jsonify
from werkzeug.security import check_password_hash
import os
from ..config.connection_db import get_db_connection

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    if not data:
        return jsonify({"error": "JSON inválido"}), 400

    email = data.get('email')
    password = data.get('password')

    connection = get_db_connection()
    try:
        with connection.cursor() as cursor:
            sql = """
                SELECT
                    usuarios.nombre,
                    usuarios.primer_apellido,
                    usuarios.segundo_apellido,
                    usuarios.correo_electronico,
                    departamento.nombre_departamento AS departamento_nombre,
                    roles.nombre_rol AS rol_nombre,
                    usuarios.contraseña
                FROM
                    usuarios
                INNER JOIN
                    departamento ON usuarios.departamento_id = departamento.id_departamento
                INNER JOIN
                    roles ON usuarios.rol_id = roles.rol_id
                WHERE
                    usuarios.correo_electronico = %s
            """
            cursor.execute(sql, (email,))
            user = cursor.fetchone()

            if user and check_password_hash(user['contraseña'], password):
                session['usuario_autenticado'] = True
                session['nombre'] = user['nombre']
                session['primer_apellido'] = user['primer_apellido']
                session['segundo_apellido'] = user['segundo_apellido']
                session['correo_electronico'] = user['correo_electronico']
                session['departamento_nombre'] = user['departamento_nombre']
                session['rol_nombre'] = user['rol_nombre']
                return jsonify({"success": True})
            else:
                return jsonify({"error": "Contraseña incorrecta o el correo electrónico no existe."}), 401
    finally:
        connection.close()

if __name__ == '__main__':
    app.run(debug=True)