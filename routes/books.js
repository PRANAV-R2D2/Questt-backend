const express = require('express');
const router = express.Router();
const Book = require('../models/books');
// const Auth = require('../middleware/auth'); 


// Create a new book
router.post('/', async (req, res) => {
  try {
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get all books
router.get('/', async (req, res) => {
  try {
    const books = await Book.find().limit(21);
    res.json(books);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Get a specific book by ID
router.get('/:bookID',  async (req, res) => {
  try {
    const book = await Book.findOne({ bookID: req.params.bookID });
    console.log(book);
    console.log(req.params.bookID);
    if (book) {
      res.json({
        book: book 
      });
    } else {
      res.status(404).send('Book not found.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Update a book by ID
router.put('/:bookID'  , async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { bookID: req.params.bookID },
      req.body,
      { new: true }
    );
    if (updatedBook) {
      res.json(updatedBook);
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Delete a book by ID
router.delete('/:bookID', async (req, res) => {
  try {
    const result = await Book.deleteOne({ bookID: req.params.bookID });
    if (result.deletedCount === 1) {
      res.status(200).send('Book deleted successfully');
    } else {
      res.status(404).send('Book not found');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
// Search Books by Title
router.get('/search/title/:title', async (req, res) => {
  try {
    const books = await Book.find({ title: new RegExp(req.params.title, 'i') }).limit(20);
    if (books.length > 0) {
      console.log(books);
      res.json(books);

    } else {
      res.status(404).send('No books found with the given title');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Search Books by Author
router.get('/search/authors/:authors', async (req, res) => {
  try {
    const books = await Book.find({ authors: new RegExp(req.params.author, 'i') }).limit(20);
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).send('No books found with the given author');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Search Books by Publisher
router.get('/search/publisher/:publisher', async (req, res) => {
  try {
    const books = await Book.find({ publisher: new RegExp(req.params.publisher, 'i') }).limit(20);
    if (books.length > 0) {
      res.json(books);
    } else {
      res.status(404).send('No books found with the given publisher');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});



module.exports = router;
