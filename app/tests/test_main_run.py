import unittest
from test_main import BaseTestCase
from app.model import User,Envelope,Image,History
from app.main import hash_pass
import json

class BasicTestCases(BaseTestCase):

	def test_hello_world(self):
		print "Testing Hello World"
		rv = self.client.get('/helloworld')
		self.assertTrue(b'hello' in rv.data.lower())
		self.assertEqual(rv.status_code, 200)
		
	
	def test_post_envelope(self): 
		print "Testing Post Envelope"
		d = {"envelopeName":"env3","recipientName":"everyone","senderName":"mtest","token":"121","images":[{"url":"mtest.image1.jpeg","filename":"image1.jpeg"}]}
		response=self.client.post('/envelope', content_type='application/json', data=json.dumps(d))    
		
		env3 = Envelope.query.filter_by(ename="env3").first()		
		self.assertEqual(response.status_code, 200)
		self.assertEqual(env3.eowner, 1)
		self.assertEqual(env3.envelopeID, 3)
		self.assertEqual(env3.ename, 'env3')


	def test_get_envelope(self): 
		print "Testing Get Envelope"
		response=self.client.get('/envelope/369', content_type='application/json')    
		
		r = b'{"envelopename": "env1", "handle": "369", "success": true, "images": [{"url": "image1.com", "filename": "image1.jpg", "imageid": 1}, {"url": "image2.com", "filename": "image2.png", "imageid": 2}, {"url": "image3.com", "filename": "image3.gif", "imageid": 3}], "recipientname": "someone", "sendername": "mtest"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		

	def test_get_profile(self): 
		print "Testing Get Profile"
		response=self.client.get('/profile/121', content_type='application/json')    
		
		r = b'{"uname": "mtest", "profilepic": "picurl.jpeg", "envelope": [{"ename": "env1", "handle": "369", "sender": "mtest", "images": [{"url": "image1.com", "filename": "image1.jpg", "imageid": 1}, {"url": "image2.com", "filename": "image2.png", "imageid": 2}, {"url": "image3.com", "filename": "image3.gif", "imageid": 3}], "recipient": "someone", "history": []}, {"ename": "env2", "handle": "248", "sender": "mtest", "images": [{"url": "image-a.com", "filename": "img.jpg", "imageid": 4}, {"url": "image-b.com", "filename": "img.png", "imageid": 5}], "recipient": "noone", "history": []}], "email": "mtest@mtester.com", "success": true}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())


	def test_post_history_download(self): 
		print "Testing Post History"
		h = {"token":"121","handle":"369","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
		
		henv1 = History.query.filter_by(envelopeID="1").first()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(henv1.act_type,'D')
		self.assertEqual(henv1.dnum, 2)
		self.assertEqual(henv1.userID, 1)
		
		
	'''
	def test_junk(self):
		# Tests to see if 404 page is yielded
		response = self.client.get('/safjsdlkjfsdlkjf')
		self.assertEquals(response.status_code, 404)


    def test_logout_for_example(self):
        response=self.client.post('/logout', 
                       data=json.dumps(dict(token='WyJkdW1teWVtYWlsOEBnbWFpbC5jb20iLCJhYjAwNWRlZTAyOTlhZmY1MDA2MTY5YzQ3NTljMjE0MiJd.DaguEA.ZfHaTSUvYK4pWxSl46qXy9nErVw')),
                       content_type='application/json')
        self.assertEqual(response.status_code, 200)


    def test_post_envelope(self):
        response = self.client.post('/envelope',data=json.dumps(dict(envelopeName='env1',recipientName='rec1',senderName='send1',images=json.dumps(dict(url='url1',filename='file1')),token='')),content_type='application/json')
        self.assertEqual(response.status_code, 200)
    
    def test_get_envelope(self):
        response = self.client.get('/envelope/aaaa')
        self.assertEqual(response.status_code, 200)
    
    def test_get_envelope_error(self):
        response = self.client.get('/envelope', query_string='abc')
        self.assertEqual(response.status_code, 405)


    


    
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
    


    
    


