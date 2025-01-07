from flask import Flask, session, redirect, url_for
import os

app = Flask(__name__)
app.secret_key = os.urandom(24)

def login_required(f):
    def wrap(*args, **kwargs):
        if not session.get('usuario_autenticado'):
            return redirect(url_for('index'))
        return f(*args, **kwargs)
    return wrap

@app.route('/')
def index():
    return "Página de inicio"

@app.route('/protected')
@login_required
def protected():
    return "Página protegida, solo para usuarios autenticados"

if __name__ == '__main__':
    app.run(debug=True)