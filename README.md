# DateSmith Dating App

Welcome to DateSmith, the exciting dating app that brings people together through the power of swiping! Whether you're looking for love, friendship, or just a casual connection, DateSmith has got you covered. Feel free to make connections and even plan Events!

## Installation Guide
Follow these steps to get DateSmith up and running on your local machine.

**Fork and Clone the Repository:**

### Server Setup
Install dependencies using Pipenv:
**pipenv install**

Activate the virtual environment:
**pipenv shell**

Navigate to the server directory:
**cd server**

Install Flask and other required packages:
**pip install flask flask_cors flask_migrate flask_restful**

Initialize the database:
**flask db init**

Perform the initial migration:
**flask db migrate -m initial**

Apply the migration:
**flask db upgrade head**

Seed the database with initial data:
**python seed.py**

Run the Flask app:
**python app.py**

### Client Setup
Navigate to the client directory:
**cd client**

Install Node.js dependencies using npm:
**npm install**

Install Yup and Formik:
**npm install yup formik**

Start the client app:
**npm start**

Now, you should be able to access SwipeMate by navigating to http://localhost:3000 in your web browser.

## Upcoming Updates
- implement a messaging functionality
- create swipes to create a connection rather than buttons
- connecting the map with the events
- mobile functionality


### Contributors

Joseph [Github](https://github.com/joeylee08)

Austin [Github](https://github.com/austinohlfs96)

Isaac [Github](https://github.com/isaacwilhite)

Happy swiping! 💖🔥✨