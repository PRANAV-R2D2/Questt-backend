// Import the required modules
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Auth = require('../middleware/auth');

// Route to register a new user
router.post('/register', async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;

    if (!(email && password && firstname && lastname)) {
      return res.status(400).send('All fields are required.');
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).send('User already exists');
    }

    const myEncPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstname,
      lastname,
      email: email.toLowerCase(),
      password: myEncPassword,
    });

    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: '2h',
      }
    );

    user.token = token;
    await user.save();

    user.password = undefined;

    return res.status(201).json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Route to login a user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!(email && password)) {
      return res.status(400).send('Fields are missing');
    }

    const user = await User.findOne({ email });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: '2h',
        }
      );

      user.token = token;
      await user.save();

      user.password = undefined;
      return res.status(200).json(user);
    }

    return res.status(404).send('Incorrect email or password');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Route to logout a user
router.post('/logout', Auth, async (req, res) => {
  try {
    req.user.token = null;
    await req.user.save();
    return res.status(200).send('Logout successful');
  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

// Export the router module
module.exports = router;
