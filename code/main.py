from google.appengine.ext import vendor
vendor.add('lib')
from flask import Flask, request, jsonify, make_response
#needed for front and backend to work together
from flask_cors import CORS

app = Flask(__name__)
import os
import json
import sys
import os
import MySQLdb
import logging

CORS(app)
logging.getLogger('flask_cors').level = logging.DEBUG

# dynamodb = boto3.resource(
#     'dynamodb',
#     endpoint_url='http://localhost:8000',
#     region_name='dummy_region',
#     aws_access_key_id='dummy_access_key',
#     aws_secret_access_key='dummy_secret_key',
#     verify=False)
# commiting get
# These environment variables are configured in app.yaml.
CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')

#CLOUDSQL_CONNECTION_NAME = 'flask-snapsend:us-east1:snapsend-mysql'
#CLOUDSQL_USER = 'root'
#CLOUDSQL_PASSWORD = 'snapsend'


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
  # else:
  # db = MySQLdb.connect(
  #     host='35.231.24.52', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD)
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


@app.route('/envelope', methods=['POST'])
def postenvelope():
  if request.method == "POST":
    loaded_r = request.get_json()
    print loaded_r
    #loaded_r = {"envelopeName" : "MyEllmnvelope","recipientName": "Johlmlmn","senderName": "Mary",
    #             "images": [{"url": "blah1", "filename": "pic1.jpg"},{"url": "blah2","filename": "pic2.jpg"}]}
    r = json.dumps(loaded_r)
    loaded_r = json.loads(r)
    env_name = loaded_r['envelopeName']
    rec_name = loaded_r['recipientName']
    sender_name = loaded_r['senderName']
    all_images = loaded_r['images']
    print env_name, rec_name, sender_name, all_images
    db = connect_to_cloudsql()

    cursor = db.cursor()
    # sql_user_query = 'INSERT INTO snapsend.User (email, password, uname) values ("'+ email +'", "' + pwd + '", "' + uname + '");'
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

      print("success")
    except Exception as e:
      print("error")

    cursor.close()

    loaded_r['envelopeID'] = j
    response = make_response(json.dumps(loaded_r))
    response.headers['Content-Type'] = 'text/json'
    response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@app.route('/envelope/<int:env_id>', methods=['GET'])
def getenvelope(env_id):
  print env_id
  #url = request.url
  #url = url.split('?')
  #k = url[1].split('=')
  loaded_r = {"envelopeId": env_id}
  r = json.dumps(loaded_r)
  loaded_r = json.loads(r)
  #print loaded_r
  env_id = loaded_r['envelopeId']

  db = connect_to_cloudsql()

  cursor = db.cursor()

  sql_get_env = 'SELECT ename, sender, recipient, createddate FROM snapsend.Envelope WHERE envelopeID = ' + str(
      env_id) + ';'

  #sql_count_images = 'SELECT COUNT (imageID) FROM snapsend.Image WHERE inenvID = ' + str(env_id) + ';'

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

    #user_id = result[0]

    #img_ct = cursor.execute(sql_count_images)

    cursor.execute(sql_get_images)
    imgres = cursor.fetchall()
    #print imgres
    #payload = ""
    img_arr = []
    img_out = {}

    for imgs in imgres:
      img_out = {"imageId": imgs[0], "url": imgs[1], "filename": imgs[2]}
      img_arr.append(img_out)
      img_out = {}
    #print img_arr
    payload = env_out
    payload["images"] = img_arr
    #print payload
    return jsonify(payload)

    print("success")
  except Exception as e:
    print("error")

  response = make_response(payload)
  response.headers['Content-Type'] = 'text/json'

  return response


# @app.route('/getEnvelope')
# def getEnvelope():

# j_in = {
#     "envelopeId": 1501
#     }

#     r = json.dumps(j_in)
#     loaded_r = json.loads(r)
#     env_id = loaded_r['envelopeId']

#     db = connect_to_cloudsql()

#     cursor = db.cursor()

#     sql_get_env = 'SELECT eowner , ename, sender, recipient, createddate FROM snapsend.Envelope WHERE envelopeID = ' + str(env_id) + ';'

#     sql_count_images = 'SELECT COUNT (imageID) FROM snapsend.Image WHERE inenvID = ' + str(env_id) + ';'

#     sql_get_images = 'SELECT imageID, imagelink, filename FROM snapsend.Image WHERE inenvID = ' + str(env_id) + ';'

#     env_out = {}
#     try:
#         result = cursor.execute(sql_get_env)

#        # env_out = {"envelopeId": env_id, "envelopeName" : result[1], "recipientName": result[3], "senderName": result[2], "created date": result[4]}

#        # user_id = result[0]

#        #  img_ct = cursor.execute(sql_count_images)

#        #  cursor.execute(sql_get_images)
#        #  imgres = cursor.fetchall()

#        # img_arr = []
#        # img_out = {}

#        #  for imgs in imgres:
#        #      img_out = {"imageId": imgs[0], "url": imgs[1], "filename": imgs[2]}
#        #     img_arr.append(img_out)
#        #     img_out = {}

#        # payload = env_out + ' "images": ' + img_arr

#        # return jsonify(payload)

#         print("success")
#     except Exception as e:
#         print("error")

#     response = make_response(payload)

#     response.headers['Content-Type'] = 'text/json'

#     return response

if __name__ == '__main__':
  app.run(debug=True)
