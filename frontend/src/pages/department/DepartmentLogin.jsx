import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function DepartmentLogin() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        department: ''
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const departments = [
        'Public Works Department',
        'Electricity Department',
        'Water Supply Department',
        'Sanitation Department',
        'Road Transport Department',
        'Public Health Department',
        'Municipal Corporation'
    ];

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
            // Simulate department login
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Mock response
            const mockResponse = {
                data: {
                    token: 'mock-department-token',
                    user: {
                        id: 'dept123',
                        name: 'Department Staff',
                        email: formData.email,
                        role: 'department',
                        department: formData.department
                    }
                }
            };

            if (!formData.department || !formData.email || !formData.password) {
                throw new Error('Please fill all fields');
            }

            login(mockResponse.data.token, mockResponse.data.user);
            navigate('/department/dashboard');
        } catch (error) {
            setErrors({ submit: error.message || 'Department login failed' });
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
        },
        card: {
            background: 'white',
            borderRadius: '1rem',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px'
        },
        header: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        logo: {
            width: '4rem',
            height: '4rem',
            background: '#10b981',
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
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        subtitle: {
            color: '#6b7280'
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
            color: '#374151'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            transition: 'border-color 0.15s ease-in-out'
        },
        inputIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
        },
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            backgroundColor: 'white',
            cursor: 'pointer'
        },
        infoBox: {
            background: '#d1fae5',
            border: '1px solid #a7f3d0',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginTop: '0.5rem'
        },
        infoContent: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem'
        },
        infoIcon: {
            color: '#059669',
            fontSize: '1rem',
            flexShrink: 0,
            marginTop: '0.125rem'
        },
        infoText: {
            color: '#065f46',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            margin: 0
        },
        error: {
            color: '#dc2626',
            fontSize: '0.875rem',
            textAlign: 'center',
            marginTop: '0.5rem'
        },
        submitButton: {
            width: '100%',
            padding: '0.75rem',
            background: '#10b981',
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
            borderTop: '1px solid #e5e7eb'
        },
        linkText: {
            color: '#6b7280',
            fontSize: '0.875rem'
        },
        link: {
            color: '#10b981',
            textDecoration: 'none',
            fontWeight: 500
        }
    };

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.card}>
                <div style={pageStyles.header}>
                    <div style={pageStyles.logo}>
                        <i className="fas fa-building"></i>
                    </div>
                    <h1 style={pageStyles.title}>Department Portal</h1>
                    <p style={pageStyles.subtitle}>Access for department staff</p>
                </div>
                
                <form style={pageStyles.form} onSubmit={handleSubmit}>
                    <div style={pageStyles.inputGroup}>
                        <label style={pageStyles.label}>Department</label>
                        <div style={{ position: 'relative' }}>
                            <i className="fas fa-building" style={pageStyles.inputIcon}></i>
                            <select
                                name="department"
                                required
                                value={formData.department}
                                onChange={handleChange}
                                style={{ ...pageStyles.select, paddingLeft: '3rem' }}
                            >
                                <option value="">Select your department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    
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
                                placeholder="department@civicconnect.gov.in"
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
                    
                    <div style={pageStyles.infoBox}>
                        <div style={pageStyles.infoContent}>
                            <i className="fas fa-tools" style={pageStyles.infoIcon}></i>
                            <p style={pageStyles.infoText}>
                                This portal is for authorized department personnel only. 
                                Use your official department credentials to login.
                            </p>
                        </div>
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
                                <div className="loading-spinner" style={{ width: '1rem', height: '1rem' }}></div>
                                <span>Logging in...</span>
                            </>
                        ) : (
                            'Access Department Portal'
                        )}
                    </button>
                </form>
                
                <div style={pageStyles.linkContainer}>
                    <p style={pageStyles.linkText}>
                        Having trouble logging in?{' '}
                        <button style={{
                            ...pageStyles.link,
                            background: 'none',
                            border: 'none',
                            padding: 0,
                            cursor: 'pointer'
                        }}>
                            Contact Support
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default DepartmentLogin;