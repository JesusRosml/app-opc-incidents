from flask import Flask, session, redirect, request, jsonify
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

@app.route('/close_session', methods=['POST'])
def close_session():
    data = request.get_json()
    if data and data.get('closeSession'):
        session.clear() 
        return jsonify({"message": "Sesión cerrada"}), 200
    return jsonify({"error": "Solicitud inválida"}), 400

if __name__ == '__main__':
    app.run(debug=True)