import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';


// 🔹 User Registration

export const register = async (req, res) => {
  try {
    const { username, email, password, photo } = req.body;
    
    console.log("Original Password:", password);
    
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists!" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password:", hashedPassword);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      photo,
    });

    // Save user
    await newUser.save();

    res.status(201).json({ success: true, message: "Successfully registered!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ success: false, message: "Failed to register. Try again." });
  }
};

  
   
// 🔹 Generate JWT Token
const generateToken = (userId, role) => {
    return jwt.sign(
      { id: userId, role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  };
  
  // 🔹 User Login
  export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) return res.status(404).json({ success: false, message: "User not found." });
  
      // Validate password
      if (!(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ success: false, message: "Invalid credentials (incorrect email or password)." });
      }
  
      // Generate JWT
      const token = generateToken(user._id, user.role);
  
      // Set token in HTTP-only cookie (more secure)
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000, // 1 hour
      });
  
      res.status(200).json({
        success: true,
        message: "Login successful!",
        token, // Include token in response (optional)
        user: { id: user._id, username: user.username, email: user.email, role: user.role },
      });
  
    } catch (err) {
      console.error("Login Error:", err.message);
      res.status(500).json({ success: false, message: "Login failed.", error: err.message });
    }
  };