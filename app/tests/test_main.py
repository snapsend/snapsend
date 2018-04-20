
import unittest
from app import app
from flask_testing import TestCase
import configuration
from app import app,db
from app.model import User, Envelope, Image, History

class BaseTestCase(TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""
    def create_app(self):
        app.config.from_object('configuration.TestConfig')
        return app
    
    def setUp(self):
		#app = main.app.test_client()
		db.create_all()

		db.session.add(User("mtest","mtester@mtest.com", "0d66db5457fc3e401b0eea9e1ba0a1dc","121","picurl.jpeg"))
		db.session.add(User("m2test","m2tester@mtest.com", "0d66db5457fc3e401b0eea9e1ba0a1dc","345","mypic.jpeg"))
				
		env1 = Envelope("env1","mtest","someone","369")
		env1.eowner = "1"
		db.session.add(env1)
		env2 = Envelope("env2","mtest","no one","248")
		env2.eowner = "1"
		db.session.add(env2)
		
		#env1 = Envelope.query.filter_by(handle="369").first()
		
		db.session.add(Image("1","image1.com","image1.jpg"))
		db.session.add(Image("1","image2.com","image2.png"))
		db.session.add(Image("1","image3.com","image3.gif"))
		db.session.add(Image("2","image-a.com","img.jpg"))
		db.session.add(Image("2","image-b.com","img.png"))
		
		db.session.add(History("1","V","1",None))
		db.session.add(History("1","V","2",None))
		db.session.add(History("1","D","2","3"))		
		db.session.add(History("1","D",None,"1"))
		
		db.session.add(History("1","C","1",None))
		db.session.add(History("2","C","1",None))
		
		db.session.commit()
				
		
		

    def tearDown(self):
        db.session.remove()
        db.drop_all()
#       print "db torn down"
        
    
    


