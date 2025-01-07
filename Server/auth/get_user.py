from flask import Flask, session, jsonify
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)  
@app.route('/get_user', methods=['GET'])
def get_user():
    if not session.get('usuario_autenticado'):
        return jsonify({"error": "Usuario no autenticado"}), 401

    user = {
        'nombre': session.get('nombre'),
        'primer_apellido': session.get('primer_apellido'),
        'segundo_apellido': session.get('segundo_apellido'),
        'correo_electronico': session.get('correo_electronico'),
        'departamento_nombre': session.get('departamento_nombre'),
        'rol_nombre': session.get('rol_nombre'),
    }

    return jsonify(user)

if __name__ == '__main__':
    app.run(debug=True)