# auth-security

## Table of contents
* [General info](#general-info)
* [Features](#features)
* [Technologies Used](#technologies-used)
* [Setup](#setup)
* [Project Links](#project-links)

## General info

This is a web application that provides user authentication and security features. Users can register, log in, and submit secrets. Secrets are visible to authenticated users only.

## Features

* User registration: Users can create an account by providing a username and password.
* User login: Registered users can log in with their credentials.
* OAuth authentication: Users can authenticate using their Google account.
* Submit secrets: Authenticated users can submit their secrets, which are visible to other authenticated users.
* Logout: Users can log out of their accounts.

## Technologies Used

* Node.js: Backend JavaScript runtime environment.
* Express.js: Web application framework for Node.js.
* MongoDB: NoSQL database for storing user information and secrets.
* Mongoose: Object Data Modeling (ODM) library for MongoDB.
* Passport: Authentication middleware for Node.js.
* EJS: Embedded JavaScript templates for rendering views.
* Google OAuth 2.0: OAuth 2.0 authentication for Google accounts.
<!-- * [bcrypt](https://www.npmjs.com/package/bcrypt) -->

## Setup

1. Clone the repository:

```
git clone https://github.com/sisarus/auth-security.git
```
1. Navigate to the project directory:
```
cd auth-security
```
1. Install dependencies: 
```
npm install
```

1. Create a .env file in the project root and add the following environment variables. For using client ID and client secret you need API key from [Google](https://console.cloud.google.com/apis/dashboard?project=secret-386912)
* CLIENT_ID: Google OAuth 2.0 client ID
* CLIENT_SECRET: Google OAuth 2.0 client secret
* SESSION_SECRET: Secret key for session encryption

1. Open your web browser and visit http://localhost:3000 to access the application.

1. Run database: 
[Using Mongoose](https://www.mongodb.com/try/download/community) How run from [shell](https://www.mongodb.com/docs/mongodb-shell/?_ga=2.189154979.982079961.1683104589-1260333011.1683100294)

Command for shell:
```
mongod
```

1. Start the application:
```
npm start
```
or deveploment version:
```
npm run dev
```

1. Open your web browser and visit http://localhost:3000 to access the application.

## Project Links
* Opens to [localhost](http://localhost:3000/)

<!--complete / no longer being worked on. If you are no longer working on it, provide reasons why. -->

<!-- ## Start new project

npm init -y 

### Installed packages use later
```
npm i express ejs body-parser

npm mongoose

npm i mongoose-encryption

npm i dotenv
```

for Hashing
```
npm i md5
``` -->
