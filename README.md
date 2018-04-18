[![Coverage Status](https://coveralls.io/repos/github/snapsend/snapsend/badge.svg?branch=master)](https://coveralls.io/github/snapsend/snapsend?branch=master)
![circleci build](https://img.shields.io/circleci/project/github/snapsend/snapsend.svg)

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

### Logout

The user can logout from his account on their will.

### Downloading Images

Once an envelope of images is sent to the reciepent, they can download them. 

### Converting Size

Once an envelope of images is sent to the reciepent, they can convert these images to any size as per their requirement. 

### Converting Format 

Once an envelope of images is sent to the reciepent, they can convert these images to any format (png and jpg supported at the time) as per their requirement. For converting sizes and formats of given images we are using Filestack API. This is accessed using the front end so we do not store the images.

### Uploading Image

A sender can upload as many images as he/she wants and then press the get link button to get a link to the envelope page. 

### Sending Envelope

This link can simply be shared with the client who can then download images in the required format and size.
