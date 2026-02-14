const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Department name is required'],
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Phone number is required'],
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: 'Phone must be 10 digits'
        }
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        trim: true
    },
    averageRating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    totalComplaints: {
        type: Number,
        default: 0
    },
    resolvedComplaints: {
        type: Number,
        default: 0
    },
    pendingComplaints: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Department', departmentSchema);