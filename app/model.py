from app import db
#from werkzeug import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
	__tablename__ = 'User'
	userID = db.Column(db.String(16),primary_key=True)
	email = db.Column(db.String(255),unique=True,nullable=True)
	password = db.Column(db.String(16),nullable=True)
	uname = db.Column(db.String(255))
	
 
	def __init__(self, uname, email, passw):
		#self.userID = userID
	    self.uname = uname.title()
	    self.email = None
	    self.password = None
	    #self.set_password(passw)
	    

    #def set_password(self, passw):
    #	self.password = generate_password_hash(passw)

    #def is_correct_password(self, password):
    #	return check_password_hash(self.password, passw)

    #@classmethod
  	#def user_email_taken(cls, email):
    #Queries to see if the user email is taken. Same as seeing if 
    #user has an account or not.
    #	return cls.query.filter_by(email = email).first() is not None

class Envelope(db.Model):
	__tablename__ = 'Envelope'
	envelopeID = db.Column(db.Integer,primary_key=True, autoincrement=True,  nullable=False)
	eowner = db.Column(db.String(16),nullable=True)
	sender = db.Column(db.String(255),nullable=True)
	recipient = db.Column(db.String(255),nullable=True)
	ename = db.Column(db.String(255),default = None, nullable=True)
	createddate = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
	updateddate = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)

	def __init__(self,ename,sender,recipient):
		self.envelopeID = envelopeID
		#self.eowner = eowner.title()
		self.sender = sender.title()
		self.recipient = recipient.title()
		self.ename = ename.title()




class Image(db.Model):
	__tablename__ = 'Image'
	imageID = db.Column(db.Integer,primary_key=True, autoincrement=True)
	inenvID = db.Column(db.String(255),nullable=True)
	imagelink = db.Column(db.String(255),nullable=True)
	filename = db.Column(db.String(255),nullable=True)
	updateddate = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
	createddate = db.Column(db.DateTime(timezone=True), default=datetime.utcnow)
	
	def __init__(self,inenvID,imagelink,filename):
		#self.imageID = imageID
		self.inenvID = inenvID
		self.imagelink = imagelink.title()
		self.filename = filename.title()
	


