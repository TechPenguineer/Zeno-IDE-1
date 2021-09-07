from flask import Flask, render_template
from flaskwebgui import FlaskUI
import pyautogui

width, height = pyautogui.size()
app = Flask(__name__)
ui = FlaskUI(app, width=width, height=height, maximized=True)


@app.route("/")
def hello():
    return render_template("home.html")


if __name__ == "__main__":
    ui.run()
