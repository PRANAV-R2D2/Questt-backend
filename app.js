require("dotenv").config();
require("./config/database").connect(); 
const express = require('express');
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken');

const User = require('./models/users'); 


const app = express();
port = 3000;

app.use(express.json());

app.post("/register", async (req, res) => {

    try { 
      const {firstname, lastname,email,password} = req.body

      if(!(email && password && firstname && lastname)){
        res.status(400).send("All fields are required.")
      }
    
      const existingUser = await User.findOne({email});         // PROMISE issue
    
      if (existingUser) {
        res.status(401).send("User already exists"); 
      }
    
      const  myEncPassword =  await bcrypt.hash(password,10)
    
      const user = await User.create({
        firstname,
        lastname,
        email : email.toLowerCase(),
        password : myEncPassword,
      })
    
      const token = jwt.sign(
        {user_id : user._id,email},
        process.env.SECRET_KEY,
        {
          expiresIn: "2h"
        }
    
      )
      user.token = token
        //update the token or not in the database
        //TODO: 


      res.status(201).json(user)

    } catch (error) {
      console.log(error);
    } 
})

app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


