import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import ComplaintCard from '../../components/ComplaintCard';
import axios from 'axios';

function Dashboard() {
    const { user, token } = useAuth();
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            // Simulated API call - replace with actual API
            // const response = await axios.get('/api/complaints/my-complaints', {
            //     headers: { Authorization: `Bearer ${token}` }
            // });
            // setComplaints(response.data);
            
            // Mock data for now
            const mockComplaints = [
                {
                    _id: '1',
                    title: 'Pothole on Main Road',
                    description: 'Large pothole causing traffic issues and vehicle damage',
                    status: 'in-progress',
                    priority: 'high',
                    location: 'Main Road, Sector 5',
                    department: 'Public Works Department',
                    image: 'uploads/complaint1.jpg',
                    createdAt: new Date('2024-01-15'),
                    rating: 4
                },
                {
                    _id: '2',
                    title: 'Street Light Not Working',
                    description: 'Street light has been off for 3 days, creating safety concerns',
                    status: 'pending',
                    priority: 'medium',
                    location: 'Park Street',
                    department: 'Electricity Department',
                    image: 'uploads/complaint2.jpg',
                    createdAt: new Date('2024-01-10')
                }
            ];
            
            setComplaints(mockComplaints);
            
            // Calculate stats
            const total = mockComplaints.length;
            const pending = mockComplaints.filter(c => c.status === 'pending').length;
            const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length;
            const resolved = mockComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
            
            setStats({ total, pending, inProgress, resolved });
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f9fafb'
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem'
        },
        welcomeBanner: {
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            color: 'white',
            marginBottom: '2rem'
        },
        welcomeHeader: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1rem'
        },
        welcomeTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
        },
        welcomeText: {
            opacity: 0.9,
            margin: 0
        },
        newComplaintButton: {
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            backgroundColor: 'white',
            color: '#3b82f6',
            border: 'none',
            borderRadius: '0.5rem',
            fontWeight: 500,
            cursor: 'pointer',
            textDecoration: 'none'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
        },
        statCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        statHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        statTitle: {
            fontSize: '0.875rem',
            color: '#6b7280',
            textTransform: 'uppercase',
            fontWeight: 600
        },
        statValue: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937'
        },
        statIcon: {
            width: '3rem',
            height: '3rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        },
        mainGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
        },
        profileSection: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            marginBottom: '1.5rem'
        },
        sectionTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
        },
        profileInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        profileItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        },
        profileIcon: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1rem'
        },
        profileLabel: {
            fontSize: '0.875rem',
            color: '#6b7280'
        },
        profileValue: {
            fontSize: '1rem',
            fontWeight: 500,
            color: '#1f2937'
        },
        tutorialButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'white',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            marginTop: '1rem'
        },
        complaintsSection: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        complaintsHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
        },
        headerTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
        },
        headerNote: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280',
            fontSize: '0.875rem'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '3rem 1rem',
            gap: '1rem'
        },
        emptyState: {
            textAlign: 'center',
            padding: '3rem 1rem'
        },
        emptyIcon: {
            fontSize: '3rem',
            color: '#d1d5db',
            marginBottom: '1rem'
        },
        emptyTitle: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.5rem'
        },
        emptyText: {
            color: '#6b7280',
            marginBottom: '1.5rem'
        },
        footerButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            marginTop: '1.5rem',
            textDecoration: 'none'
        }
    };

    return (
        <div style={pageStyles.container}>
            <Navbar />
            
            <div style={pageStyles.content}>
                {/* Welcome Banner */}
                <div style={pageStyles.welcomeBanner}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={pageStyles.welcomeHeader}>
                            <h1 style={pageStyles.welcomeTitle}>Welcome back, {user?.name}!</h1>
                            <p style={pageStyles.welcomeText}>Track and manage all your civic complaints from one place</p>
                        </div>
                        <Link to="/new-complaint" style={pageStyles.newComplaintButton}>
                            <i className="fas fa-plus-circle"></i>
                            <span>New Complaint</span>
                        </Link>
                    </div>
                </div>
                
                {/* Stats Grid */}
                <div style={pageStyles.statsGrid}>
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Total Complaints</div>
                                <div style={pageStyles.statValue}>{stats.total}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: '#dbeafe' }}>
                                <i className="fas fa-chart-line" style={{ color: '#3b82f6' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Pending</div>
                                <div style={{ ...pageStyles.statValue, color: '#d97706' }}>{stats.pending}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: '#fef3c7' }}>
                                <i className="fas fa-clock" style={{ color: '#d97706' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>In Progress</div>
                                <div style={{ ...pageStyles.statValue, color: '#2563eb' }}>{stats.inProgress}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: '#dbeafe' }}>
                                <i className="fas fa-tools" style={{ color: '#2563eb' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Resolved</div>
                                <div style={{ ...pageStyles.statValue, color: '#059669' }}>{stats.resolved}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: '#d1fae5' }}>
                                <i className="fas fa-check-circle" style={{ color: '#059669' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={pageStyles.mainGrid}>
                    {/* Left Column - Profile & Stats */}
                    <div>
                        <div style={pageStyles.profileSection}>
                            <h2 style={pageStyles.sectionTitle}>Profile Details</h2>
                            <div style={pageStyles.profileInfo}>
                                <div style={pageStyles.profileItem}>
                                    <div style={{ ...pageStyles.profileIcon, backgroundColor: '#dbeafe' }}>
                                        <i className="fas fa-user" style={{ color: '#3b82f6' }}></i>
                                    </div>
                                    <div>
                                        <div style={pageStyles.profileLabel}>Name</div>
                                        <div style={pageStyles.profileValue}>{user?.name}</div>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.profileItem}>
                                    <div style={{ ...pageStyles.profileIcon, backgroundColor: '#d1fae5' }}>
                                        <i className="fas fa-envelope" style={{ color: '#059669' }}></i>
                                    </div>
                                    <div>
                                        <div style={pageStyles.profileLabel}>Email</div>
                                        <div style={pageStyles.profileValue}>{user?.email}</div>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.profileItem}>
                                    <div style={{ ...pageStyles.profileIcon, backgroundColor: '#f3e8ff' }}>
                                        <i className="fas fa-phone" style={{ color: '#8b5cf6' }}></i>
                                    </div>
                                    <div>
                                        <div style={pageStyles.profileLabel}>Phone</div>
                                        <div style={pageStyles.profileValue}>{user?.phone || 'Not provided'}</div>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.profileItem}>
                                    <div style={{ ...pageStyles.profileIcon, backgroundColor: '#fef3c7' }}>
                                        <i className="fas fa-map-marker-alt" style={{ color: '#d97706' }}></i>
                                    </div>
                                    <div>
                                        <div style={pageStyles.profileLabel}>Address</div>
                                        <div style={pageStyles.profileValue}>{user?.address || 'Not provided'}</div>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.profileItem}>
                                    <div style={{ ...pageStyles.profileIcon, backgroundColor: '#fee2e2' }}>
                                        <i className="fas fa-id-card" style={{ color: '#dc2626' }}></i>
                                    </div>
                                    <div>
                                        <div style={pageStyles.profileLabel}>Aadhar Verified</div>
                                        <div style={{ ...pageStyles.profileValue, color: '#059669' }}>✓ Verified</div>
                                    </div>
                                </div>
                            </div>
                            
                            <Link to="/tutorial" style={pageStyles.tutorialButton}>
                                View Tutorial
                            </Link>
                        </div>
                    </div>
                    
                    {/* Right Column - Complaints */}
                    <div style={pageStyles.complaintsSection}>
                        <div style={pageStyles.complaintsHeader}>
                            <h2 style={pageStyles.headerTitle}>Recent Complaints</h2>
                            <div style={pageStyles.headerNote}>
                                <i className="fas fa-bell"></i>
                                <span>Real-time updates</span>
                            </div>
                        </div>
                        
                        {loading ? (
                            <div style={pageStyles.loadingContainer}>
                                <div className="loading-spinner"></div>
                                <p style={{ color: '#6b7280' }}>Loading your complaints...</p>
                            </div>
                        ) : complaints.length > 0 ? (
                            <div>
                                {complaints.map((complaint) => (
                                    <ComplaintCard key={complaint._id} complaint={complaint} />
                                ))}
                            </div>
                        ) : (
                            <div style={pageStyles.emptyState}>
                                <div style={pageStyles.emptyIcon}>
                                    <i className="fas fa-bell"></i>
                                </div>
                                <h3 style={pageStyles.emptyTitle}>No complaints yet</h3>
                                <p style={pageStyles.emptyText}>Start by filing your first civic complaint</p>
                                <Link
                                    to="/new-complaint"
                                    style={{
                                        ...pageStyles.newComplaintButton,
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 1.5rem',
                                        backgroundColor: '#3b82f6',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '0.5rem',
                                        fontWeight: 500,
                                        cursor: 'pointer',
                                        textDecoration: 'none'
                                    }}
                                >
                                    <i className="fas fa-plus-circle"></i>
                                    <span>File New Complaint</span>
                                </Link>
                            </div>
                        )}
                        
                        {complaints.length > 0 && (
                            <Link to="/new-complaint" style={pageStyles.footerButton}>
                                <i className="fas fa-plus-circle"></i>
                                <span>File Another Complaint</span>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;