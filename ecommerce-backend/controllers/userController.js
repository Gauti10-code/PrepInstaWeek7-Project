const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // Add your user creation logic here (e.g., hashing passwords)
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Add your authentication logic here
    const user = await User.findOne({ email });
    if (user && user.password === password) { // Replace with hashed password check
      req.session.user = user; 
      res.status(200).json({ message: 'Login successful' });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get User Profile
const getUserProfile = async (req, res) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = await User.findById(req.session.user._id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




module.exports = {
  registerUser,
  loginUser,
  getUserProfile
};