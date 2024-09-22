from flask import Flask, render_template_string
from test import test  # Importa a função test do arquivo test.py

app = Flask(__name__)

@app.route("/")
def hello_world():
    return render_template_string('''
        <html>
            <body>
                <p>Hello, World!</p>
                <form action="/process" method="post">
                    <button type="submit">Process File</button>
                </form>
            </body>
        </html>
    ''')

@app.route("/process", methods=["POST"])
def process_file():
    resultado = test()  # Chama a função test do arquivo test.py
    return f"<p>File processed! Resultado: {resultado}</p>"