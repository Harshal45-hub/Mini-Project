const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// User Signup
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, aadharNumber, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ 
            $or: [{ email }, { aadharNumber }] 
        });
        
        if (existingUser) {
            return res.status(400).json({ 
                message: 'User already exists with this email or Aadhar number.' 
            });
        }

        // Create new user
        const user = new User({
            name,
            email,
            password,
            aadharNumber,
            phone,
            address,
            role: 'user'
        });

        await user.save();

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(201).json({
            message: 'User created successfully',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Signup Error:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error during signup' 
        });
    }
});

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ 
                message: 'Invalid email or password.' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid email or password.' 
            });
        }

        // Check if account is active
        if (!user.isActive) {
            return res.status(401).json({ 
                message: 'Account is deactivated. Please contact support.' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department,
                phone: user.phone
            }
        });
    } catch (error) {
        console.error('Login Error:', error);
        res.status(500).json({ 
            message: 'Server error during login' 
        });
    }
});

// Admin Login
router.post('/admin-login', async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;


        // Verify admin secret key
        // console.log(typeof password);
        // console.log(typeof process.env.ADMIN_SECRET_KEY);
        if (password !== process.env.ADMIN_SECRET_KEY) {
            return res.status(401).json({ 
                message: 'Invalid admin secret key.' 
            });
        }

        // Find admin user
        const user = await User.findOne({ 
            email, 
            role: 'admin' 
        });
        console.log(user);
        if (!user) {
            return res.status(401).json({ 
                message: 'Admin not found.' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid email or password.' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Admin login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Admin Login Error:', error);
        res.status(500).json({ 
            message: 'Server error during admin login' 
        });
    }
});

const bcrypt = require('bcrypt');

bcrypt.hash('admin123', 10).then(hash => {
    console.log(hash);
});

console.log(bcrypt);

// Department Login
router.post('/department-login', async (req, res) => {
    try {
        const { email, password, department } = req.body;

        // Find department user
        const user = await User.findOne({ 
            email, 
            role: 'department',
            department: department 
        });
        
        if (!user) {
            return res.status(401).json({ 
                message: 'Department staff not found.' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                message: 'Invalid email or password.' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.json({
            message: 'Department login successful',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                department: user.department
            }
        });
    } catch (error) {
        console.error('Department Login Error:', error);
        res.status(500).json({ 
            message: 'Server error during department login' 
        });
    }
});

// Get Current User Profile
router.get('/profile', async (req, res) => {
    try {
        // This would require authentication middleware
        // For now, we'll implement it later
        res.json({ 
            message: 'Profile endpoint - requires authentication' 
        });
    } catch (error) {
        console.error('Profile Error:', error);
        res.status(500).json({ 
            message: 'Server error' 
        });
    }
});

module.exports = router;