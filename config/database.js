const mongoose = require('mongoose');
require("dotenv").config();

const { MONGODB_URL } = process.env;
console.log(MONGODB_URL);
exports.connect = () => {
    console.log('Connect');
    mongoose
        .connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log(MONGODB_URL)
            console.log("DB Connection Successfully established");
        })
        .catch((error) => {
            console.log("DB Connection Error: " + error);
            process.exit(1);
        });
};
