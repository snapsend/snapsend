
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
        db.session.add(User("Adam","admin@admin.com", "admin", "", "http://abc.jpg"))
        user1 = User("Test1","test1@tester.com", "test2","abc123","test_url1")
        user1.userID = 2
        db.session.add(user1)
        db.session.commit()
        user2 = User("Test2","test2@tester.co", "test2","def456","test_url2")
        user2.userID = 2
        db.session.add(user2)
        db.session.commit()
        env1 = Envelope("Envelope1","sender1","recipient1","aaaa") # Shake Shack
        env1.envelopeID = 1
        db.session.add(env1)
        db.session.commit()
        env2 = Envelope("Envelope2","sender2","recipient2","bbbb")
        env2.envelopeID = 2
        db.session.add(env2)
        db.session.commit()
        db.session.add()
        db.session.add(Image("1","image1.com","image1.jpg"))
        db.session.add(Image("1","image2.com","image2.jpg"))
        db.session.add(Image("1","image3.com","image3.jpg"))
        db.session.add(Image("2","image1.com","image1.jpg"))

        db.session.commit()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
    
    


