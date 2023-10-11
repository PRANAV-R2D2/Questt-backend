# My Bookstore - Backend

This is the backend for an online bookstore application built with Node.js, Express.js, and MongoDB. The application allows users to browse, search for, and purchase books.

## Features

- User registration, login, and logout
- Browsing and searching for books
- Creating orders

## Technologies Used

- Node.js: A JavaScript runtime built on Chrome's V8 JavaScript engine
- Express.js: A fast, unopinionated, and flexible Node.js web application framework
- MongoDB: A source-available cross-platform document-oriented database program
- Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js
- JSON Web Token (JWT): A compact URL-safe means of representing claims to be transferred between two parties

## Project Structure

The project is structured as follows:

- `routes`: This directory contains all the route handlers such as books, users, and orders.
- `models`: This directory contains all the Mongoose models such as Book, User, and Order.
- `middleware`: This directory contains all the middleware functions such as authentication.
- `config`: This directory contains configuration files such as the database connection setup.

## Prerequisites

Before you begin, ensure you have met the following requirements:

* You have installed the latest version of Node.js and npm.
* You have a Windows/Linux/Mac machine.
* You have read this guide to install MongoDB.

## Installing My Bookstore

To install My Bookstore, follow these steps:

1. Clone the repository: 
    ```
    git clone https://github.com/PRANAV696969/Questt-backend.git
    ```
2. Navigate into the project directory: 
    ```
    cd Questt-backend
    ```
3. Install the dependencies: 
    ```
    npm install
    ```

## Configuring My Bookstore

1. Create a `.env` file in the root directory of the project.
2. Add the following lines to the `.env` file:

    ```
    PORT="3001"
    MONGODB_URL="mongodb://127.0.0.1:27017/bookstore"
    SECRET_KEY="yourNewSecretKey"
    ```

Replace `"mongodb://127.0.0.1:27017/bookstore"` with your own MongoDB connection string if it's different.

Replace "yourNewSecretKey" with your new secret key. Remember to restart your server after making changes to the .env file for the changes to take effect.

## Running My Bookstore Locally

To run My Bookstore locally, follow these steps:

1. Start the development server: 
    ```
    node index.js
    ```
2. Open your web browser and visit `http://localhost:3001`.

## Deploying My Bookstore

To deploy My Bookstore, you can use a cloud platform like Heroku or AWS. Here are general steps you might follow:

1. Create a new application on your cloud platform.
2. Connect your cloud application to your GitHub repository.
3. Configure environment variables on your cloud platform (similar to how you configured them in your `.env` file).
4. Deploy your application using the tools provided by your cloud platform.

Please note that these are general steps and might vary depending on the cloud platform you're using.

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

## Contact

If you want to contact me, you can reach me at `pranavhiremath64@gmail.com`.
