from google.appengine.ext import vendor
vendor.add('lib')
from flask import Flask, request, jsonify, make_response
from flask_cors import CORS
import flask
import flask_login
app = Flask(__name__)
import os
import json
import sys
import os
import MySQLdb
import logging

CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG

# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')

#CLOUDSQL_CONNECTION_NAME = 'flask-snapsend:us-east1:snapsend-mysql'
#CLOUDSQL_USER = 'root'
#git CLOUDSQL_PASSWORD = 'snapsend'

app.secret_key = 'snapsend_rocks'  # Change this!
login_manager = flask_login.LoginManager()
login_manager.init_app(app)

# Our mock database.
users = {'maitri@gmail.com': {'password': 'lol'}}

class User(flask_login.UserMixin):
    pass


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
            return flask.redirect(flask.url_for('protected'))

        return 'Bad login'


@app.route('/signup', methods=['POST'])
def signup():
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
          return flask.redirect(flask.url_for('signup'))

        user = User()
        user.id = curr_email
        flask_login.login_user(user)

        return flask.redirect(flask.url_for('protected'))


@app.route('/protected')
@flask_login.login_required
def protected():
    return 'Logged in as: ' + flask_login.current_user.id


@app.route('/logout')
def logout():
  # usr = flask_login.current_user.id
  flask_login.logout_user()
  return 'Logged out '  

@login_manager.unauthorized_handler
def unauthorized_handler():
    return 'Unauthorized'


def connect_to_cloudsql():
  # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
  # will be set to 'Google App Engine/version'.
  if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    # Connect using the unix socket located at
    # /cloudsql/cloudsql-connection-name.
    cloudsql_unix_socket = os.path.join('/cloudsql', CLOUDSQL_CONNECTION_NAME)

    db = MySQLdb.connect(
        unix_socket=cloudsql_unix_socket,
        user=CLOUDSQL_USER,
        passwd=CLOUDSQL_PASSWORD)
  else:
    db = MySQLdb.connect(
        host='35.231.24.52', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD)
  return db

    


@app.route('/')
def index():
  return "Hello, World (lets see how long a change takes III)!"


@app.route('/databases')
def showDatabases():
  """Simple request handler that shows all of the MySQL SCHEMAS/DATABASES."""
  db = connect_to_cloudsql()

  cursor = db.cursor()
  cursor.execute('SHOW SCHEMAS')
  res = ""
  for r in cursor.fetchall():
    res += ('{}\n'.format(r[0]))

  response = make_response(res)
  response.headers['Content-Type'] = 'text/json'

  return response
  
@app.route('|')
def getjson():
  loaded_r = request.get_json()
  r = json.dumps(loaded_r)
  loaded_r = json.loads(r)
  return loaded_r

def makepostresponse(payload):
  response = make_response(payload)
  response.headers['Content-Type'] = 'text/json'
  response.headers['Access-Control-Allow-Origin'] = '*'
  return response

@app.route('/envelope', methods=['POST'])
def postenvelope():
  loaded_r = getjson()
  print(type(loaded_r))
  env_name = loaded_r['envelopeName']
  rec_name = loaded_r['recipientName']
  sender_name = loaded_r['senderName']
  all_images = loaded_r['images']
  print env_name, rec_name, sender_name, all_images

  db = connect_to_cloudsql()

  cursor = db.cursor()
  sql_env_query = 'INSERT INTO snapsend.Envelope (ename,sender,recipient) values ("' + env_name + '","' + sender_name + '","' + rec_name + '");'
  cursor.execute(sql_env_query)
  db.commit()
  cursor.close()

  cursor = db.cursor()
  sql_get_env_id = 'SELECT max(envelopeID) from snapsend.Envelope;'

  cursor.execute(sql_get_env_id)

  j = ""
  for r in cursor.fetchall():
    j += str(r[0])
  j = int(j)
  cursor.close()

  try:
    cursor = db.cursor()
    for i in range(len(all_images)):
      curr_dict = all_images[i]
      #a = curr_dict['imageId']
      b = curr_dict['url']
      c = curr_dict['filename']
      sql_image_query = 'INSERT INTO snapsend.Image (inenvID, imagelink, filename) values (' + str(
          j) + ', "' + b + '", "' + c + '");'
      cursor.execute(sql_image_query)
      db.commit()

  except Exception as e:
    raise e

  cursor.close()

  loaded_r['envelopeID'] = j
  payload = json.dumps(loaded_r)

  response = makepostresponse(payload)
  
  return response

def makegetresponse(payload):
  response = make_response(payload)
  response.headers['Content-Type'] = 'text/json'

@app.route('/envelope/<int:env_id>', methods=['GET'])
def getenvelope(env_id):
  loaded_r = {"envelopeId": env_id}
  r = json.dumps(loaded_r)
  loaded_r = json.loads(r)
  env_id = loaded_r['envelopeId']

  db = connect_to_cloudsql()

  cursor = db.cursor()

  sql_get_env = 'SELECT ename, sender, recipient, createddate FROM snapsend.Envelope WHERE envelopeID = ' + str(
      env_id) + ';'

  sql_get_images = 'SELECT imageID, imagelink, filename FROM snapsend.Image WHERE inenvID = ' + str(
      env_id) + ';'
  payload = ""
  env_out = {}
  try:
    cursor.execute(sql_get_env)
    result = cursor.fetchall()

    env_out = {
        "envelopeId": env_id,
        "envelopeName": result[0][0],
        "recipientName": result[0][2],
        "senderName": result[0][1],
        "created date": result[0][3]
    }


    cursor.execute(sql_get_images)
    imgres = cursor.fetchall()
  
    img_arr = []
    img_out = {}

    for imgs in imgres:
      img_out = {"imageId": imgs[0], "url": imgs[1], "filename": imgs[2]}
      img_arr.append(img_out)
      img_out = {}
   
    payload = env_out
    payload["images"] = img_arr
   
    return jsonify(payload)


  except Exception as e:
    raise e

  response = makegetresponse(payload)

  return response


if __name__ == '__main__':
  app.run(debug=True)
