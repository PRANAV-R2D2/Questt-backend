const express = require('express');
const { MongoClient } = require('mongodb');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const booksRouter = require('./routes/books');

const app = express();
const port = 3000;

const url = 'mongodb://127.0.0.1:27017';
const dbName = 'library';

// Create a MongoDB connection pool
const client = new MongoClient(url);

app.use(morgan('combined'));
app.use(bodyParser.json());

app.use('/api/books', booksRouter);

app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
