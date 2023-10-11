// Import the express app
const app = require('./app');

// Load environment variables
require("dotenv").config();

// Set the port for the server
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
