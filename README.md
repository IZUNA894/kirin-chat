## Kirin 
### A Simple chat app made by me , in js only..

On a lame note...😃😃😃,i started this project to test what i know , to apply what i have previously learned...to practice my web app developement...i just started with no no clue ,just out of pure hobby...Though it took me nearly 3 months to complete to that limit where i can show it to non technical background user...but still ,journey was full of ups and down ,full of exihalereting kicks and more...
for previous versions go to 

https://github.com/IZUNA894/kirin-chatApp-server

https://github.com/IZUNA894/kirin-chatApp-client

this repo is more refined and improved version of the original code.
i learn a lot more things in past, applying my learning and experiences here.


### About this app
This app is web app,made with web technologies...

this app is made in 2 parts.

1:Client - front end of app.

2:Server - back end of app.


## Client side
### technology used

📌 React.js - for serving dynamic ui and other features.

📌 Bootstrap - for styling web pages and components.

📌 Some npm modules - for providing various functionalty


## Server side
### technology used

📌 Node.js - for server side scripting.

📌 Express - Node.js framework for routing and server setup.

📌 Some npm modules - for providing various functionalty

📌 MongoDb - for Database

📌socket.io - library for facilating realtime communications.

📌 AWS S3 for storage,Aws SES (for email) and AWS SNS (for sending messages) used in auth like sending OTP.


### Features covered

📌E-mail or phone no. validation through OTP or some other service.(using AWS SNS,SES).

📌media and voice message sending feature.

📌Sending geolocations through message.

📌Media stored on AWS S3.

📌Sending Message in realtime through websocket.



### Scope of further developemt


📌emoji feature through message.

📌Notifiactions service when user recieves a new message.


📌feature through which user can unsend his message like of whatsapp.

📌feature through which user can block or starred his friends.

📌feature showing online,offline and his last seen to others.

📌and some more...

📌if you want to add some of your own feature..you are welcome...

## running 
# localhost
for running this app in your local machine ,download this repo,other part i.e server part , in root directory of this app , provide credential in server/config.js file
like AWS S3,SNS,SES, and mongodb string.
run  `npm install` to install all dependencies 
and then run `npm start`. (assumming you are running your server side code on port 30001,if not change it😁).


## Note

Hosted version of this app may break after some time, as my AWS Credentails may have expired then, when you are seeing it!. 
Sorry for inconvenience caused.
