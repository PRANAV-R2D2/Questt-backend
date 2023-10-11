// Import the mongoose module
const mongoose = require('mongoose');

// Load environment variables
require("dotenv").config();

// Get the MongoDB URL from the environment variables
const { MONGODB_URL } = process.env;

// Export a function to connect to the database
exports.connect = () => {
    // Log the MongoDB URL (for debugging purposes)
    console.log(MONGODB_URL);

    // Connect to the MongoDB database
    mongoose
        .connect(MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            // Log a success message if the connection is successful
            console.log("DB Connection Successfully established");
        })
        .catch((error) => {
            // Log an error message and exit the process if the connection fails
            console.log("DB Connection Error: " + error);
            process.exit(1);
        });
};
