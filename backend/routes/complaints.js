const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth } = require('../middleware/auth');
const Complaint = require('../models/complaint');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'audio/webm', 'audio/mpeg'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images and audio are allowed.'), false);
    }
};

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: fileFilter
});

// Create new complaint
router.post('/', auth, upload.fields([
    { name: 'image', maxCount: 1 },
    { name: 'voiceNote', maxCount: 1 }
]), async (req, res) => {
    try {
        const { title, description, location, department } = req.body;
        const userId = req.userId;

        // Validate required fields
        if (!title || !description || !location || !department) {
            return res.status(400).json({ 
                message: 'Title, description, location, and department are required.' 
            });
        }

        // Check if image was uploaded
        if (!req.files || !req.files['image']) {
            return res.status(400).json({ 
                message: 'Image is required.' 
            });
        }

        // Get file paths
        const imagePath = req.files['image'][0].path;
        const voiceNotePath = req.files['voiceNote'] ? req.files['voiceNote'][0].path : null;

        // Create complaint
        const complaint = new Complaint({
            userId,
            title,
            description,
            voiceNote: voiceNotePath,
            image: imagePath,
            location,
            department,
            status: 'pending',
            priority: 'medium'
        });

        await complaint.save();

        res.status(201).json({
            message: 'Complaint submitted successfully',
            complaint: {
                id: complaint._id,
                title: complaint.title,
                status: complaint.status,
                priority: complaint.priority,
                department: complaint.department,
                createdAt: complaint.createdAt
            }
        });
    } catch (error) {
        console.error('Create Complaint Error:', error);
        
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ 
                message: 'Validation failed', 
                errors 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while creating complaint' 
        });
    }
});

// Get user's complaints
router.get('/my-complaints', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const complaints = await Complaint.find({ userId })
            .sort({ createdAt: -1 })
            .select('-__v');

        res.json({
            message: 'Complaints retrieved successfully',
            count: complaints.length,
            complaints
        });
    } catch (error) {
        console.error('Get Complaints Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving complaints' 
        });
    }
});

// Get single complaint by ID
router.get('/:id', auth, async (req, res) => {
    try {
        const complaintId = req.params.id;
        const userId = req.userId;

        const complaint = await Complaint.findOne({ 
            _id: complaintId, 
            userId 
        }).select('-__v');

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found or access denied.' 
            });
        }

        res.json({
            message: 'Complaint retrieved successfully',
            complaint
        });
    } catch (error) {
        console.error('Get Complaint Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while retrieving complaint' 
        });
    }
});

// Submit rating for resolved complaint
router.post('/:id/rate', auth, async (req, res) => {
    try {
        const complaintId = req.params.id;
        const userId = req.userId;
        const { rating, feedback } = req.body;

        // Validate rating
        if (!rating || rating < 1 || rating > 5) {
            return res.status(400).json({ 
                message: 'Rating must be between 1 and 5.' 
            });
        }

        // Find complaint
        const complaint = await Complaint.findOne({
            _id: complaintId,
            userId,
            status: 'resolved'
        });

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found, not resolved, or access denied.' 
            });
        }

        // Check if already rated
        if (complaint.rating) {
            return res.status(400).json({ 
                message: 'Complaint already rated.' 
            });
        }

        // Update complaint with rating
        complaint.rating = rating;
        complaint.feedback = feedback || '';
        complaint.status = 'closed';
        
        await complaint.save();

        res.json({
            message: 'Rating submitted successfully',
            complaint: {
                id: complaint._id,
                rating: complaint.rating,
                feedback: complaint.feedback,
                status: complaint.status
            }
        });
    } catch (error) {
        console.error('Rate Complaint Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while submitting rating' 
        });
    }
});

// Get complaint statistics for user
router.get('/stats/my-stats', auth, async (req, res) => {
    try {
        const userId = req.userId;

        const stats = await Complaint.aggregate([
            { $match: { userId: userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Format stats
        const formattedStats = {
            total: 0,
            pending: 0,
            'in-progress': 0,
            resolved: 0,
            closed: 0
        };

        stats.forEach(stat => {
            formattedStats[stat._id] = stat.count;
            formattedStats.total += stat.count;
        });

        res.json({
            message: 'Statistics retrieved successfully',
            stats: formattedStats
        });
    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving statistics' 
        });
    }
});

module.exports = router;