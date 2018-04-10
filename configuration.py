
# app/config.py

# Source: https://github.com/realpython/discover-flask/blob/master/config.py
import os
from flask_sqlalchemy import SQLAlchemy


class BaseConfig(object):
  DEBUG = True
  TESTING = False
  SECRET_KEY = 'snapsend' 
  #SQLALCHEMY_DATABASE_URI = 'mysql://root:snapsend_rocks@/snapsend?unix_socket=/cloudsql/flask-snapsend:us-east1:snapsend-mysql'
  #SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:snapsend_rocks@35.231.24.52/snapsend'
  SQLALCHEMY_TRACK_MODIFICATIONS = False
  SQLALCHEMY_ECHO = True
  CLOUDSQL_USER = 'root'
  CLOUDSQL_PASSWORD = 'snapsend_rocks'
  CLOUDSQL_DATABASE = 'snapsend'
  CLOUDSQL_CONNECTION_NAME = 'flask-snapsend:us-east1:snapsend-mysql'
  LOCAL_SQLALCHEMY_DATABASE_URI = (
      'mysql+pymysql://{user}:{password}@35.231.24.52/{database}').format(
          user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
          database=CLOUDSQL_DATABASE)
  LIVE_SQLALCHEMY_DATABASE_URI = (
      'mysql://{user}:{password}@/{database}'
      '?unix_socket=/cloudsql/{connection_name}').format(
          user=CLOUDSQL_USER, password=CLOUDSQL_PASSWORD,
          database=CLOUDSQL_DATABASE, connection_name=CLOUDSQL_CONNECTION_NAME)

  if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
      SQLALCHEMY_DATABASE_URI = LIVE_SQLALCHEMY_DATABASE_URI
  else:
      SQLALCHEMY_DATABASE_URI = LOCAL_SQLALCHEMY_DATABASE_URI


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
