from flask import *
from flaskwebgui import FlaskUI
from pyautogui import *
import pyautogui

width,height = pyautogui.size()
app = Flask(__name__)
ui = FlaskUI(app, width=width,height=height)


@app.route("/")
def hello():  
    return "/ Route returns 0"


if __name__ == "__main__":
    ui.run()