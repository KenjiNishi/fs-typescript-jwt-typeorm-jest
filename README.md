# fs-typescript-jwt-typeorm-jest
Typescript Backend 
* JsonWebToken used for Authentication;
* Bcryptjs handles encryption of passwords;
* TypeORM to manage a relational database (sqlite);
* Jest and supertest are responsible for integration testing on a separate database.
  
React Typescript Frontend
* Focus on Functional Components and Hooks
* Redux+Thunk to manage state variables and HTTP requests;

## Project Scope
SPA web app for registering Candidates for Job Openings that integrates with a Backend REST API.

The app can only be accessed by Recruiters, with Login Authentication. Recruiter can be registered using API calls (below).

Features:
* Login with Email and Password;
* Candidate CRUD with: Name, Email, Age, LinkedIn URL and a multiple choice combo of technologies;
* It must be possible to filter the candidate list by desired technology.

## Running the Backend
At the Project root `./`:
* Install dependencies with ```yarn install```;
* Run database migrations with ```yarn typeorm migration:run``` ;
* Create a .env file with 
    ```
    PORT = 8080
    SERVER_URL="http://localhost"
    TOKEN_SECRET ='supersecretpassword'
    ```
* Run the server with ```yarn dev``` ;
* For test cases use ```yarn test```;

## Running the Frontend
At the `./app-client` directory:
* Install dependencies with ```yarn install```;
* Run the server with ```yarn start``` ;
* If not running, add a .env file with 
    ```
    SKIP_PREFLIGHT_CHECK=true
    ```

## Backend API
Inside the `./etc` there are `.rest` files with examples of HTTP requests using this API. They can be used with the [RestClient VsCode](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) extension.

The Candidates API routes are protected by Token Authentication.

Endpoint | Method | Description
---------|----------|----------
 /api/recruiters/create | POST | Creates a new Recruiter that can be logged in
 /api/recruiters/auth/  | POST | Checks E-mail and Password, returns Recruiter info and Token
 /api/candidates/create/ | POST | Creates a new Candidate entry
 /api/candidates/list/ | GET | Gets an Array of Candidates in the database
 /api/candidates/get/:id | GET | Gets Candidate information by id
 /api/candidates/update/id | PUT | Updates Candidate info by id
 /api/candidates/delete/id | DELETE | Deletes Candidate entry by id


## Screenshots
![login1](/etc/ss0.jpg)
![dashboard1](/etc/ss1.jpg)
![dashboard2](/etc/ss2.jpg)
![dashboard3](/etc/ss3.jpg)
