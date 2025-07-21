import express from 'express';
import User from '../models/User.js';
import Tour from '../models/Tour.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

// Update user to admin
router.patch('/make-admin/:userId', verifyAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        user.role = 'admin';
        await user.save();

        res.status(200).json({
            success: true,
            message: "User role updated to admin successfully",
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role
            }
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user role",
            error: err.message
        });
    }
});

// Create a new tour (no auth)
router.post('/tours', async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();
        
        res.status(201).json({
            success: true,
            message: "Tour created successfully",
            data: savedTour
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create tour",
            error: err.message
        });
    }
});

export default router;
