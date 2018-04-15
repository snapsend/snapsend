
# app/config.py

# Source: https://github.com/realpython/discover-flask/blob/master/config.py
import os
from flask_sqlalchemy import SQLAlchemy


class BaseConfig(object):
  DEBUG = True
  TESTING = False
  SECRET_KEY = 'snapsend' 
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = True

  if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    CLOUDSQL_USER = os.environ['CLOUDSQL_USER']
    CLOUDSQL_PASSWORD = os.environ['CLOUDSQL_PASSWORD']
    CLOUDSQL_DATABASE = os.environ['CLOUDSQL_DATABASE']
    CLOUDSQL_CONNECTION_NAME = os.environ['CLOUDSQL_CONNECTION_NAME']
    SQLALCHEMY_DATABASE_URI =  'mysql://{user}:{password}@/{database}?unix_socket=/cloudsql/{instance}'format(
          user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
          database=CLOUDSQL_DATABASE, instance=CLOUDSQL_CONNECTION_NAME)
  else:
    CLOUDSQL_USER = 'root'
    CLOUDSQL_PASSWORD = 'snapsend_rocks'
    CLOUDSQL_DATABASE = 'snapsend'
    #CLOUDSQL_CONNECTION_NAME = ''
    SQLALCHEMY_DATABASE_URI = (
      'mysql+pymysql://{user}:{password}@35.231.24.52/{database}').format(
          user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
          database=CLOUDSQL_DATABASE)


class TestConfig(BaseConfig):
  DEBUG = True
  TESTING = True
  PRESERVE_CONTEXT_ON_EXCEPTION = False
  SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
  SQLALCHEMY_ECHO = False


class DevelopmentalConfig(BaseConfig):
  DEBUG = True


class ProductionConfig(BaseConfig):
  DEBUG = False
