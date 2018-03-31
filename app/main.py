from google.appengine.ext import vendor
vendor.add('lib')
from flask import Flask, request, jsonify, make_response
#adding another comment
#adding comment
#needed for front and backend to work together
from flask_cors import CORS
import flask
import flask_login
import configuration
import os
import json
import sys
import os
import MySQLdb
import logging
from app import db,app
from model import User, Envelope, Image
from sqlalchemy import func
import md5
from itsdangerous import URLSafeTimedSerializer


app = Flask(__name__)
# app.config.from_object('config.BaseConfig')
CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG


# These environment variables are configured in app.yaml.
#CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
#CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
#CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')

#CLOUDSQL_CONNECTION_NAME = 'flask-snapsend:us-east1:snapsend-mysql'
#CLOUDSQL_USER = 'root'
#CLOUDSQL_PASSWORD = 'snapsend'

app.secret_key = 'snapsend_rocks'  # Change this!
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

# Our mock database.

users = {'maitri@gmail.com': {'password': 'lol'}}

class User(flask_login.UserMixin):
  # def __init__(self, userid, password):
  #   self.id = userid
  #   self.password = password
  pass


  def get_auth_token(self):
    #Encode a secure token for cookie
    data = [str(self.id), self.password]
    return login_serializer.dumps(data)


  @staticmethod
  def get(userid):
        # Static method to search the database and see if userid exists.  If it 
        # does exist then return a User Object.  If not then return None as 
        # required by Flask-Login. 
        #For this example the USERS database is a list consisting of 
        #(user,hased_password) of users.
    for user in USERS:
        if user[0] == userid:
            return User(user[0], user[1])
    return None



def hash_pass(password):
    #Return the md5 hash of the password+salt
    salted_password = password + app.secret_key
    return md5.new(salted_password).hexdigest()


@login_manager.user_loader
def user_loader(email):
    if email not in users:
        return

    user = User()
    user.id = email
    return user


@login_manager.request_loader
def request_loader(request):
  email = request.form.get('email')
  if email not in users:
      return

  user = User()
  user.id = email

  user.is_authenticated = request.form['password'] == users[email]['password']
  return user

@app.route('/login', methods=['POST'])
def login():
  if request.method == 'POST':
    loaded_r = request.get_json()
    r = json.dumps(loaded_r)
    loaded_r = json.loads(r)

    email = loaded_r['email']
    pwd = loaded_r['password']
    if pwd == users[email]['password']:
        user = User()
        user.id = email
        flask_login.login_user(user)
        
        loaded_r = {"success":True}

        payload = json.dumps(loaded_r)
        response = make_response(payload)
        response.headers['Content-Type'] = 'text/json'
        response.headers['Access-Control-Allow-Origin'] = '*'
        return response
        #return flask.redirect(flask.url_for('protected'))

    loaded_r = {"success":False}

    payload = json.dumps(loaded_r)
    response = make_response(payload)
    response.headers['Content-Type'] = 'text/json'
        #response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/signup', methods=['POST'])
def signup(request):
  print("hit signup")
  if request.method == 'POST':
    loaded_r = request.get_json()
    r = json.dumps(loaded_r)
    loaded_r = json.loads(r)

    curr_email = loaded_r['email']
    pwd1 = loaded_r['password1']
    pwd2 = loaded_r['password2']

    if(pwd1 == pwd2):
        users[curr_email] = {'password': pwd1 }
        print(users)
    else:
      loaded_r = {"success":False}
      payload = json.dumps(loaded_r)
      response = make_response(payload)
      response.headers['Content-Type'] = 'text/json'
      response.headers['Access-Control-Allow-Origin'] = '*'
      return response
      #return flask.redirect(flask.url_for('signup'))

    user = User()
    user.id = curr_email
    user.password = pwd1
    flask_login.login_user(user)
    some_token = user.get_auth_token()
    print(some_token)

    loaded_r = {"success":True}
    payload = json.dumps(loaded_r)
    response = make_response(payload)
    response.headers['Content-Type'] = 'text/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response

    #return flask.redirect(flask.url_for('protected'))


@app.route('/protected')
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.id


@app.route('/logout', methods=['POST'])
def logout():
  # usr = flask_login.current_user.id
  flask_login.logout_user()
  loaded_r = {"success":True}

  payload = json.dumps(loaded_r)
  response = make_response(payload)
  response.headers['Content-Type'] = 'text/json'
            #response.headers['Access-Control-Allow-Origin'] = '*'
  return response 

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'




@app.route('/')
def index():
  return "Hello, World"

'''
@app.route('/blah')
def index1():
  return "Hello, blahWorld"

'''

'''
@app.route('/databases')
def showDatabases():
  """Simple request handler that shows all of the MySQL SCHEMAS/DATABASES."""
  #db = connect_to_cloudsql()

  cursor = db.cursor()
  cursor.execute('SHOW SCHEMAS')
  res = ""
  for r in cursor.fetchall():
    res += ('{}\n'.format(r[0]))

  response = make_response(res)
  response.headers['Content-Type'] = 'text/json'

  return response



'''
@app.route('/envelope', methods=['POST'])
def postenvelope():
  loaded_r = request.get_json()
  r = json.dumps(loaded_r)
  loaded_r = json.loads(r)
  env_name = loaded_r['envelopeName']
  rec_name = loaded_r['recipientName']
  sender_name = loaded_r['senderName']
  all_images = loaded_r['images']
  newenvelope = Envelope(env_name,sender_name,rec_name)
  db.session.add(newenvelope)
  db.session.commit()
  j= db.session.query(func.max(Envelope.envelopeID)).scalar()
  try:
    for i in range(len(all_images)):
      curr_dict = all_images[i]
      b = curr_dict['url']
      c = curr_dict['filename']
      image = Image(str(j),b,c)
      db.session.add(image)
      db.session.commit()

  except Exception as e:
    raise e
  loaded_r['envelopeID'] = j
  payload = json.dumps(loaded_r)
  response = make_response(payload)
  response.headers['Content-Type'] = 'text/json'
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response


@app.route('/envelope/<int:env_id>', methods=['GET'])
def getenvelope(env_id):
	loaded_r = {"envelopeID": env_id}
	r = json.dumps(loaded_r)
	loaded_r = json.loads(r)
	env_id = loaded_r['envelopeID']
	result = db.session.query(Envelope).filter(Envelope.envelopeID==env_id).first()
	imgres = db.session.query(Image).filter(Image.inenvID==env_id).all()
	payload = ""
	env_out = {}
	try:
		env_out = {
		    "envelopeId": env_id,
		    "envelopeName": result.ename,
		    "recipientName": result.recipient,
		    "senderName": result.sender,
		    "created date": result.createddate
		}

		img_arr = []
		img_out = {}

		for imgs in imgres:
		  img_out = {"imageId": imgs.imageID, "url": imgs.imagelink, "filename": imgs.filename}
		  img_arr.append(img_out)
		  img_out = {}

		payload = env_out
		payload["images"] = img_arr

		return jsonify(payload)
		response = make_response(payload)
		response.headers['Content-Type'] = 'text/json'
		response.headers['Access-Control-Allow-Origin'] = '*'
		return response


	except Exception as e:
		raise e
