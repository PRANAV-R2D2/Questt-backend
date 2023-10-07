const express = require('express');
const router = express.Router();
const { MongoClient } = require('mongodb');

// Create a MongoDB connection pool
const client = new MongoClient('mongodb://127.0.0.1:27017');
const dbName = 'library';

router.get('/', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      const books = await collection.find().limit(10).toArray();
  
      res.json(books);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.get('/:bookID', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      const book = await collection.findOne({ bookID: parseInt(req.params.bookID) });
  
      if (book) {
        res.json(book);
      } else {
        res.status(404).send('Book not found');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.post('/', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      // Validate if bookID is a number and present in the request body
      if (!req.body.bookID || isNaN(req.body.bookID)) {
        return res.status(400).send('Invalid or missing bookID');
      }
  
      const newBook = { ...req.body };
      console.log(newBook);
      // No need to convert bookID to a string
      const result = await collection.insertOne(newBook);
      console.log(result);
      console.log(result.acknowledged);
  
      if (result.acknowledged) {
        res.status(201).send("book added successfully");  
      } else {
        res.status(500).send('Failed to create book');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.put('/:bookID', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      // Validate if bookID is a number and present in the request body
      if (!req.body.bookID || isNaN(req.body.bookID)) {
        return res.status(400).send('Invalid or missing bookID');
      }
  
      const updatedBook = { ...req.body };
      const result = await collection.updateOne({ bookID: parseInt(req.params.bookID) }, { $set: updatedBook });
  
      if (result.acknowledged) {
        res.status(200).send("Book updated successfully");
      } else {
        res.status(500).send('Failed to update book');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  router.delete('/:bookID', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      const result = await collection.deleteOne({ bookID: parseInt(req.params.bookID) });
  
      if (result.acknowledged) {
        res.status(200).send("Book deleted successfully");
      } else {
        res.status(500).send('Failed to delete book');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.get('/search/title/:title', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      // Use a regular expression for case-insensitive matching
      const books = await collection.find({ title: new RegExp(req.params.title, 'i') }).toArray();
  
      if (books.length > 0) {
        res.json(books);
      } else {
        res.status(404).send('No books found with the given title');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.get('/search/author/:author', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      // Use a regular expression for case-insensitive matching
      const books = await collection.find({ authors: new RegExp(req.params.author, 'i') }).toArray();
  
      if (books.length > 0) {
        res.json(books);
      } else {
        res.status(404).send('No books found with the given author');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  router.get('/search/publisher/:publisher', async (req, res) => {
    let isConnected = false;
  
    try {
      await client.connect();
      isConnected = true;
  
      const db = client.db(dbName);
      const collection = db.collection('books');
  
      // Use a regular expression for case-insensitive matching
      const books = await collection.find({ publisher: new RegExp(req.params.publisher, 'i') }).toArray();
  
      if (books.length > 0) {
        res.json(books);
      } else {
        res.status(404).send('No books found with the given publisher');
      }
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(500).send('Internal Server Error');
    } finally {
      if (isConnected) {
        await client.close();
        console.log('MongoDB connection closed.');
      }
    }
  });
  
  
  module.exports = router;
