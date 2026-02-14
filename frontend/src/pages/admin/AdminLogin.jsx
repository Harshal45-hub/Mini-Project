import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function AdminLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        secretKey: ''
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        setLoading(true);

        try {
            // Simulate admin login
            // In production, use: axios.post('/api/auth/admin-login', formData)
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock response
            const mockResponse = {
                data: {
                    token: 'mock-admin-token',
                    user: {
                        id: 'admin123',
                        name: 'System Administrator',
                        email: formData.email,
                        role: 'admin'
                    }
                }
            };

            if (formData.secretKey !== 'admin123') {
                throw new Error('Invalid admin key');
            }

            login(mockResponse.data.token, mockResponse.data.user);
            navigate('/admin/dashboard');
        } catch (error) {
            setErrors({ submit: error.message || 'Admin login failed' });
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        },
        card: {
            background: '#1f2937',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
            border: '1px solid #374151'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        logo: {
            width: '4rem',
            height: '4rem',
            background: '#3b82f6',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem',
            color: 'white',
            fontSize: '1.5rem'
        },
        title: {
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#9ca3af'
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        inputGroup: {
            position: 'relative'
        },
        label: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 500,
            color: '#e5e7eb'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            background: '#374151',
            border: '1px solid #4b5563',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            color: 'white',
            transition: 'border-color 0.15s ease-in-out'
        },
        inputIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
        },
        warningBox: {
            background: 'rgba(234, 179, 8, 0.1)',
            border: '1px solid rgba(234, 179, 8, 0.3)',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '0.5rem'
        },
        warningText: {
            color: '#fbbf24',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            margin: 0
        },
        error: {
            color: '#f87171',
            fontSize: '0.875rem',
            textAlign: 'center',
            marginTop: '0.5rem'
        },
        submitButton: {
            width: '100%',
            padding: '0.75rem',
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
        linkContainer: {
            textAlign: 'center',
            marginTop: '1.5rem',
            paddingTop: '1.5rem',
            borderTop: '1px solid #374151'
        },
        link: {
            color: '#60a5fa',
            textDecoration: 'none',
            fontSize: '0.875rem'
        }
    };

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.card}>
                <div style={pageStyles.header}>
                    <div style={pageStyles.logo}>
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h1 style={pageStyles.title}>Admin Portal</h1>
                    <p style={pageStyles.subtitle}>Restricted access for administrators only</p>
                </div>
                
                <form style={pageStyles.form} onSubmit={handleSubmit}>
                    <div style={pageStyles.inputGroup}>
                        <label style={pageStyles.label}>Email Address</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fas fa-envelope" style={pageStyles.inputIcon}></i>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="admin@civicconnect.gov.in"
                                style={{ ...pageStyles.input, paddingLeft: '3rem' }}
                            />
                        </div>
                    </div>
                    
                    <div style={pageStyles.inputGroup}>
                        <label style={pageStyles.label}>Password</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fas fa-lock" style={pageStyles.inputIcon}></i>
                            <input
                                type="password"
                                name="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                style={{ ...pageStyles.input, paddingLeft: '3rem' }}
                            />
                        </div>
                    </div>
                    
                    <div style={pageStyles.inputGroup}>
                        <label style={pageStyles.label}>Secret Key</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fas fa-key" style={pageStyles.inputIcon}></i>
                            <input
                                type="password"
                                name="secretKey"
                                required
                                value={formData.secretKey}
                                onChange={handleChange}
                                placeholder="Enter secret key"
                                style={{ ...pageStyles.input, paddingLeft: '3rem' }}
                            />
                        </div>
                    </div>
                    
                    <div style={pageStyles.warningBox}>
                        <p style={pageStyles.warningText}>
                            <strong>Warning:</strong> This portal is for authorized personnel only. 
                            Unauthorized access is prohibited.
                        </p>
                    </div>
                    
                    {errors.submit && (
                        <div style={pageStyles.error}>{errors.submit}</div>
                    )}
                    
                    <button
                        type="submit"
                        disabled={loading}
                        style={pageStyles.submitButton}
                    >
                        {loading ? (
                            <>
                                <div className="loading-spinner" style={{ width: '1rem', height: '1rem', borderColor: 'rgba(255,255,255,0.3)' }}></div>
                                <span>Authenticating...</span>
                            </>
                        ) : (
                            'Access Admin Panel'
                        )}
                    </button>
                </form>
                
                <div style={pageStyles.linkContainer}>
                    <p style={{ color: '#9ca3af', fontSize: '0.875rem' }}>
                        Are you a user?{' '}
                        <Link to="/login" style={pageStyles.link}>
                            User Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default AdminLogin;