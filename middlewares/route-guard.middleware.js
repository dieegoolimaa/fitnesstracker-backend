const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // get the token from headers "Bearer 123XYZ..."
    const payload = jwt.verify(token, process.env.TOKEN_SECRET); // decode token and get payload

    req.tokenPayload = payload; // to pass the decoded payload to the next route
    next();
  } catch (error) {
    // the middleware will catch error and send 401 if:
    // 1. There is no token
    // 2. Token is invalid
    // 3. There is no headers or authorization in req (no token)
    res.status(401).json("token not provided or not valid");
  }
};
const isInstructor = async (req, res, next) => {
  const { userId } = req.tokenPayload;
  console.log("User ID:", userId); // Add this line to check the user ID
  try {
    const user = await User.findById(userId);
    if (user.isInstructor) {
      next();
    } else {
      console.log("Not an instructor, returning 403 Forbidden");
      res.status(403).json({ message: "Forbidden: Only instructors can access this endpoint" });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = { isAuthenticated, isInstructor };
