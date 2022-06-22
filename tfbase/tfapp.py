from flask import Flask, request, send_from_directory
import algorithm

app = Flask(__name__)

@app.route("/")
def root():
    return app.send_static_file('index.html')

@app.route("/favicon.ico")
def favicon():
    return app.send_static_file('favicon.ico')

@app.route("/js/<path:path>")
def serveJS(path):
    return send_from_directory('static/js', path)

@app.route("/css/<path:path>")
def serveCSS(path):
    return send_from_directory('static/css', path)

@app.route("/data/<path:path>")
def serveData(path):
    return send_from_directory('static/data', path)

@app.route("/peru1")
def peru1():
    return app.response_class(response=algorithm.peru1(),
                              status=200,
                              mimetype='application/json')

# vim: set tabstop=2:softtabstop=2:shiftwidth=2:noexpandtab

