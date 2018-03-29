import unittest
from test_main import BaseTestCase

class BasicTestCases(BaseTestCase):

    def test_hello_world(self):
        #tester = application.test_client(self)
        rv = self.client.get('/',follow_redirects=True)
        self.assertTrue(b'hello' in rv.data.lower())
        self.assertEqual(rv.status_code, 200)

    def test_logout(self):
        rv = self.client.post('/logout',follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

    def test_logout_json(self):
        rv = self.client.post('/logout',follow_redirects=True)
        assert("true" in rv.data.lower())
        #self.assertEqual(rv.status_code, 200)

    def test_get_envelope(self):
        
        response = self.client.get('/envelope/1')
        self.assertEqual(response.status_code, 200)
    
    def test_get_envelope_error(self):
        
        response = self.client.get('/envelope/abc',follow_redirects=True)
        self.assertEqual(response.status_code, 404)

    def test_get_envelope_error2(self):
        
        response = self.client.get('/envelope/@@')
        self.assertEqual(response.status_code, 404)