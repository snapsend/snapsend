from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
# from model import User, Image, Envelope
import os
#from app import main
app = Flask(__name__)

# Configurations
app.config.from_object('configuration.BaseConfig')

# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:snapsend@35.231.24.52/snapsend'
db = SQLAlchemy(app)
#CSRFProtect(app)
from app import main
