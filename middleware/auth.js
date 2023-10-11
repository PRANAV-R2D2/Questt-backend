// Import the jsonwebtoken module
const jwt = require("jsonwebtoken");

// Define the authentication middleware
const auth = (req, res, next) => {
  // Get the token from the Authorization header, cookies, or request body
  const token = req.header('Authorization').replace("Bearer ", '') || req.cookies.token || req.body.token;

  // If there's no token, return a 403 error
  if (!token) {
    return res.status(403).send("Token is missing");
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    // Attach the decoded token to the request object
    req.user = decoded;

    // Call the next middleware function
    next(); 
  } catch (error) {
    // If there's an error (e.g., the token is invalid), return a 401 error
    return res.status(401).json({ error: "Invalid token" });
  }
};

// Export the authentication middleware
module.exports = auth;
