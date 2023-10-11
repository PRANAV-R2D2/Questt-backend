# Online Bookstore

This is the backend for an online bookstore built with Node.js and MongoDB as part of a MERN stack.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of Node.js and npm.
* You have a Windows/Linux/Mac machine.
* You have read this guide to install MongoDB.

## Installing the Online Bookstore

To install the Online Bookstore, follow these steps:

1. Clone the repository: `git clone https://github.com/PRANAV696969/Questt-backend.git`
2. Navigate into the project directory: `cd Questt-backend`
3. Install the dependencies: `npm install`

## Configuring the Application

1. Create a `.env` file in the root directory of the project.
2. Add the following lines to the `.env` file:

    ```
    PORT="3001"
    MONGODB_URL="mongodb://127.0.0.1:27017/bookstore"
    SECRET_KEY="yourNewSecretKey"
    ```

Replace `"mongodb://127.0.0.1:27017/bookstore"` with your own MongoDB connection string if it's different.

Replace "yourNewSecretKey" with your new secret key. Remember to restart your server after making changes to the .env file for the changes to take effect.


## Running the Application

To start the server, run: `npm start`

The server will start running at `http://localhost:3001`.

## API Endpoints

* Register a new user: `POST /api/users/register`
* Login a user: `POST /api/users/login`
* Logout a user: `POST /api/users/logout`
* Create a new book: `POST /api/books`
* Get all books: `GET /api/books`
* Get a book by ID: `GET /api/books/:bookID`
* Update a book by ID: `PUT /api/books/:bookID`
* Delete a book by ID
* Place an order: `POST /api/orders`
