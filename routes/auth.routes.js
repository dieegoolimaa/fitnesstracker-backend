const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { isAuthenticated } = require("../middlewares/route-guard.middleware");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.json("Here's the Auth");
});

// Signup
router.post("/signup", async (req, res) => {
  // Get back the data from the body
  console.log(req.body);
  // Encrypt the password
  const salt = bcrypt.genSaltSync(13);
  const passwordHash = bcrypt.hashSync(req.body.password, salt);
  // Create a new User
  try {
    const newUser = await User.create({
      email: req.body.email,
      passwordHash,
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
// Login
router.post("/login", async (req, res) => {
  // Get back the credentials from the body
  console.log(req.body);
  // Check if we have a user with this username
  try {
    const potentialUser = await User.findOne({
      email: req.body.email.toLowerCase(),
    });
    if (potentialUser) {
      // Check if the password is correct
      if (bcrypt.compareSync(req.body.password, potentialUser.passwordHash)) {
        // User has the right credentials

        const authToken = jwt.sign(
          {
            userId: potentialUser._id,
          },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "6h",
          }
        );

        res.status(200).json({ token: authToken });
      } else {
        res.status(400).json({ mesage: "Incorrect password" });
      }
    } else {
      res.status(400).json({ mesage: "No user with this username" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ mesage: "There was a problem" });
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

module.exports = router;
