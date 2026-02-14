import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function DepartmentDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState({
        assigned: 0,
        inProgress: 0,
        resolved: 0,
        pending: 0
    });
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [resolutionImage, setResolutionImage] = useState(null);
    const [resolutionNotes, setResolutionNotes] = useState('');

    useEffect(() => {
        fetchDepartmentComplaints();
    }, []);

    const fetchDepartmentComplaints = async () => {
        try {
            // Mock data for department complaints
            const mockComplaints = [
                {
                    _id: '1',
                    title: 'Pothole on Main Road',
                    description: 'Large pothole causing traffic issues and vehicle damage',
                    status: 'in-progress',
                    priority: 'high',
                    location: 'Main Road, Sector 5',
                    department: user?.department || 'Public Works Department',
                    image: 'uploads/complaint1.jpg',
                    createdAt: new Date('2024-01-15'),
                    adminNotes: 'Work order issued. Please address within 24 hours.'
                },
                {
                    _id: '2',
                    title: 'Damaged Footpath',
                    description: 'Footpath tiles broken and uneven, causing pedestrian safety issues',
                    status: 'pending',
                    priority: 'medium',
                    location: 'Commercial Street',
                    department: user?.department || 'Public Works Department',
                    image: 'uploads/complaint2.jpg',
                    createdAt: new Date('2024-01-12'),
                    adminNotes: 'Priority repair needed'
                }
            ];
            
            setComplaints(mockComplaints);
            
            const assigned = mockComplaints.length;
            const pending = mockComplaints.filter(c => c.status === 'pending').length;
            const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length;
            const resolved = mockComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
            
            setStats({ assigned, pending, inProgress, resolved });
        } catch (error) {
            console.error('Error fetching department complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateComplaintStatus = async (complaintId, status) => {
        try {
            // Simulate API call
            console.log('Updating status:', complaintId, status);
            
            // Update local state
            setComplaints(complaints.map(comp => 
                comp._id === complaintId ? { ...comp, status } : comp
            ));
            
            // Update selected complaint if it's the one being updated
            if (selectedComplaint && selectedComplaint._id === complaintId) {
                setSelectedComplaint({ ...selectedComplaint, status });
            }
            
            // Refresh stats
            fetchDepartmentComplaints();
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const submitResolution = async () => {
        if (!selectedComplaint || !resolutionImage) {
            alert('Please select a complaint and upload resolution image');
            return;
        }

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update complaint status
            updateComplaintStatus(selectedComplaint._id, 'resolved');
            
            // Reset form
            setResolutionImage(null);
            setResolutionNotes('');
            
            alert('Resolution submitted successfully!');
        } catch (error) {
            console.error('Error submitting resolution:', error);
            alert('Failed to submit resolution');
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return { backgroundColor: '#fef3c7', color: '#92400e' };
            case 'in-progress': return { backgroundColor: '#dbeafe', color: '#1e40af' };
            case 'resolved': return { backgroundColor: '#d1fae5', color: '#065f46' };
            case 'closed': return { backgroundColor: '#f3f4f6', color: '#374151' };
            default: return { backgroundColor: '#fef2f2', color: '#991b1b' };
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical': return '#dc2626';
            case 'high': return '#ea580c';
            case 'medium': return '#d97706';
            case 'low': return '#16a34a';
            default: return '#6b7280';
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)'
        },
        navbar: {
            backgroundColor: 'white',
            borderBottom: '1px solid #d1fae5',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            padding: '1rem 0'
        },
        navbarContent: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '0 1rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        navbarBrand: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        navbarIcon: {
            fontSize: '1.5rem',
            color: '#10b981'
        },
        navbarTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
        },
        navbarSubtitle: {
            fontSize: '0.875rem',
            color: '#6b7280',
            margin: 0
        },
        userInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        userName: {
            textAlign: 'right'
        },
        userNameText: {
            color: '#1f2937',
            fontSize: '0.875rem',
            margin: 0
        },
        userRole: {
            color: '#6b7280',
            fontSize: '0.75rem',
            margin: 0
        },
        logoutButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1rem',
            backgroundColor: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        content: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem 1rem'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
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
        complaintsSection: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb',
            overflow: 'hidden'
        },
        complaintsHeader: {
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb'
        },
        headerTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
        },
        filters: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        filterSelect: {
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            backgroundColor: 'white',
            color: '#374151',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        complaintsList: {
            padding: '0'
        },
        complaintItem: {
            padding: '1.5rem',
            borderBottom: '1px solid #e5e7eb',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        },
        complaintHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '0.75rem'
        },
        complaintTitle: {
            fontSize: '1rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '0.25rem'
        },
        complaintDescription: {
            color: '#6b7280',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            marginBottom: '1rem'
        },
        complaintMeta: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.75rem',
            color: '#6b7280'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        arrowIcon: {
            color: '#9ca3af',
            fontSize: '0.875rem'
        },
        emptyState: {
            padding: '3rem 1rem',
            textAlign: 'center'
        },
        emptyIcon: {
            fontSize: '3rem',
            color: '#d1d5db',
            marginBottom: '1rem'
        },
        emptyTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#374151',
            marginBottom: '0.5rem'
        },
        emptyText: {
            color: '#6b7280'
        },
        actionsPanel: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        actionsTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1.5rem'
        },
        actionsContent: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        complaintImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '0.5rem'
        },
        complaintDetails: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        },
        detailTitle: {
            fontWeight: 600,
            color: '#1f2937'
        },
        detailText: {
            color: '#4b5563',
            lineHeight: 1.6
        },
        formGroup: {
            marginBottom: '1rem'
        },
        formLabel: {
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: 500,
            color: '#374151',
            fontSize: '0.875rem'
        },
        formSelect: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            backgroundColor: 'white',
            cursor: 'pointer'
        },
        uploadArea: {
            border: '2px dashed #d1d5db',
            borderRadius: '0.5rem',
            padding: '2rem',
            textAlign: 'center',
            cursor: 'pointer',
            transition: 'border-color 0.2s'
        },
        uploadIcon: {
            fontSize: '2rem',
            color: '#9ca3af',
            marginBottom: '0.5rem'
        },
        uploadText: {
            color: '#6b7280',
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
        },
        uploadButton: {
            padding: '0.5rem 1rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.75rem',
            cursor: 'pointer'
        },
        previewImage: {
            width: '100%',
            height: '150px',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            marginBottom: '0.5rem'
        },
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            resize: 'vertical',
            minHeight: '100px'
        },
        metaInfo: {
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb'
        },
        metaItemSmall: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.75rem'
        },
        metaLabel: {
            color: '#6b7280'
        },
        metaValue: {
            color: '#374151'
        },
        actionButtons: {
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem'
        },
        resolveButton: {
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#10b981',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
        },
        detailsButton: {
            padding: '0.75rem 1rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        loadingContainer: {
            padding: '3rem 1rem',
            textAlign: 'center'
        }
    };

    return (
        <div style={pageStyles.container}>
            {/* Navigation */}
            <nav style={pageStyles.navbar}>
                <div style={pageStyles.navbarContent}>
                    <div style={pageStyles.navbarBrand}>
                        <i className="fas fa-building" style={pageStyles.navbarIcon}></i>
                        <div>
                            <h1 style={pageStyles.navbarTitle}>Department Dashboard</h1>
                            <p style={pageStyles.navbarSubtitle}>{user?.department}</p>
                        </div>
                    </div>
                    
                    <div style={pageStyles.userInfo}>
                        <div style={pageStyles.userName}>
                            <p style={pageStyles.userNameText}>Welcome, {user?.name}</p>
                            <p style={pageStyles.userRole}>Department Staff</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            style={pageStyles.logoutButton}
                        >
                            <i className="fas fa-sign-out-alt"></i>
                            <span>Logout</span>
                        </button>
                    </div>
                </div>
            </nav>
            
            <div style={pageStyles.content}>
                {/* Stats Overview */}
                <div style={pageStyles.statsGrid}>
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Assigned Complaints</div>
                                <div style={pageStyles.statValue}>{stats.assigned}</div>
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
                    {/* Complaints List */}
                    <div style={pageStyles.complaintsSection}>
                        <div style={pageStyles.complaintsHeader}>
                            <h2 style={pageStyles.headerTitle}>Assigned Complaints</h2>
                            <div style={pageStyles.filters}>
                                <select style={pageStyles.filterSelect}>
                                    <option>All Status</option>
                                    <option>Pending</option>
                                    <option>In Progress</option>
                                    <option>Resolved</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style={pageStyles.complaintsList}>
                            {loading ? (
                                <div style={pageStyles.loadingContainer}>
                                    <div className="loading-spinner"></div>
                                    <p style={{ color: '#6b7280', marginTop: '1rem' }}>Loading complaints...</p>
                                </div>
                            ) : complaints.length > 0 ? (
                                complaints.map(complaint => {
                                    const statusStyle = getStatusColor(complaint.status);
                                    const priorityColor = getPriorityColor(complaint.priority);
                                    
                                    return (
                                        <div 
                                            key={complaint._id}
                                            style={{
                                                ...pageStyles.complaintItem,
                                                backgroundColor: selectedComplaint?._id === complaint._id ? '#f0fdf4' : 'white'
                                            }}
                                            onClick={() => setSelectedComplaint(complaint)}
                                        >
                                            <div style={pageStyles.complaintHeader}>
                                                <div style={{ flex: 1 }}>
                                                    <h3 style={pageStyles.complaintTitle}>{complaint.title}</h3>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                                        <span style={{
                                                            padding: '0.25rem 0.5rem',
                                                            borderRadius: '9999px',
                                                            fontSize: '0.75rem',
                                                            fontWeight: 500,
                                                            ...statusStyle
                                                        }}>
                                                            {complaint.status.replace('-', ' ')}
                                                        </span>
                                                        <div style={{
                                                            width: '0.5rem',
                                                            height: '0.5rem',
                                                            borderRadius: '50%',
                                                            backgroundColor: priorityColor
                                                        }}></div>
                                                    </div>
                                                    <p style={pageStyles.complaintDescription}>{complaint.description}</p>
                                                </div>
                                                <i className="fas fa-chevron-right" style={pageStyles.arrowIcon}></i>
                                            </div>
                                            
                                            <div style={pageStyles.complaintMeta}>
                                                <div style={pageStyles.metaItem}>
                                                    <i className="fas fa-map-marker-alt"></i>
                                                    <span>{complaint.location}</span>
                                                </div>
                                                <div style={pageStyles.metaItem}>
                                                    <i className="fas fa-calendar"></i>
                                                    <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                                                </div>
                                                <div style={pageStyles.metaItem}>
                                                    <i className="fas fa-user-tie"></i>
                                                    <span>Priority: {complaint.priority}</span>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div style={pageStyles.emptyState}>
                                    <div style={pageStyles.emptyIcon}>
                                        <i className="fas fa-tools"></i>
                                    </div>
                                    <h3 style={pageStyles.emptyTitle}>No complaints assigned</h3>
                                    <p style={pageStyles.emptyText}>You don't have any complaints assigned to your department yet.</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Complaint Actions Panel */}
                    <div style={pageStyles.actionsPanel}>
                        <h2 style={pageStyles.actionsTitle}>Complaint Actions</h2>
                        
                        {selectedComplaint ? (
                            <div style={pageStyles.actionsContent}>
                                <div>
                                    <h3 style={pageStyles.detailTitle}>{selectedComplaint.title}</h3>
                                    <p style={pageStyles.detailText}>{selectedComplaint.description}</p>
                                    
                                    {selectedComplaint.image && (
                                        <img 
                                            src={`http://localhost:5000/${selectedComplaint.image}`} 
                                            alt="Issue" 
                                            style={pageStyles.complaintImage}
                                        />
                                    )}
                                </div>
                                
                                <div>
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Update Status</label>
                                        <select 
                                            value={selectedComplaint.status}
                                            onChange={(e) => updateComplaintStatus(selectedComplaint._id, e.target.value)}
                                            style={pageStyles.formSelect}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                        </select>
                                    </div>
                                    
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Upload Resolution Image</label>
                                        {resolutionImage ? (
                                            <div>
                                                <img 
                                                    src={URL.createObjectURL(resolutionImage)} 
                                                    alt="Resolution" 
                                                    style={pageStyles.previewImage}
                                                />
                                                <button 
                                                    onClick={() => setResolutionImage(null)}
                                                    style={{
                                                        ...pageStyles.uploadButton,
                                                        backgroundColor: '#fee2e2',
                                                        color: '#dc2626'
                                                    }}
                                                >
                                                    Remove Image
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                style={pageStyles.uploadArea}
                                                onClick={() => document.getElementById('resolution-upload').click()}
                                            >
                                                <i className="fas fa-upload" style={pageStyles.uploadIcon}></i>
                                                <p style={pageStyles.uploadText}>Click to upload or drag and drop</p>
                                                <button style={pageStyles.uploadButton}>
                                                    Choose File
                                                </button>
                                                <input 
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={(e) => setResolutionImage(e.target.files[0])}
                                                    style={{ display: 'none' }}
                                                    id="resolution-upload"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Resolution Notes</label>
                                        <textarea
                                            value={resolutionNotes}
                                            onChange={(e) => setResolutionNotes(e.target.value)}
                                            placeholder="Describe the work done..."
                                            style={pageStyles.textarea}
                                        />
                                    </div>
                                </div>
                                
                                <div style={pageStyles.metaInfo}>
                                    <div style={pageStyles.metaItemSmall}>
                                        <span style={pageStyles.metaLabel}>Submitted:</span>
                                        <span style={pageStyles.metaValue}>{new Date(selectedComplaint.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <div style={pageStyles.metaItemSmall}>
                                        <span style={pageStyles.metaLabel}>Location:</span>
                                        <span style={pageStyles.metaValue}>{selectedComplaint.location}</span>
                                    </div>
                                    <div style={pageStyles.metaItemSmall}>
                                        <span style={pageStyles.metaLabel}>Priority:</span>
                                        <span style={{ ...pageStyles.metaValue, textTransform: 'capitalize' }}>
                                            {selectedComplaint.priority}
                                        </span>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.actionButtons}>
                                    <button
                                        onClick={submitResolution}
                                        disabled={!resolutionImage}
                                        style={{
                                            ...pageStyles.resolveButton,
                                            opacity: !resolutionImage ? 0.5 : 1,
                                            cursor: !resolutionImage ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        Mark as Resolved
                                    </button>
                                    <button style={pageStyles.detailsButton}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={pageStyles.emptyState}>
                                <div style={pageStyles.emptyIcon}>
                                    <i className="fas fa-exclamation-circle"></i>
                                </div>
                                <p style={{ color: '#6b7280' }}>Select a complaint to take action</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DepartmentDashboard;