import subprocess

def start_server():
    subprocess.run(["python", "Server/manage.py", "runserver", "8081"])

if __name__ == "__main__":
    start_server()