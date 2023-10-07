require("dotenv").config();
require("./config/database").connect(); 

const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');

const User = require('./models/users'); 

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'library';  

// Create a MongoDB connection pool
// const client = new MongoClient(url);

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/books', booksRouter);

app.post("/register", async (req, res) => {
  
    const {firstname, lastname,email,password} = req.body

    if(!(email && password && firstname && lastname)){
      res.status(400).send("All fields are required.")
    }

    const existingUser = await User.findOne({email});         // PROMISE issue

    if (existingUser) {
      res.status(401).send("User already exists")
    }

    

})


app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
