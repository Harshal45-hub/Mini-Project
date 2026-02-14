import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user'
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
            let response;
            if (formData.role === 'admin') {
                response = await axios.post('/api/auth/admin-login', {
                    email: formData.email,
                    password: formData.password,
                    secretKey: 'admin123'
                });
            } else {
                response = await axios.post('/api/auth/login', formData);
            }

            login(response.data.token, response.data.user);
            
            const redirectPath = formData.role === 'admin' ? '/admin/dashboard' : 
                               formData.role === 'department' ? '/department/dashboard' : 
                               '/dashboard';
            
            navigate(redirectPath);
        } catch (error) {
            setErrors({ submit: error.response?.data?.message || 'Login failed' });
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
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
        roleButtons: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '0.5rem'
        },
        roleButton: (active) => ({
            padding: '0.75rem',
            border: `1px solid ${active ? '#3b82f6' : '#d1d5db'}`,
            borderRadius: '0.5rem',
            background: active ? '#eff6ff' : 'white',
            color: active ? '#3b82f6' : '#4b5563',
            cursor: 'pointer',
            textAlign: 'center'
        }),
        inputGroup: {
            position: 'relative'
        },
        inputIcon: {
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#9ca3af'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem 0.75rem 3rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            transition: 'border-color 0.15s ease-in-out'
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
        }
    };

    return (
        <div style={pageStyles.container}>
            <div style={pageStyles.card}>
                <div style={pageStyles.header}>
                    <div style={pageStyles.logo}>
                        <i className="fas fa-comments"></i>
                    </div>
                    <h1 style={pageStyles.title}>Welcome Back</h1>
                    <p style={pageStyles.subtitle}>Sign in to your account</p>
                </div>
                
                <form style={pageStyles.form} onSubmit={handleSubmit}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
                            Login As
                        </label>
                        <div style={pageStyles.roleButtons}>
                            {['user', 'admin', 'department'].map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, role })}
                                    style={pageStyles.roleButton(formData.role === role)}
                                >
                                    {role.charAt(0).toUpperCase() + role.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                    
                    <div style={pageStyles.inputGroup}>
                        <i className="fas fa-envelope" style={pageStyles.inputIcon}></i>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email address"
                            style={pageStyles.input}
                        />
                    </div>
                    
                    <div style={pageStyles.inputGroup}>
                        <i className="fas fa-lock" style={pageStyles.inputIcon}></i>
                        <input
                            type="password"
                            name="password"
                            required
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Password"
                            style={pageStyles.input}
                        />
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
                                <span>Signing in...</span>
                            </>
                        ) : (
                            <>
                                <i className="fas fa-sign-in-alt"></i>
                                <span>Sign In</span>
                            </>
                        )}
                    </button>
                    
                    {formData.role === 'user' && (
                        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                            <p style={{ color: '#6b7280' }}>
                                Don't have an account?{' '}
                                <Link to="/signup" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default Login;