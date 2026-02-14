const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { auth, authorize } = require('../middleware/auth');
const Complaint = require('../models/complaint');

// Configure multer for resolution image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/resolutions/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'resolution-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    limits: { 
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only images are allowed.'), false);
        }
    }
});

// Apply authentication and department authorization to all routes
router.use(auth);
router.use(authorize('department'));

// Get complaints assigned to department
router.get('/complaints', async (req, res) => {
    try {
        const user = req.user;
        const { status, priority, page = 1, limit = 20 } = req.query;
        
        // Build filter for department's complaints
        const filter = { department: user.department };
        if (status) filter.status = status;
        if (priority) filter.priority = priority;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get complaints
        const complaints = await Complaint.find(filter)
            .populate('userId', 'name email')
            .sort({ 
                priority: -1, // High priority first
                createdAt: -1 
            })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        // Get total count
        const total = await Complaint.countDocuments(filter);

        res.json({
            message: 'Department complaints retrieved successfully',
            count: complaints.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            department: user.department,
            complaints
        });
    } catch (error) {
        console.error('Get Department Complaints Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving department complaints' 
        });
    }
});

// Update complaint status (department)
router.put('/complaints/:id/status', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const user = req.user;
        const { status } = req.body;

        // Validate status
        const validStatuses = ['in-progress', 'resolved'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status value. Department can only set to in-progress or resolved.' 
            });
        }

        // Find complaint in department
        const complaint = await Complaint.findOne({
            _id: complaintId,
            department: user.department
        });

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found in your department.' 
            });
        }

        // Update status
        complaint.status = status;
        if (status === 'resolved') {
            complaint.resolvedAt = Date.now();
        }
        
        await complaint.save();

        res.json({
            message: 'Status updated successfully',
            complaint: {
                id: complaint._id,
                status: complaint.status,
                title: complaint.title,
                resolvedAt: complaint.resolvedAt
            }
        });
    } catch (error) {
        console.error('Update Department Status Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while updating status' 
        });
    }
});

// Submit resolution for complaint
router.post('/complaints/:id/resolve', upload.single('resolutionImage'), async (req, res) => {
    try {
        const complaintId = req.params.id;
        const user = req.user;
        const { notes } = req.body;

        // Validate required fields
        if (!req.file) {
            return res.status(400).json({ 
                message: 'Resolution image is required.' 
            });
        }

        // Find complaint in department
        const complaint = await Complaint.findOne({
            _id: complaintId,
            department: user.department,
            status: { $ne: 'closed' }
        });

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found or already closed.' 
            });
        }

        // Update complaint with resolution
        complaint.status = 'resolved';
        complaint.resolutionImage = req.file.path;
        complaint.resolutionNotes = notes || '';
        complaint.resolvedAt = Date.now();
        
        await complaint.save();

        res.json({
            message: 'Resolution submitted successfully',
            complaint: {
                id: complaint._id,
                status: complaint.status,
                resolutionImage: complaint.resolutionImage,
                resolutionNotes: complaint.resolutionNotes,
                resolvedAt: complaint.resolvedAt,
                title: complaint.title
            }
        });
    } catch (error) {
        console.error('Submit Resolution Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while submitting resolution' 
        });
    }
});

// Get department statistics
router.get('/stats', async (req, res) => {
    try {
        const user = req.user;

        // Get department stats
        const stats = await Complaint.aggregate([
            { $match: { department: user.department } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                    avgResolutionTime: {
                        $avg: {
                            $cond: [
                                { $ne: ['$resolvedAt', null] },
                                { $subtract: ['$resolvedAt', '$createdAt'] },
                                null
                            ]
                        }
                    }
                }
            }
        ]);

        // Get total complaints
        const total = await Complaint.countDocuments({ department: user.department });

        // Get average rating
        const ratingStats = await Complaint.aggregate([
            { 
                $match: { 
                    department: user.department,
                    rating: { $ne: null }
                } 
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalRatings: { $sum: 1 }
                }
            }
        ]);

        // Format response
        const formattedStats = {
            department: user.department,
            total,
            byStatus: {},
            averageRating: ratingStats[0]?.averageRating || 0,
            totalRatings: ratingStats[0]?.totalRatings || 0
        };

        stats.forEach(stat => {
            formattedStats.byStatus[stat._id] = {
                count: stat.count,
                avgResolutionTime: stat.avgResolutionTime
            };
        });

        res.json({
            message: 'Department statistics retrieved successfully',
            stats: formattedStats
        });
    } catch (error) {
        console.error('Department Stats Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving department statistics' 
        });
    }
});

// Get complaint details for department
router.get('/complaints/:id', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const user = req.user;

        const complaint = await Complaint.findOne({
            _id: complaintId,
            department: user.department
        })
        .populate('userId', 'name email phone')
        .select('-__v');

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found in your department.' 
            });
        }

        res.json({
            message: 'Complaint details retrieved successfully',
            complaint
        });
    } catch (error) {
        console.error('Get Department Complaint Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while retrieving complaint details' 
        });
    }
});

module.exports = router;