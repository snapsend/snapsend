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
import unittest
#import sys
#import os.path
#sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), os.path.pardir, 'app')))

#from app import app,db
from flask_testing import TestCase
#app.config.from_envvar('YOURAPPLICATION_SETTINGS')
import configuration



#import main
from app import app,db
from app.model import User, Envelope, Image





class BaseTestCase(TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""
    def create_app(self):
        app.config.from_object('config.TestConfig')
        self.app = app.test_client()

    def setUp(self):
        #app = main.app.test_client()
        db.create_all()
        db.session.add(User("Test_name", "test@tester.com", "test"))
        db.session.add(User("Adam","admin@admin.com", "admin"))
        db.session.add(Envelope("Envelope1","sender1","recipient1"))   # Shake Shack
        db.session.add(Envelope("Envelope2","sender2","recipient2"))
        db.session.add(Image("1","image1.com","image1.jpg"))
        db.session.add(Image("1","image2.com","image2.jpg"))
        db.session.add(Image("1","image3.com","image3.jpg"))
        db.session.add(Image("2","image1.com","image1.jpg"))
        db.session.commit()

    def tearDown(self):
        """ Teardown method """ 
        db.session.remove()
        db.drop_all()
'''
    def test_hello_world(self):
        rv = self.app.get('/',follow_redirects=True)
        assert("hello" in rv.data.lower())
        self.assertEqual(rv.status_code, 200)

    
    def test_logout(self):
        rv = self.app.post('/logout',follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

    def test_logout_json(self):
        rv = self.app.post('/logout',follow_redirects=True)
        assert("true" in rv.data.lower())
        #self.assertEqual(rv.status_code, 200)

    def test_get_envelope(self):
        
        response = self.app.get('/envelope/1')
        self.assertEqual(response.status_code, 200)
    
    def test_get_envelope_error(self):
        
        response = self.app.get('/envelope/abc',follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test_get_envelope_error2(self):
        
        response = self.app.get('/envelope/@@')
        self.assertEqual(response.status_code, 404)

    
        
    

    
    

if __name__ == '__main__':
    unittest.main()
    '''
