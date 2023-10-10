const mongoose = require('mongoose');

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

module.exports = mongoose.model('Order', orderSchema);
