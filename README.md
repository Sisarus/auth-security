# auth-security

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)
* [Project Links](#project-links)
* [Project Status](#project-status)

## General info

Authentication and security


## Technologies
* Express
* EJS
* [Mongoose](https://www.npmjs.com/package/mongoose) - MongoDB
<!-- * [bcrypt](https://www.npmjs.com/package/bcrypt) -->
* [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)

## Setup

Open project folder and run terminal:
```
npm install
```

Run 
```
npm start
```

Run Nodemon dev
```
npm run dev
```

Run database: 
[Using Mongoose](https://www.mongodb.com/try/download/community) How run from [shell](https://www.mongodb.com/docs/mongodb-shell/?_ga=2.189154979.982079961.1683104589-1260333011.1683100294)

Command for shell:
```
mongod
```

For using client ID and client secret you need API key from [Google](https://console.cloud.google.com/apis/dashboard?project=secret-386912)
Create to root folder .env
```
CLIENT_ID=(YOUR GOOGLE API)
CLIENT_SECRET=(YOUR GOOGLE API)
```

## Project Links
* Opens to [localhost](http://localhost:3000/)


## Project Status
Project is: in progress

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
