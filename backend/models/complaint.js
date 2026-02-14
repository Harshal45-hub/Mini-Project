const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
        trim: true,
        maxlength: [1000, 'Description cannot exceed 1000 characters']
    },
    voiceNote: {
        type: String,
        default: null
    },
    image: {
        type: String,
        required: [true, 'Image is required']
    },
    location: {
        type: String,
        required: [true, 'Location is required'],
        trim: true
    },
    department: {
        type: String,
        required: [true, 'Department is required'],
        enum: [
            'Public Works Department',
            'Electricity Department',
            'Water Supply Department',
            'Sanitation Department',
            'Road Transport Department',
            'Public Health Department',
            'Municipal Corporation'
        ]
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'critical'],
        default: 'medium'
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'resolved', 'closed'],
        default: 'pending'
    },
    adminNotes: {
        type: String,
        default: ''
    },
    resolutionImage: {
        type: String,
        default: null
    },
    resolutionNotes: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: null
    },
    feedback: {
        type: String,
        default: ''
    },
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    resolvedAt: {
        type: Date,
        default: null
    }
});

// Update timestamp on save
complaintSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    
    // Set resolvedAt when status changes to resolved
    if (this.status === 'resolved' && !this.resolvedAt) {
        this.resolvedAt = Date.now();
    }
    
    next();
});

module.exports = mongoose.models.Complaint || mongoose.model('Complaint', complaintSchema);