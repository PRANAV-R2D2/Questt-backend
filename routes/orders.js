const express = require('express');
const router = express.Router();
const Order = require('../models/orders');
const Auth = require('../middleware/auth');

// POST /api/orders
router.post('/', Auth, async (req, res) => {
  try {
    console.log(req.body);
    const { books } = req.body;

    if (!Array.isArray(books) || books.length === 0) {
      return res.status(400).json({ error: 'Invalid or empty books array.' });
    }

    const newOrder = new Order({
      user: req.user, // Store user data as an object
      books: books,   // Store book data as an array of objects
    });

    const savedOrder = await newOrder.save();
    console.log(savedOrder);
    res.json(savedOrder);
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET /api/orders
router.get('/', Auth, async (req, res) => {
  try {
    // Fetch orders for the authenticated user
    const orders = await Order.find({ 'user.user_id': req.user.user_id }).populate('books');

    res.json(orders);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
