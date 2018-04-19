import unittest
from test_main import BaseTestCase
from app.model import User,Envelope,Image
from app.main import hash_pass

class BasicTestCases(BaseTestCase):

    def test_hello_world(self):
        #tester = application.test_client(self)
        rv = self.client.get('/helloworld',follow_redirects=True)
        self.assertTrue(b'hello' in rv.data.lower())
        self.assertEqual(rv.status_code, 200)

    '''
    def test_logout(self):
        rv = self.client.post('/logout',follow_redirects=True)
        self.assertEqual(rv.status_code, 200)

    def test_logout_json(self):
        rv = self.client.post('/logout',follow_redirects=True)
        assert("true" in rv.data.lower())
        #self.assertEqual(rv.status_code, 200)
	
	def test_post_envelope(self):
    	response = self.client.post('/envelope')
        self.assertEqual(response.status_code, 200)
    '''
  #   def test_junk(self):
		# """ Tests to see if 404 page is yielded """ 
		# response = self.client.get('/safjsdlkjfsdlkjf', follow_redirects=True)
		# self.assertEquals(response.status_code, 404)
	
    
	
  #   def test_get_envelope(self):
  #       response = self.client.get('/envelope/1')
  #       self.assertEqual(response.status_code, 200)
    
  #   def test_get_envelope_error(self):
        
  #       response = self.client.get('/envelope/abc',follow_redirects=True)
  #       self.assertEqual(response.status_code, 404)

  #   def test_get_envelope_error2(self):
        
  #       response = self.client.get('/envelope/@@')
  #       self.assertEqual(response.status_code, 404)