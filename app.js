// Load environment variables
require("dotenv").config();

// Import required modules
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');

// Import routers
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');
const ordersRouter = require('./routes/orders'); 

// Initialize express app
const app = express();

// Connect to the database
require("./config/database").connect(); 

// Middleware for handling CORS
app.use(cors());

// Middleware for logging HTTP requests
app.use(morgan('combined'));

// Middleware for parsing JSON bodies
app.use(express.json());

// Routes for handling API endpoints
app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);
app.use('/api/orders', ordersRouter);

// Middleware for handling non-existing routes
app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

// Export the app module
module.exports = app;
