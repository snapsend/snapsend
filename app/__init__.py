from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import os


app = Flask(__name__)

# Configurations
app.config.from_object('config.BaseConfig')

db = SQLAlchemy(app)
#CSRFProtect(app)


from model import User

from app import main
