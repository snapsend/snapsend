# Snapsend 


This is the code for our web application "Snapsend". This is a part of a project built for COMS 4156 - Advanced Software Engineering course at Columbia University, New York. 

## Project Members - 

Maitri Shroff

Shreya Jain

Kristo Jorgenson

Malini Sasisoban



## There are two links for the site:
Development Link - https://dev.snapsend.xyz/
Production Link - https://snapsend.xyz/


The front end of the application uses javascript react while the backend uses python flask with MySQL database. This project is being developed using Scrum techniques. 

We are also using Circle CI for continuous integration and delivery and Google Cloud platform to deploy our developemnet and production environment. 

Now to run backend code- 
Do 

python run.py

To run backend tests you need to do - 

nosetests app app/tests/*.py*

# Features

### Signup

The application allows user to sign up to become users of it. Becoming a user is not necessary to use it but provides extra functionality.

### Login

Once signed up, the user can keep returning to their account to view their history, share more pictures or view the ones shared with them.

### Profile Picture

Option to add profile picture to the user who is signing up

### Logout

The user can logout from his account on their will.

### Downloading Images

Once an envelope of images is sent to the reciepent, they can download them. The user can select all or some of the picture and download them in any format and size and then select the any other set of images in the size they want. 

### Converting Size

Once an envelope of images is sent to the reciepent, they can convert these images to any size as per their requirement. 

### Converting Format 

Once an envelope of images is sent to the reciepent, they can convert these images to any format (png and jpg supported at the time) as per their requirement. For converting sizes and formats of given images we are using Filestack API. This is accessed using the front end so we do not store the images.

### Uploading Image

A sender can upload as many images as he/she wants and then press the get link button to get a link to the envelope page. 

### Sending Envelope

This link can simply be shared with the client who can then download images in the required format and size.

### Upload Limit 

The user with an account can upload upto 1000 images per envelope while a non-user can only upload 40 per envelope.

### Envelope Hashed for security 
 
The envelopes are hashed in such a way that they cannot be looked at by others.

### Profile 

A logged in user can view his own profile with preview of all the envelopes he created and the envelopes whose linkes he recieved. He can click on view all and view the whole envelope. 

### History 

Users can view history of their envelope in the history tab. It shows the history of create, view and download actions along with names of the users who did the action.

### Delete Action 

Logged in users can delete a created envelope. 

### Delete Image 

An uploaded image can be deleted before envelope is created.


