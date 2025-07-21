
import User from '../models/User.js';

// 1. Create a new user
export const createUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully!",
      data: savedUser,
    });
  } catch (err) {
    console.error("Error creating user:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to create user. Please try again.",
      error: err.message,
    });
  }
};

// 2. Get all users with pagination
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 8;

  try {
    const users = await User.find({})
      .skip((page - 1) * limit)
      .limit(limit);

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page,
        limit,
      },
    });
  } catch (err) {
    console.error("Error fetching users:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again.",
      error: err.message,
    });
  }
};

// 3. Get a single user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User fetched successfully.",
      data: user,
    });
  } catch (err) {
    console.error("Error fetching user:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch user. Please try again.",
      error: err.message,
    });
  }
};

// 4. Update a user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully.",
      data: updatedUser,
    });
  } catch (err) {
    console.error("Error updating user:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to update user. Please try again.",
      error: err.message,
    });
  }
};

// 5. Delete a user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully.",
      data: deletedUser,
    });
  } catch (err) {
    console.error("Error deleting user:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to delete user. Please try again.",
      error: err.message,
    });
  }
};

// 6. Search for users by name or email
export const searchUsers = async (req, res) => {
  const { searchQuery } = req.query;

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
      ],
    });

    res.status(200).json({
      success: true,
      message: "Search results fetched successfully.",
      data: users,
    });
  } catch (err) {
    console.error("Error searching users:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to search users. Please try again.",
      error: err.message,
    });
  }
};
