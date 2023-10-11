// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for an order
const orderSchema = new mongoose.Schema({
  user: {
    type: Object, // Store user data as an object
    required: true,
  },
  books: [
    {
      type: Object, // Store book data as an object
      required: true,
    },
  ],
});

// Export the Order model
module.exports = mongoose.model('Order', orderSchema);
