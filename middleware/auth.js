const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.header('Authorization').replace("Bearer ", '') || req.cookies.token || req.body.token;

  if (!token) {
    return res.status(403).send("Token is missing");
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    next(); 
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};

module.exports = auth;
