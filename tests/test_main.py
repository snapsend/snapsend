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

import json
import main
import unittest

class MainTest(unittest.TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""

    def setUp(self):
        self.app = main.app.test_client()

    def test_hello_world(self):
        rv = self.app.get('/',follow_redirects=True)
        #assert("hello" in rv.data.lower())
        self.assertEqual(rv.status_code, 200)


    def test_database(self):
        rv = self.app.get('/databases',follow_redirects=True)
        assert("mysql" in rv.data.lower())
        self.assertEqual(rv.status_code, 200)

    def test_logout(self):
        rv = self.app.post('/logout',follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

    def test_logout_json(self):
        rv = self.app.post('/logout',follow_redirects=True)
        assert("true" in rv.data.lower())
        #self.assertEqual(rv.status_code, 200)


	'''
    def test_post_envelope(self):
        r = json.dumps({"envelopeName" : "MyEllmnvelope","recipientName": "Johlmlmn","senderName": "Mary","images": [{"url": "blah1",
            "filename": "pic1.jpg"}]})
        loaded_r = json.loads(r)

        response = self.app.post('/envelope',data=loaded_r,follow_redirects=True)
        self.assertIn(b'OK', response.data)


    def test_correct_login(self):
        r = json.dumps({"email":"maitri@gmail.com", "password":"lol"})
        loaded_r = json.loads(r)
        email = loaded_r['email']
        paswd = loaded_r['password']

        response = self.app.post(
            '/login', data=(email,paswd),follow_redirects=True )
        self.assertIn(b'OK', response.data)
    
    '''
    def test_protected(self):
        rv = self.app.post('/protected',follow_redirects=True)
        self.assertEqual(rv.status_code, 405)
    '''
    def test_get_envelope(self):
        
        response = self.app.get('/envelope/11')
        self.assertIn(b'11', response.data)
    '''
    def test_get_envelope_error(self):
        
        response = self.app.get('/envelope/abc',follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test_get_envelope_error2(self):
        
        response = self.app.get('/envelope/@@')
        self.assertEqual(response.status_code, 404)



        
if __name__ == '__main__':
    unittest.main()
