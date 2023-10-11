// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for a book
const bookSchema = new mongoose.Schema({
  bookID: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
  },
  authors: {
    type: String,
    required: true,
  },
  average_rating: {
    type: Number,
    required: true,
  },
  isbn: {
    type: Number,
    required: true,
  },
  isbn13: {
    type: Number,
    required: true,
  },
  language_code: {
    type: String,
    required: true,
  },
  num_pages: {
    type: Number,
    required: true,
  },
  ratings_count: {
    type: Number,
    required: true,
  },
  text_reviews_count: {
    type: Number,
    required: true,
  },
  publication_date: {
    type: Date,
    required: true,
  },
  publisher: {
    type: String,
    required: true,
  },
});

// Export the Book model
module.exports = mongoose.model('Book', bookSchema);
