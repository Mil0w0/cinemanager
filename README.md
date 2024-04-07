# CINEMANAGER 

    This API allows the management of a cinema. You can get all the informations and doc about endpoint with Swagger at 
    localhost:3000/api

## Installing the app
    Run cp .env.exemple  .env and modify it
    Run docker-compose up
    Run `npm install` at the root 
    Run `npm run start`

    The app is accessible at localhost:3000/
    The phpmyadmin is accessible at localhost:8080/

## Testing the app (POSTMAN)
    A postman collection json file is at the root.

## About the app
   You have to authenticate to use the API.
   You can create a user with the endpoint POST /users/register.
   You can login with the endpoint POST /users/login.
   At the moment, the login token is valid for 1 week because am annoyed to have to reconnect every 1 hour.

### Authors :
    - Loriane HILDERAL
    - Clarence HIRSCH
    - Nino PLANE