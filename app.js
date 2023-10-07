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
        
      user.password = undefined


      res.status(201).json(user)

    } catch (error) {
      console.log(error);
    } 
})

app.post("/login", async (req,res) => {

    try{

        const { email, password } = req.body;
        console.log(email)
        console.log(password)
        if (!(email && password)){
          res.status(400).send("field is missing")
        }


        const user = await User.findOne({email})
        if (user && await bcrypt.compare(password, user.password)){
          
          const token = jwt.sign(
                                  {user_id: user._id, email },
                                  process.env.SECRET_KEY,
                                  {
                                    expiresIn: "2h"
                                  })

          user.token = token
          user.password = undefined
          res.status(200).json(user)


        }
        res.status(404).send("your email or password is incorrect");

        


    }catch(error){
      console.log(error);
    }
} )



app.use((req, res) => {
  res.status(404).send('The route you are trying to access does not exist.');
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});


