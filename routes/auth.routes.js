const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middlewares/route-guard.middleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Here's the Auth");
});

// signup
router.post("/signup", async (req, res) => {
  
  // Encrypt the password
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);

  // Create a new User
  try {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      passwordHash,
      age: req.body.age,
      gender: req.body.gender,
      isInstructor: req.body.isInstructor, 
      height: req.body.height,
      weight: req.body.weight,
      workoutFrequency: req.body.workoutFrequency
    });

    res.status(201).json({ success: true, message: 'User created successfully', data: newUser });
  } catch (error) {
    // Check for duplicate key error (email already exists)
    if (error.code === 11000) {
      res.status(400).json({ success: false, message: 'Email already exists' });
    } else {
      console.error('Error creating user:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }
});

// Login
router.post("/login", async (req, res) => {
  // Get back the credentials from the body
  console.log(req.body);
  // Check if we have a user with this email
  try {
    const potentialUser = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (!potentialUser) {
      return res.status(400).json({ success: false, message: "No user found with this email" });
    }
    
    // Check if the password is correct
    if (bcrypt.compareSync(req.body.password, potentialUser.passwordHash)) {
      // User has the right credentials
      const authToken = jwt.sign(
        {
          userId: potentialUser._id,
          isInstructor: potentialUser.isInstructor, // Include isInstructor property
        },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "6h",
        }
      );

      res.status(200).json({ token: authToken });
    } else {
      res.status(400).json({ message: "Incorrect password" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "There was a problem" });
  }
});


// Verify
router.get("/verify", isAuthenticated, (req, res) => {
  res.json({ message: "Hello", data: req.tokenPayload });
});


// Profile route
router.get('/profile', isAuthenticated, async (req, res) => {
  try {
    // Extract user ID from token payload
    const userId = req.tokenPayload.userId;

    // Fetch user profile data from the database
    const userProfile = await User.findById(userId);

    if (!userProfile) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Respond with the user profile data including all fields
    res.status(200).json({
      name: userProfile.name,
      email: userProfile.email,
      age: userProfile.age,
      gender: userProfile.gender,
      isInstructor: userProfile.isInstructor,
      height: userProfile.height,
      weight: userProfile.weight,
      workoutFrequency: userProfile.workoutFrequency,
      // Include other fields as needed
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// New route for instructors to view users
router.get("/instructors/users", isAuthenticated, async (req, res) => {
  try {
    console.log("Fetching users...");
    // Ensure that the requester is an instructor
    if (!req.tokenPayload.isInstructor) {
      console.log("Not an instructor, returning 403 Forbidden");
      return res.status(403).json({ message: "Forbidden: Only instructors can access this endpoint" });
    }

    // Fetch all users from the database, specifying which fields to include
    const users = await User.find({}, { 
      name: 1,
      email: 1,
      age: 1,
      gender: 1,
      height: 1,
      weight: 1,
      workoutFrequency: 1,
    });

    // Respond with the list of users
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




module.exports = router;
