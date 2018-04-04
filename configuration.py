# app/config.py

# Source: https://github.com/realpython/discover-flask/blob/master/config.py
from flask_sqlalchemy import SQLAlchemy


class BaseConfig(object):
  DEBUG = True
  TESTING = False
  SECRET_KEY = 'snapsend'
  #SQLALCHEMY_DATABASE_URI = 'mysql://root:snapsend_rocks@35.231.24.52/snapsend'  
  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:snapsend_rocks@/snapsend?unix_socket=/cloudql/flask-snapsend:us-east1:snapsend-mysql'
# SQLALCHEMY_DATABASE_URI = 'mysql://root:snapsend_rocks@35.231.24.52/snapsend'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = True


class TestConfig(BaseConfig):
  DEBUG = True
  TESTING = True
  SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
  SQLALCHEMY_ECHO = False


class DevelopmentalConfig(BaseConfig):
  DEBUG = True


class ProductionConfig(BaseConfig):
  DEBUG = False
