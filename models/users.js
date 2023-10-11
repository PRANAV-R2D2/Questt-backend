// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for a user
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    default: null,
  },
  lastname: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

// Export the User model
module.exports = mongoose.model('User', userSchema);
