import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navStyles = {
        navbar: {
            backgroundColor: 'white',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            padding: '1rem 0',
            position: 'sticky',
            top: 0,
            zIndex: 100
        },
        navbarContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        logo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            textDecoration: 'none',
            color: '#1f2937'
        },
        logoIcon: {
            fontSize: '1.5rem',
            color: '#3b82f6'
        },
        logoText: {
            fontSize: '1.25rem',
            fontWeight: 'bold'
        },
        navLinks: {
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'center'
        },
        navLink: {
            color: '#4b5563',
            textDecoration: 'none',
            fontWeight: 500,
            transition: 'color 0.2s'
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        userAvatar: {
            width: '2rem',
            height: '2rem',
            borderRadius: '50%',
            backgroundColor: '#dbeafe',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#3b82f6'
        },
        notificationBadge: {
            position: 'absolute',
            top: '-4px',
            right: '-4px',
            backgroundColor: '#ef4444',
            color: 'white',
            fontSize: '0.75rem',
            borderRadius: '50%',
            width: '1rem',
            height: '1rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }
    };

    return (
        <nav style={navStyles.navbar}>
            <div style={navStyles.navbarContent}>
                <Link to="/dashboard" style={navStyles.logo}>
                    <i className="fas fa-comments" style={navStyles.logoIcon}></i>
                    <span style={navStyles.logoText}>CivicConnect</span>
                </Link>
                
                {user && (
                    <div style={navStyles.navLinks}>
                        <Link to="/dashboard" style={navStyles.navLink}>
                            <i className="fas fa-home"></i>
                        </Link>
                        <Link to="/new-complaint" style={navStyles.navLink}>
                            <i className="fas fa-plus-circle"></i>
                        </Link>
                        <div style={{ position: 'relative' }}>
                            <button style={{ ...navStyles.navLink, border: 'none', background: 'none', cursor: 'pointer' }}>
                                <i className="fas fa-bell"></i>
                                <span style={navStyles.notificationBadge}>3</span>
                            </button>
                        </div>
                        <div style={navStyles.userInfo}>
                            <div style={navStyles.userAvatar}>
                                <i className="fas fa-user"></i>
                            </div>
                            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>{user.name}</span>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.25rem',
                                color: '#4b5563',
                                border: 'none',
                                background: 'none',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;