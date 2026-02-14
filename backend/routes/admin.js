const express = require('express');
const router = express.Router();
const { auth, authorize } = require('../middleware/auth');
const Complaint = require('../models/complaint');
const User = require('../models/User');

// Apply authentication and admin authorization to all routes
router.use(auth);
router.use(authorize('admin'));

// Get all complaints (admin view)
router.get('/complaints', async (req, res) => {
    try {
        const { status, department, priority, page = 1, limit = 20 } = req.query;
        
        // Build filter
        const filter = {};
        if (status) filter.status = status;
        if (department) filter.department = department;
        if (priority) filter.priority = priority;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Get complaints with pagination
        const complaints = await Complaint.find(filter)
            .populate('userId', 'name email phone')
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit))
            .select('-__v');

        // Get total count for pagination
        const total = await Complaint.countDocuments(filter);

        res.json({
            message: 'Complaints retrieved successfully',
            count: complaints.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            complaints
        });
    } catch (error) {
        console.error('Get All Complaints Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving complaints' 
        });
    }
});

// Update complaint priority
router.put('/complaints/:id/priority', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { priority } = req.body;

        // Validate priority
        const validPriorities = ['low', 'medium', 'high', 'critical'];
        if (!validPriorities.includes(priority)) {
            return res.status(400).json({ 
                message: 'Invalid priority value.' 
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { priority },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found.' 
            });
        }

        res.json({
            message: 'Priority updated successfully',
            complaint: {
                id: complaint._id,
                priority: complaint.priority,
                title: complaint.title
            }
        });
    } catch (error) {
        console.error('Update Priority Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while updating priority' 
        });
    }
});

// Assign complaint to department
router.put('/complaints/:id/assign', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { department } = req.body;

        // Validate department
        const validDepartments = [
            'Public Works Department',
            'Electricity Department',
            'Water Supply Department',
            'Sanitation Department',
            'Road Transport Department',
            'Public Health Department',
            'Municipal Corporation'
        ];
        
        if (!validDepartments.includes(department)) {
            return res.status(400).json({ 
                message: 'Invalid department.' 
            });
        }

        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            { 
                department,
                status: 'in-progress'
            },
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found.' 
            });
        }

        res.json({
            message: 'Complaint assigned successfully',
            complaint: {
                id: complaint._id,
                department: complaint.department,
                status: complaint.status,
                title: complaint.title
            }
        });
    } catch (error) {
        console.error('Assign Complaint Error:', error);
        
        if (error.name === 'CastError') {
            return res.status(400).json({ 
                message: 'Invalid complaint ID.' 
            });
        }
        
        res.status(500).json({ 
            message: 'Server error while assigning complaint' 
        });
    }
});

// Update complaint status
router.put('/complaints/:id/status', async (req, res) => {
    try {
        const complaintId = req.params.id;
        const { status, adminNotes } = req.body;

        // Validate status
        const validStatuses = ['pending', 'in-progress', 'resolved', 'closed'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ 
                message: 'Invalid status value.' 
            });
        }

        const updateData = { status };
        if (adminNotes) updateData.adminNotes = adminNotes;

        const complaint = await Complaint.findByIdAndUpdate(
            complaintId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!complaint) {
            return res.status(404).json({ 
                message: 'Complaint not found.' 
            });
        }

        res.json({
            message: 'Status updated successfully',
            complaint: {
                id: complaint._id,
                status: complaint.status,
                adminNotes: complaint.adminNotes,
                title: complaint.title
            }
        });
    } catch (error) {
        console.error('Update Status Error:', error);
        
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

// Get dashboard statistics
router.get('/dashboard/stats', async (req, res) => {
    try {
        // Get total complaints
        const totalComplaints = await Complaint.countDocuments();
        
        // Get complaints by status
        const statusStats = await Complaint.aggregate([
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get complaints by priority
        const priorityStats = await Complaint.aggregate([
            {
                $group: {
                    _id: '$priority',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get complaints by department
        const departmentStats = await Complaint.aggregate([
            {
                $group: {
                    _id: '$department',
                    count: { $sum: 1 }
                }
            }
        ]);

        // Get recent complaints (last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        const recentComplaints = await Complaint.countDocuments({
            createdAt: { $gte: sevenDaysAgo }
        });

        res.json({
            message: 'Dashboard statistics retrieved successfully',
            stats: {
                total: totalComplaints,
                byStatus: statusStats,
                byPriority: priorityStats,
                byDepartment: departmentStats,
                recent: recentComplaints,
                departmentsCount: departmentStats.length
            }
        });
    } catch (error) {
        console.error('Dashboard Stats Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving dashboard statistics' 
        });
    }
});

// Get all users
router.get('/users', async (req, res) => {
    try {
        const users = await User.find()
            .select('-password -__v')
            .sort({ createdAt: -1 });

        res.json({
            message: 'Users retrieved successfully',
            count: users.length,
            users
        });
    } catch (error) {
        console.error('Get Users Error:', error);
        res.status(500).json({ 
            message: 'Server error while retrieving users' 
        });
    }
});

module.exports = router;