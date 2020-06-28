# CookiesAndSessions

## Use of application
### Start the app
* Is necessary have MongoDB install and run in the environment.
* Run the comand *npm install* in the root of the project.
* Run the app with comand *node server* in the root of the project.

### Consume of app
* **SignUp** *http://localhost:3000/signup* **POST**

In the body of request add the next key / value pairs for do to register of a user
KEY | VALUE |
--- | ----- |
email | mvaldes988@gmail.com
password | 1234567
name | MiguelAValdesG

If the response is successful will be: a cookie with the user id in the value of the param *connect.sid* and the message *User created with successful* in the body.
This request also let the login of the app.


* **User Session Information** *http://localhost:3000/userInfo* **GET**

This request give all the information about the user logged (with session initialized), include the password encrypted.


* **User logout** *http://localhost:3000/logout* **POST**

This request let to do logout of the session. The successful response is the message *logout successful* and the login of the session initialized.


* **User login** *http://localhost:3000/login* **POST**

In the body of request add the next key / value pairs for do to register of a user
KEY | VALUE |
--- | ----- |
email | mvaldes988@gmail.com
password | 1234567

This request let to do login. The successful response is the message *Login successful* and the session login.


## References:
### Appdelante
* Introducción a Cookies y Sesiones con Node.js 
https://www.youtube.com/playlist?list=PLImOJ2OqvvkBEJBCOL_LMaUdLoi8SkAUI

* Autenticación de usuarios con Node.js
https://www.youtube.com/playlist?list=PLImOJ2OqvvkDYRy2oy4ECs8CVsCOppfA_


