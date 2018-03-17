# from __future__ import print_function
from google.appengine.ext import vendor
vendor.add('lib')
from flask import Flask, request, jsonify, make_response
# from flask import jsonify


app = Flask(__name__)
import os
import json
import sys
import os
import MySQLdb



# dynamodb = boto3.resource(
#     'dynamodb',
#     endpoint_url='http://localhost:8000',
#     region_name='dummy_region',
#     aws_access_key_id='dummy_access_key',
#     aws_secret_access_key='dummy_secret_key',
#     verify=False)

# These environment variables are configured in app.yaml.
# CLOUDSQL_CONNECTION_NAME = os.environ.get('CLOUDSQL_CONNECTION_NAME')
# CLOUDSQL_USER = os.environ.get('CLOUDSQL_USER')
# CLOUDSQL_PASSWORD = os.environ.get('CLOUDSQL_PASSWORD')
CLOUDSQL_CONNECTION_NAME = 'flask-snapsend:us-east1:snapsend-mysql'
CLOUDSQL_USER = 'root'
CLOUDSQL_PASSWORD = 'snapsend'


def connect_to_cloudsql():
    # When deployed to App Engine, the `SERVER_SOFTWARE` environment variable
    # will be set to 'Google App Engine/version'.
    # if os.getenv('SERVER_SOFTWARE', '').startswith('Google App Engine/'):
    #     # Connect using the unix socket located at
    #     # /cloudsql/cloudsql-connection-name.
    #     cloudsql_unix_socket = os.path.join(
    #         '/cloudsql', CLOUDSQL_CONNECTION_NAME)

    #     db = MySQLdb.connect(
    #         unix_socket=cloudsql_unix_socket,
    #         user=CLOUDSQL_USER,
    #         passwd=CLOUDSQL_PASSWORD)

    # else:
    #     db = MySQLdb.connect(
    #         host='127.0.0.1', user=CLOUDSQL_USER, passwd=CLOUDSQL_PASSWORD)
    # else:
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
        res+= ('{}\n'.format(r[0]))

    response = make_response(res)
    response.headers['Content-Type'] = 'text/json'

    return response


@app.route('/createEnvelope')
def createEnvelope():
    j_data = {
    "envelopeId": 1501,
    "envelopeName" : "MyEnvelope" ,
    "userId" : 5054,
    "username" : "abc",
    "password" : "abcdefg",
    "email" : "abc@gmail.com",
    "recipientName": "John",
    "senderName": "Mary",
    "images": [{
            "imageId": 9475,
            "url": "blah1",
            "filename": "pic1.jpg"
        },
        {
            "imageId": 9476,
            "url": "blah2",
            "filename": "pic2.jpg"
        }
    ]
    }

    r = json.dumps(j_data)
    loaded_r = json.loads(r)

    env_id = loaded_r['envelopeId']
    env_name = loaded_r['envelopeName']
    rec_name = loaded_r['recipientName']
    sender_name = loaded_r['senderName']
    all_images = loaded_r['images']
    uid = loaded_r['userId']
    uname = loaded_r['username']
    email = loaded_r['email']
    pwd = loaded_r['password']

    db = connect_to_cloudsql()

    cursor = db.cursor()
    sql_user_query = 'INSERT INTO snapsend.User (userID, email, password, uname) values (' + str(uid) +', "'+ email +'", "' + pwd + '", "' + uname + '");'
    sql_env_query = 'INSERT INTO snapsend.Envelope (eowner, envelopeID, ename) values (' + str(uid) +', '+ str(env_id) +', "' + env_name + '");'
    

    try:
        cursor.execute(sql_user_query)
        cursor.execute(sql_env_query)

        for i in range(len(all_images)):
            curr_dict = all_images[i]
            a = curr_dict['imageId']
            b = curr_dict['url']
            c = curr_dict['filename']
            sql_image_query = 'INSERT INTO snapsend.Image (inenvID, imageID, imagelink, filename) values (' + str(env_id) +', '+ str(a) +', "' + b + '", "' + c + '");'
            cursor.execute(sql_image_query)
        
        print("success")    
    except Exception as e:
        print("error")
    

    # cursor.execute('select * from snapsend.User')
    cursor.execute('select * from snapsend.Image')
    # cursor.execute('select * from snapsend.Envelope')


    res = ""
    for r in cursor.fetchall():
        res+= ('{}\n'.format(r))

    response = make_response(res)
    response.headers['Content-Type'] = 'text/json'

    return response

    

if __name__ == '__main__':
    app.run(debug=True)
