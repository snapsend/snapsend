# Copyright 2015 Google Inc.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
import sys
import os.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'code')))

import main
from model import User, Envelope, Image
from flask_testing import TestCase
import config
from main import getjson
import unittest



class BaseTestCase(TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""
    def register(self, email, password):
		""" Registers a user with the following credentials """ 
		return self.client.post('/signup', data=dict(email=email, password=password), follow_redirects=True)

	def login(self, email, password):
		""" Logs in the with specified email and password. Returns the response """ 
		return self.client.post('/login', data=dict(email=email, password=password), 
			follow_redirects=True)

	def create_app(self):
		app.config.from_object('config.TestConfig')
		return app

    def setUp(self):
		""" Setup. Creates a test user and two parking spots """ 
		db.create_all()
		db.session.add(User("Test", "Tester", "test@tester.com", "test"))
		db.session.add(User("Adam", "Admin", "admin@admin.com", "admin"))
		db.session.add(Parking_Spot(1, "2957 Broadway", "New York", "NY", 10025, "SUV", 40.8079732, -73.9643219))	# Shake Shack
		db.session.add(Parking_Spot(2, "2013 66 Street", "Brooklyn", "NY", 11204, "LMV", 40.6156401, -73.9860273))
		db.session.add(Message(2, 1, 1, "Hi I am interested in 2957 Broadway."))
		db.session.commit()

	def tearDown(self):
		""" Teardown method """ 
		db.session.remove()
		db.drop_all()

    
       

    def test_hello_world(self):
        rv = self.app.get('/')
        print(rv.data)
        self.assertEqual(response.status_code, 200)
        assert("hello" in rv.data.lower())

'''
	def create_app(self):
		app.config.from_object('config.TestConfig')
		return app

	def setUp(self):
		""" Setup. Creates a test user and two parking spots """ 
		db.create_all()
		db.session.add(User("Test", "Tester", "test@tester.com", "test"))
		db.session.add(User("Adam", "Admin", "admin@admin.com", "admin"))
		db.session.add(Parking_Spot(1, "2957 Broadway", "New York", "NY", 10025, "SUV", 40.8079732, -73.9643219))	# Shake Shack
		db.session.add(Parking_Spot(2, "2013 66 Street", "Brooklyn", "NY", 11204, "LMV", 40.6156401, -73.9860273))
		db.session.add(Message(2, 1, 1, "Hi I am interested in 2957 Broadway."))
		db.session.commit()

	def tearDown(self):
		""" Teardown method """ 
		db.session.remove()
		db.drop_all()

 
'''
    

if __name__ == '__main__':
    unittest.main()
