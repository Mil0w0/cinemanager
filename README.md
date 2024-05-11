# CINEMANAGER 

    This API allows the management of a cinema. You can get all the informations and doc about endpoint with Swagger at 
    localhost:3000/api

## Installation

1. Clone the repository and navigate to the project directory.
2. Copy the environment configuration file template:
    ```bash
    cp .env.example .env
    ```
   Edit the `.env` file to match your environment settings.

3. Start the Docker containers:
    ```bash
    docker-compose up
    ```

4. Install the necessary Node.js dependencies:
    ```bash
    npm install
    ```

5. Start the application:
    ```bash
    npm run start
    ```

   **Access Points:**

   - Application URL: `http://localhost:3000/`
   - phpMyAdmin: `http://localhost:8080/`
   
## Testing the app (POSTMAN)
   A postman collection json file is at the root.
   A database dump is also at the root. You can import it via phpMyAdmin.

## About the app
   You have to authenticate to use the API.
   You can create a user with the endpoint POST /users/register.
   You can login with the endpoint POST /users/login.
   At the moment, the login token is valid for 2H. You will have to login again after this time.

### Authors :
    - Loriane HILDERAL
    - Clarence HIRSCH
    - Nino PLANE