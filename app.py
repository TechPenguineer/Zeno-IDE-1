from flask import Flask
from PyQt5.QtCore import *
from PyQt5.QtWebChannel import *
from PyQt5.QtWidgets import QApplication
from threading import Timer
import sys

Zeno = Flask(__name__)

@Zeno.route("/")
def test():
    return "Exit 0"

def ui(location):
    qt_app = QApplication(sys.argv)