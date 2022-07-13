# Aspen-Capital-War-William-Grossman
Play-War is an application where users can sign up then play other existing players and compete to get to the top of the leader board. 

## Live Site
Link to the live version of [Play-War](https://play-war.herokuapp.com/), hosted by Heroku.

## Tech
Play War is built on the following technologies

Backend - Express on Node.js

Frontend - React/Redux, Javascript

Database - PostgresSQL, Sequelize

Styling - HTML, CSS

## Features
The current version of the site has the following fully implemented features

### Full user authentication
Users can securely sign up and log back into accounts, passwords are hashed securely using BCrypt and are stored as such in the database
###Full access to other users for the purpose of playing and competing
Users can play any other player who has signed up
###Leaderboard stored in a database
All games are recorded and stored in a database so players can compete for the title of #1 War player in the universe (as it pertains to my application)
### Hosted on Heroku
The application is live so that users can connect and play online


##Installation
To install and start playing War, follow the instructions below:
Git clone: https://github.com/Willy-Git-Man/Aspen-Capital-War-William-Grossman.git
* Backend Dependencies:
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "csurf": "^1.11.0",
    "dotenv": "^16.0.0",
    "express": "^4.17.2",
    "express-async-handler": "^1.2.0",
    "express-validator": "^6.14.0",
    "helmet": "^5.0.2",
    "jsonwebtoken": "^8.5.1",
    "morgan": "^1.10.0",
    "per-env": "^1.0.2",
    "pg": "^8.7.1",
    "sequelize": "^5.22.5",
    "sequelize-cli": "^5.5.1"
  },
  "devDependencies": {
    "dotenv-cli": "^4.1.1",
    "nodemon": "^2.0.15"
  }
Run npm install
Install postgres: https://www.postgresql.org/download/ (Homebrew cmd: brew install postgresql)
Create a new user in postgresQl with CREATEDB and PASSWORD in PSQL
    -CREATE USER <username> WITH CREATEDB PASSWORD <'password'>
  
    * Create a .env file (
PORT=5000
DB_USERNAME=war_user
DB_PASSWORD=password
DB_DATABASE=war_database
DB_HOST=localhost
JWT_SECRET=secret
JWT_EXPIRES_IN=604800
  
  The proxy is set to PORT 5000, change it to your desired port if necessary
  
   * Run npx dotenv sequelize db:create
  * Run npx dotenv sequelize db:migrate
  * Run npx dotenv sequelize db:seed:all


Add the following scripts to package.json in the backend for easy database control:
    "sequelize": "sequelize",
    "sequelize-cli": "sequelize-cli",
    "start": "per-env",
    "start:development": "nodemon -r dotenv/config ./bin/www",
    "start:production": "node ./bin/www",
    "db:migrate": "dotenv sequelize-cli db:migrate",
    "db:migrate:undo:all": "dotenv sequelize-cli db:migrate:undo:all",
    "db:redo": "npm run db:seed:undo:all && npm run db:migrate:undo:all && npm run db:migrate && npm run db:seed:all",
    "db:seed:all": "dotenv sequelize-cli db:seed:all",
    "db:seed:undo:all": "dotenv sequelize-cli db:seed:undo:all",
    "db:drop": "dotenv sequelize-cli db:drop",
    "db:create": "dotenv sequelize-cli db:create",
    "db:reset": "npm run db:drop && npm run db:create && npm run db:migrate && npm run db:seed:all"
  
  The last script will drop,create,migrate,and seed the database by itself
  
  Run 'npm i react-icons' in the front end for access to the Github and LinkedIn Icons/Links 
  
  
  Finally create an account or log into the demo user to join the online sensation that is sweeping the nation
  
  Thank you for considering me for the postion I hope the installation was smooth,
  William

