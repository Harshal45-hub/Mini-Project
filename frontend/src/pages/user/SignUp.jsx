import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        aadharNumber: '',
        phone: '',
        address: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validateAadhar = (aadhar) => {
        return /^\d{12}$/.test(aadhar);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        
        const newErrors = {};
        if (!validateAadhar(formData.aadharNumber)) {
            newErrors.aadharNumber = 'Aadhar must be 12 digits';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }
        
        setLoading(true);
        try {
            const response = await axios.post('/api/auth/signup', {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                aadharNumber: formData.aadharNumber,
                phone: formData.phone,
                address: formData.address
            });
            
            login(response.data.token, response.data.user);
            navigate('/tutorial');
        } catch (error) {
            setErrors({ submit: error.response?.data?.message || 'Signup failed' });
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            padding: '2rem 1rem'
        },
        wrapper: {
            maxWidth: '800px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem',
            color: 'white'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        subtitle: {
            fontSize: '1.125rem',
            opacity: 0.9
        },
        card: {
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '2rem',
            marginBottom: '2rem'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        grid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
        },
        inputGroup: {
            position: 'relative'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 500,
            color: '#374151'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: `1px solid ${errors.aadharNumber || errors.password || errors.confirmPassword ? '#dc2626' : '#d1d5db'}`,
            borderRadius: '0.5rem',
            fontSize: '1rem',
            transition: 'border-color 0.15s ease-in-out'
        },
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            resize: 'vertical',
            minHeight: '80px'
        },
        error: {
            color: '#dc2626',
            fontSize: '0.875rem',
            marginTop: '0.25rem'
        },
        noteBox: {
            background: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '1rem'
        },
        noteText: {
            color: '#1e40af',
            fontSize: '0.875rem',
            lineHeight: 1.5
        },
        checkbox: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        checkboxInput: {
            width: '1rem',
            height: '1rem'
        },
        checkboxLabel: {
            fontSize: '0.875rem',
            color: '#4b5563'
        },
        submitButton: {
            width: '100%',
            padding: '1rem',
            background: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
        },
        link: {
            color: '#3b82f6',
            textDecoration: 'none',
            fontWeight: 500
        },
        linkContainer: {
            textAlign: 'center',
            marginTop: '1rem'
        }
    };

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.wrapper}>
                <div style={pageStyles.header}>
                    <h1 style={pageStyles.title}>Create Account</h1>
                    <p style={pageStyles.subtitle}>Join our civic complaint management system</p>
                </div>
                
                <div style={pageStyles.card}>
                    <form style={pageStyles.form} onSubmit={handleSubmit}>
                        <div style={pageStyles.grid}>
                            {/* Name */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    style={pageStyles.input}
                                />
                            </div>
                            
                            {/* Email */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    style={pageStyles.input}
                                />
                            </div>
                            
                            {/* Aadhar */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Aadhar Number</label>
                                <input
                                    type="text"
                                    name="aadharNumber"
                                    required
                                    value={formData.aadharNumber}
                                    onChange={handleChange}
                                    placeholder="Enter 12-digit Aadhar number"
                                    style={pageStyles.input}
                                    maxLength={12}
                                />
                                {errors.aadharNumber && (
                                    <div style={pageStyles.error}>{errors.aadharNumber}</div>
                                )}
                            </div>
                            
                            {/* Phone */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    style={pageStyles.input}
                                />
                            </div>
                            
                            {/* Address (full width) */}
                            <div style={{ ...pageStyles.inputGroup, gridColumn: '1 / -1' }}>
                                <label style={pageStyles.label}>Address</label>
                                <textarea
                                    name="address"
                                    required
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter your complete address"
                                    style={pageStyles.textarea}
                                />
                            </div>
                            
                            {/* Password */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    style={pageStyles.input}
                                />
                                {errors.password && (
                                    <div style={pageStyles.error}>{errors.password}</div>
                                )}
                            </div>
                            
                            {/* Confirm Password */}
                            <div style={pageStyles.inputGroup}>
                                <label style={pageStyles.label}>Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                    style={pageStyles.input}
                                />
                                {errors.confirmPassword && (
                                    <div style={pageStyles.error}>{errors.confirmPassword}</div>
                                )}
                            </div>
                        </div>
                        
                        {/* Note */}
                        <div style={pageStyles.noteBox}>
                            <p style={pageStyles.noteText}>
                                <strong>Note:</strong> Your Aadhar number is encrypted and securely stored. 
                                It is used only for identity verification.
                            </p>
                        </div>
                        
                        {errors.submit && (
                            <div style={{ ...pageStyles.error, textAlign: 'center' }}>{errors.submit}</div>
                        )}
                        
                        {/* Terms */}
                        <div style={pageStyles.checkbox}>
                            <input
                                type="checkbox"
                                id="terms"
                                required
                                style={pageStyles.checkboxInput}
                            />
                            <label htmlFor="terms" style={pageStyles.checkboxLabel}>
                                I agree to the{' '}
                                <a href="#" style={pageStyles.link}>Terms of Service</a>{' '}
                                and{' '}
                                <a href="#" style={pageStyles.link}>Privacy Policy</a>
                            </label>
                        </div>
                        
                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading}
                            style={pageStyles.submitButton}
                        >
                            {loading ? (
                                <>
                                    <div className="loading-spinner" style={{ width: '1rem', height: '1rem' }}></div>
                                    <span>Creating account...</span>
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                        
                        <div style={pageStyles.linkContainer}>
                            <p style={{ color: '#6b7280' }}>
                                Already have an account?{' '}
                                <Link to="/login" style={pageStyles.link}>
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;