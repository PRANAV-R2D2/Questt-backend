// Import the required modules
const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Auth = require('../middleware/auth');

// Route to create a new order
router.post('/', Auth, async (req, res) => {
  try {
    const { books } = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty books array.' });
    }

    const newOrder = new Order({
      user: req.user,
      books: books,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Route to get all orders
router.get('/', Auth, async (req, res) => {
  try {
    const orders = await Order.find({ 'user.user_id': req.user.user_id }).populate('books');
    res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Export the router module
module.exports = router;
