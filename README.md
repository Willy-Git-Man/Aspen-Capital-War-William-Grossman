#Aspen-Capital-War-William-Grossman
Play-War is an application where users can sign up then play other existing players and compete to get to the top of the leader board. 

* Live Site
Link to the live version of [Play-War](https://play-war.herokuapp.com/), hosted by Heroku.

* Tech
Play War is built on the following technologies

Backend - Express on Node.js

Frontend - React/Redux, Javascript

Database - PostgresSQL, Sequelize

Styling - HTML, CSS

* Features
The current version of the site has the following fully implemented features

* Full user authentication
Users can securely sign up and log back into accounts, passwords are hashed securely using BCrypt and are stored as such in the database

* Full access to other users for the purpose of playing and competing
Users can play any other player who has signed up

* Leaderboard stored in a database
All games are recorded and stored in a database so players can compete for the title of #1 War player in the universe (as it pertains to my application)

* Hosted on Heroku
The application is live so that users can connect and play online


* Installation
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
  
I made some tradeoffs as I built the application and I will outline what I would have liked to do and how I ended up spending my time below: 
I would have spent time writing tests for backend, I wrote try catches and error handlers which served me well and wanted to write jest tests though did not have the time
I would have made the front end much more appealing
I would have made a better shuffle algorithm, and designed better logic for the game. As I was writing the game logic I was surprised to run into things like endless loops if the deck isn't shuffled, strange things that can happen like multiple wars in a row, going     into war with less than 3 cards in a deck,etc. 
I would have liked to have built the schema first and put it in my readme, again I thought I would have time in the end to make it on and since I had one table I was focused on getting the game working, then it was time to submit. I have it all on paper but did not have time in the end to spend as much time on my read me as I should have 
I would have added variations to the game and worked with a shuffle pile rather than treating the deck as a stack
To that point I left a folder called Deck in my repo which I didn't use as I thought it would show my thought process going into the game and how ultimately I went another direction and rewrote the logic
I would have made a better Read.me I am not proud of how this looks. Particularly the lack of schema.
I wrote a small function that just basically flips a coin to generate a winner when the user clicks simulate game, I wanted you to be able to test the database quickly and I would have liked to actually have the entire game render in front of the user. That being said the logic for playing out each hand is the game of War.
I would have liked to make the game much more appealing, in the end I didn't have time to swap out the face cards so you'll notice 11,12,13,14 rather than Jack,Queen,King,Ace
I would have liked to make the code much cleaner, I had enough time to finish the app and get everything hosted but not enough time to go back and make everything as DRY as it could have been. To that point I should have prioritized some other things before hosting.
I would have liked to write an algorithm for various dilemmas that occur during the game, I did my best to make due with the time I had make the game play as close to real War as possible though I realized throughout the build that some scenarios took many game iterations to come to the surface
I would have liked to add docker, that was another quick thing I put off until the end then ran out of time
User Auth took longer than expected, I am not sure secure authorization was the best idea but I thought that players being able to securely sign up and play with each other would be a great touch. Unfortunately it may have taken 25-30% of my time.
Getting the redux store set up took longer than expected particularly when it came to updating wins in real time. I think that redux makes an application speed feel near magic and if I could do it again I would have built the app first without it then added it. 
I spent a lot of time on the game logic, much more than anticipated. It's truly one of those things that makes me appreciate the human brain. It seems like an easy concept but it's analogous to knowing the fastest way home. We all do it but it's much harder to write a traversal algorithm than it is to remember how not to get home.
I spent more time getting the database to update the wins than I would have liked. I had put that off until the end as it was the last piece of the puzzle and should have tested for it when I built the API from the beginning. I always build the backend first and would have gotten the same error from the beginning before I had built out the front end and the redux store. I know this because I ran fetch requests through the console and passed in the XSRF, then csrf token directly to the same result
With more time it would have been precisely how I pictured it. I underestimated how long putting the entire app together would take and in regards to the things I didn’t have time for that was my biggest downfall. 

  
  
  Finally create an account or log into the demo user to join the online sensation that is sweeping the nation
  
  Thank you for considering me for the postion I hope the installation was smooth,
  William

