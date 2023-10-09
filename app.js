
require("dotenv").config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');


const app = express();
require("./config/database").connect(); 

app.use(cors());
app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/books', booksRouter);
app.use('/api/users', usersRouter);

app.get("/",(req,res) => {
  console.log("heyy")
  res.status(200).send("success");
})
app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

module.exports = app;
