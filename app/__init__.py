from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
# from app.model import User
import os


app = Flask(__name__)

# Configurations
app.config.from_object('configuration.BaseConfig')


db = SQLAlchemy(app)
#CSRFProtect(app)