const mongoose = require('mongoose');

const {MONGODB_URL} = process.env;


exports.connect = () => {
    mongoose
    .connect(MONGODB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("DB Connection Successfully established    "))
    .catch((error) => {
        console.log("DB Connection Error: " + error);
        process.exit(1);
    
    });
};