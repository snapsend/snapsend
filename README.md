[![Coverage Status](https://coveralls.io/repos/github/snapsend/snapsend/badge.svg?branch=dev)](https://coveralls.io/github/snapsend/snapsend?branch=dev)

![circleci build](https://img.shields.io/circleci/project/github/snapsend/snapsend.svg)

## SNAPSEND

"Snapsend" is a web application that enables sharing of envelopes of professional quality images that the recipients can then view on a browser and download (some or all of the images) in whichever image format and size they desire. 

This application was developed as part of a project for COMS 4156 - Advanced Software Engineering course at Columbia University, New York. 

## Project Members - 

ms5524 - Maitri Shroff

sj2842 - Shreya Jain

ksj2119 - Kristo Jorgenson

ms5632 - Malini Krishna S S



## Deployment:  
Snapsend has been deployed in development and production. 
The links for the site are:
Development Link - https://dev.snapsend.xyz/
Production Link - https://snapsend.xyz/


## Techonology Stack:
The front end of Snapsend application uses javascript REACT while the backend uses python-flask with MySQL database. 
The backend for Snapsend is deployed through the Google Cloud platform for both development and production environments.


## Development Process:
We employed Scrum techniques while developing this project.
We used Circle CI for continuous integration and continuous delivery. 

## Execution:
Terminal command to execute Snapsend backend code is:
python run.py

Terminal command to execute all the backend tests is: 
nosetests app app/tests/* .py *



## Features


### Upload Images and Create Envelope

Snapsend allows a user to create and share an envelope of images even without creating a profile. 

To create an envelope that can be shared with multiple recipients, user visits the snapsend homepage. User uploads images that would form part of the envelope by dragging and dropping them images onto the snapsend homepage. Then the user clicks the "Get Link" button to store the envelope on cloud and get a link that can be shared with the recipients to allow them to view the images.


### Delete Images

User has the option to delete an uploaded image before finalizing the envelope by clicking the "Get Link" button. Once an envelope is created, the images in it can no longer be edited. This feature is provided to match the physical process followed by professional photographers when submitting envelopes. Once the envelopes are submitted, it should no longer be possible for the photographers to add or edit the images that they submitted to ensure clarity and consistency.


### Viewing a Shared Envelope

A snapsend user who uploaded an envelope and received a snapsend link can simply share the link with as many recipients as desired through whatever mode of transfer they choose (email, whatsapp, linkedin etc). 
The recipient can then view all the images in the envelope by simply clicking on the link. 


### Downloading Images

After viewing the images, the recipients can choose which of those images they to download to their local systems. This feature is particularly useful for clients of professional photographers and power bloggers who receive multiple envelopes with hundreds of photographs as they can quickly choose a handful of interesting and impactful pictures from the envelope and download only those onto their local PC.  


### Converting Image Size and Format

The recipient can choose the size and image format (png and jpg supported in this release) in which they would like to download the selected images from an envelope. This is a powerful feature because a professional photographer can now share the same envelope with multiple clients who have different specifications in terms of image sizes and image formats. In fact, the recipients can even choose to download one set of images in one format and another set of images in a different format from the same envelope.


How it works: Currently, size and format conversion of the images is being performed using Filestack API. The image is stored in the size and format in which it is uploaded by the envelope owner and then retrieved from Filestack in the size and format chosen by the recipient.



### Signup and Login

Regular users of the application can create a "Snapsend" account by signing up at the "snapsend" home page. While signing up, the user provides an email id (unique identifier) and chooses a password. 

A "Snapsend" account provides additional features such as ability to keep track of all owned and viewed envelopes on their profile page and additional privileges such as ability to add unlimited images to an envelope.

Once signed up, the user can keep login to their accounts by providing the email id and password they used while signing up. Upon logging in, users will be redirected to their profile page.



### Snapsend Accounts - Additional Features For Envelope Owners

The user can quickly create an envelope by simply dragging and dropping images on to their profile page. An envelope thus created will be directly linked to the user's profile. 

As an added benefit, the user (who has a snapsend account) can upload upto 1000 images per envelope while a non-user can only upload 40 images per envelope. 

The most important benefit is that the user's profile page displays all the envelopes he created. So the user can can now keep track the envelopes that he created by simply visiting his profile page. Also, he can quickly retrieve the link to an envelope if he decides to share the envelope with more recipients later.

Once an envelope of images is sent to the recipient, they can download them. The user can select all or some of the picture and download them in any format and size and then select the any other set of images in the size they want. 


### Snapsend Accounts - Additional Features For Recipients

"Snapsend" accounts are a must-have not just for photographers and envelope creators but also for envelope recipients. If an envelope recipient is logged into their snapsend account when they click on a link to an envelope on snapsend, then their snapsend account is linked to the envelope as a viewer and the envelope starts showing up on their profile page. So, if a client of a professional photographer or a power blogger or a journalist wants to go back and grab an image from an old envelope, they no longer have to dig through tons of emails to find the link to the envelope. They can simply go to their profile and find it.



### Snapsend Accounts - Tracking History

Users can not only keep track of all the envelopes they created and viewed as long as they have a Snapsend account, they can also see the number of times the envelope was viewed and the number of times it was downloaded. Pretty cool, right? But we're not done yet. If the recipients also have Snapsend accounts, the user can also see who viewed and who downloaded the envelope. So, no more follow-up emails to ask, "Did you see the envelope?" as long as everyone is on "Snapsend".




### Secured Access

User access to snapsend accounts are provided using hashed tokens. After completing their work, users can securely logout of their snapsend accounts. 

Even if snapsend users were to use shared computers and forgot to clear their web history, a malicious person cannot gain access to their profile through replay attack since the token used for logging in will be deleted from the database on logout.

Also, the passwords are not stored in the clear in the database. They are hashed with a salt and then stored which makes them secure against dictionary based brute force attacks.
