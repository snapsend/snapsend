
import unittest
from app import app
from flask_testing import TestCase
import config
from app import app,db
from app.model import User, Envelope, Image

class BaseTestCase(TestCase):
    """This class uses the Flask tests app to run an integration test against a
    local instance of the server."""
    def create_app(self):
        app.config.from_object('configuration.TestConfig')
        return app
    
    def setUp(self):


        #app = main.app.test_client()
        db.create_all()
        
        db.session.add(User("Testname","test@tester.com", "test"))
        db.session.add(User("Adam","admin@admin.com", "admin"))
        db.session.add(Envelope("Envelope1","sender1","recipient1"))   # Shake Shack
        db.session.add(Envelope("Envelope2","sender2","recipient2"))
        db.session.add(Image("1","image1.com","image1.jpg"))
        db.session.add(Image("1","image2.com","image2.jpg"))
        db.session.add(Image("1","image3.com","image3.jpg"))
        db.session.add(Image("2","image1.com","image1.jpg"))
        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    

    
   

    
       
    

    
'''    

if __name__ == '__main__':
    unittest.main()
    '''
