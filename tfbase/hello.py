from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return "<h1>Hello, World!</h1>"

@app.route('/todosjalan')
def haha():
    return "<h1>Yup!</h1>"

@app.route("/hola/<name>")
def hello(name):
    return f"Hello, {name}! jalaste, sorry"

from algorithm import algorithm1, algorithm

@app.route("/path/<dep>")
def getPath(dep):
    return algorithm1(dep)

@app.route("/peru")
def getAllPeru():
    return algorithm()

