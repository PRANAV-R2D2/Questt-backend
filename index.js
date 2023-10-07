require("dotenv").config();
require("./config/database").connect();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users'); // Require the users.js router

const User = require('./models/users');

const app = express();
const port = 3000;

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter); // Use the users.js router for user-related routes

// ... (user registration and login routes)

app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
