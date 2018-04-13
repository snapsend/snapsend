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
		
		
	def test_signup_new_user (self): 
		print "Testing Sign-up - new user"
		d = {"email":"mytest@mtest.com","password1":"pwd","password2":"pwd","username":"mtest","profilepic":"mtest.jpeg"}
		response=self.client.post('/signup', content_type='application/json', data=json.dumps(d))    
		
		usr2 = User.query.filter_by(email="mytest@mtest.com").first()		
		self.assertEqual(response.status_code, 200)
		self.assertEqual(usr2.uname, "mtest")
		self.assertEqual(usr2.profilepic, "mtest.jpeg")
	

	def test_signup_negative_existing_user (self): 
		print "Testing Sign-up - email exists"
		d = {"email":"mtester@mtest.com","password1":"pwd","password2":"pwd","username":"mtest","profilepic":"mtest.jpeg"}
		response=self.client.post('/signup', content_type='application/json', data=json.dumps(d))    

		r=b'"success": false'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())

	
	def test_signup_negative_email_null (self): 
		print "Testing Sign-up - email is null"
		d = {"email":None,"password1":"pwd","password2":"pwd","username":"mtest","profilepic":"mtest.jpeg"}
		response=self.client.post('/signup', content_type='application/json', data=json.dumps(d))    
		
		r=b'"success": false'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
	
	
	def test_login_logout_existing_user (self): 
		print "Testing Login and Logout - existing user"
		d = {"email":"mtester@mtest.com","password":"test"}
		response = self.client.post('/login', content_type='application/json', data=json.dumps(d))
		
		self.assertEqual(response.status_code, 200)
		usr2 = User.query.filter_by(email="mtester@mtest.com").first()
		self.assertNotEqual(usr2.token, None)
		
		lo = {"token":usr2.token}
		response = self.client.post('/logout', content_type='application/json', data=json.dumps(lo))
		self.assertEqual(response.status_code, 200)
		usr2 = User.query.filter_by(email="mtester@mtest.com").first()
		self.assertEqual(usr2.token, None)



	def test_login_negative_wrong_password (self): 
		print "Testing Login - Incorrect password"
		d = {"email":"mtester@mtest.com","password":"test1"}
		response = self.client.post('/login', content_type='application/json', data=json.dumps(d))
		
		r=b'"success": false'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		usr2 = User.query.filter_by(email="mtester@mtest.com").first()
		self.assertNotEqual(usr2.token, None)
		
	
	
	def test_login_negative_wrong_email (self): 
		print "Testing Login - Wrong email"
		d = {"email":"mtester1@mtest.com","password":"test"}
		response = self.client.post('/login', content_type='application/json', data=json.dumps(d))
		
		r=b'"success": false, "error": "user does not exist"'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
	

		
	def test_logout_negative_wrong_token (self): 
		print "Testing Logout - Incorrect or expired token"
		lo = {"token":"wyjob25liiwiyme2nwmxzdm5zgiynjayymu2ndu0ztljzgnjmtrmm2yixq.dbbc3w.i0_l7flsj7p_cklc2t0ju88r2kc"}
		response = self.client.post('/logout', content_type='application/json', data=json.dumps(lo))
		
		r=b'"success": false, "error": "invalid token"'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
		
		
	def test_logout_negative_null_token (self): 
		print "Testing Logout - Null token"
		lo = {"token":None}
		response = self.client.post('/logout', content_type='application/json', data=json.dumps(lo))
		
		r=b'"success": false, "error": "invalid token"'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
		
		
	def test_post_envelope_logged_user(self): 
		print "Testing Post Envelope"
		d = {"envelopeName":"env3","recipientName":"everyone","senderName":"mtest","token":"121","images":[{"url":"mtest.image1.jpeg","filename":"image1.jpeg"}]}
		response=self.client.post('/envelope', content_type='application/json', data=json.dumps(d))    
		
		env3 = Envelope.query.filter_by(ename="env3").first()		
		img1 = Image.query.filter_by(inenvID=env3.envelopeID).first()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(env3.eowner, 1)
		self.assertEqual(env3.envelopeID, 3)
		self.assertEqual(env3.sender, 'mtest')
		self.assertEqual(env3.recipient, 'everyone')
		self.assertEqual(img1.filename, 'image1.jpeg')
		self.assertEqual(img1.imagelink, 'mtest.image1.jpeg')




	def test_post_envelope_null_user(self): 
		print "Testing Post Envelope - User without login"
		d = {"envelopeName":"env4","recipientName":"everyone","senderName":"mtest","token":None,"images":[{"url":"mtest.image1.jpeg","filename":"image1.jpeg"}]}
		response=self.client.post('/envelope', content_type='application/json', data=json.dumps(d))    
		
		env4 = Envelope.query.filter_by(ename="env4").first()		
		img1 = Image.query.filter_by(inenvID=env4.envelopeID).first()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(env4.eowner, None)
		self.assertEqual(env4.envelopeID, 3)
		self.assertEqual(env4.sender, 'mtest')
		self.assertEqual(env4.recipient, 'everyone')
		self.assertEqual(img1.filename, 'image1.jpeg')
		self.assertEqual(img1.imagelink, 'mtest.image1.jpeg')		
		
		

	def test_post_envelope_negative(self): 
		print "Testing Post Envelope - User does not exist"
		d = {"envelopeName":"env4","recipientName":"everyone","senderName":"mtest","token":"120","images":[{"url":"mtest.image1.jpeg","filename":"image1.jpeg"}]}
		response=self.client.post('/envelope', content_type='application/json', data=json.dumps(d))    
		
		r = b'{"success": false, "error": "invalid token"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
	
	'''	
	def test_get_envelope(self): 
		print "Testing Get Envelope"
		response=self.client.get('/envelope/369', content_type='application/json')    
		
		r = b'"images": [{"url": "image1.com", "filename": "image1.jpg", "imageid": 1}, {"url": "image2.com", "filename": "image2.png", "imageid": 2}, {"url": "image3.com", "filename": "image3.gif", "imageid": 3}], "recipientname": "someone", "sendername": "mtest"'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
	
	def test_get_envelope_negative(self): 
		print "Testing Get Envelope - Handle doesn't exist"
		response=self.client.get('/envelope/368', content_type='application/json')    
		
		r = b'{"success": false, "error": "handle does not exist"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
		
	
	def test_get_profile(self): 
		print "Testing Get Profile"
		response=self.client.get('/profile/121', content_type='application/json')    
		print response.data.lower()
		u = b'"username": "mtest", "profilepic": "picurl.jpeg"'
		e1 = b'"envelopename": "env1", "handle": "369"'
		i1 = b'"images": [{"url": "image1.com", "filename": "image1.jpg", "imageid": 1}, {"url": "image2.com", "filename": "image2.png", "imageid": 2}, {"url": "image3.com", "filename": "image3.gif", "imageid": 3}], "recipientname": "someone", "sendername": "mtest"'
		e2 = b'"envelopename": "env2", "handle": "248"'
		i2 = b'"images": [{"url": "image-a.com", "filename": "img.jpg", "imageid": 4}, {"url": "image-b.com", "filename": "img.png", "imageid": 5}]'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(u in response.data.lower())
		self.assertTrue(e1 in response.data.lower())
		self.assertTrue(e2 in response.data.lower())
		self.assertTrue(i1 in response.data.lower())
		self.assertTrue(i2 in response.data.lower())

        
        
	def test_get_profile_negative(self): 
		print "Testing Get Profile - token doesn't exist"
		response=self.client.get('/profile/120', content_type='application/json')    
		
		r = b'{"success": false, "error": "invalid token"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
        

	
	def test_post_history_download(self): 
		print "Testing Post History - Download"
		h = {"token":"121","handle":"248","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
	
		henv1 = History.query.filter_by(envelopeID="2", act_type="D").first()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(henv1.dnum, 2)
		self.assertEqual(henv1.userID, 1)

				
		
	def test_post_history_viewed(self): 
		print "Testing Post History - Viewed"
		h = {"token":"121","handle":"248","action":"V","dnum":None}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
	
		henv1 = History.query.filter_by(envelopeID="2", act_type="V").first()
		self.assertEqual(response.status_code, 200)
		self.assertEqual(henv1.dnum, None)
		self.assertEqual(henv1.userID, 1)

	
		
		
	def test_post_history_download_negative1(self): 
		print "Testing Post History - Download - invalid token"
		h = {"token":"120","handle":"248","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
		
		r = b'{"success": false, "error": "invalid token"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
	
	
		
	def test_post_history_viewed_negative1(self): 
		print "Testing Post History - Viewed - invalid token"
		h = {"token":"120","handle":"248","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
	
		r = b'{"success": false, "error": "invalid token"}'
		self.assertEqual(response.status_code, 200)
		self.assertTrue(r in response.data.lower())
		
		

	def test_post_history_download_negative2(self): 
		print "Testing Post History - Download - invalid handle"
		h = {"token":"121","handle":"249","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
		
		self.assertEqual(response.status_code, 200)
		print response.data.lower()
		print response
		
		
	def test_post_history_viewed_negative2(self): 
		print "Testing Post History - Viewed - invalid handle"
		h = {"token":"121","handle":"249","action":"D","dnum":"2"}
		response=self.client.post('/history', content_type='application/json', data=json.dumps(h))    
	
		self.assertEqual(response.status_code, 200)
		print response.data.lower()
		print response
	'''
