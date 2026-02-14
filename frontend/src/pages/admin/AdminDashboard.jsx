import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function AdminDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [complaints, setComplaints] = useState([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        inProgress: 0,
        resolved: 0,
        departments: 0
    });
    const [loading, setLoading] = useState(true);
    const [selectedComplaint, setSelectedComplaint] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        fetchComplaints();
    }, []);

    const fetchComplaints = async () => {
        try {
            // Mock data
            const mockComplaints = [
                {
                    _id: '1',
                    title: 'Pothole on Main Road',
                    description: 'Large pothole causing traffic issues',
                    status: 'pending',
                    priority: 'high',
                    location: 'Main Road, Sector 5',
                    department: 'Public Works Department',
                    image: 'uploads/complaint1.jpg',
                    createdAt: new Date('2024-01-15'),
                    adminNotes: ''
                },
                {
                    _id: '2',
                    title: 'Street Light Not Working',
                    description: 'Street light has been off for 3 days',
                    status: 'in-progress',
                    priority: 'medium',
                    location: 'Park Street',
                    department: 'Electricity Department',
                    image: 'uploads/complaint2.jpg',
                    createdAt: new Date('2024-01-10'),
                    adminNotes: 'Assigned to maintenance team'
                },
                {
                    _id: '3',
                    title: 'Garbage Not Collected',
                    description: 'Garbage not collected for 5 days',
                    status: 'resolved',
                    priority: 'low',
                    location: 'Residential Area A',
                    department: 'Sanitation Department',
                    image: 'uploads/complaint3.jpg',
                    createdAt: new Date('2024-01-05'),
                    adminNotes: 'Resolved on Jan 8'
                }
            ];
            
            setComplaints(mockComplaints);
            
            const total = mockComplaints.length;
            const pending = mockComplaints.filter(c => c.status === 'pending').length;
            const inProgress = mockComplaints.filter(c => c.status === 'in-progress').length;
            const resolved = mockComplaints.filter(c => c.status === 'resolved' || c.status === 'closed').length;
            
            setStats({ 
                total, 
                pending, 
                inProgress, 
                resolved,
                departments: new Set(mockComplaints.map(c => c.department)).size
            });
        } catch (error) {
            console.error('Error fetching complaints:', error);
        } finally {
            setLoading(false);
        }
    };

    const updatePriority = async (complaintId, priority) => {
        try {
            // Simulate API call
            console.log('Updating priority:', complaintId, priority);
            fetchComplaints(); // Refresh
        } catch (error) {
            console.error('Error updating priority:', error);
        }
    };

    const assignDepartment = async (complaintId, department) => {
        try {
            // Simulate API call
            console.log('Assigning department:', complaintId, department);
            fetchComplaints(); // Refresh
        } catch (error) {
            console.error('Error assigning department:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const filteredComplaints = complaints.filter(complaint => {
        const matchesSearch = 
            complaint.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            complaint.location.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesFilter = 
            filter === 'all' || 
            complaint.status === filter ||
            complaint.priority === filter;
        
        return matchesSearch && matchesFilter;
    });

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
            backgroundColor: '#111827'
        },
        navbar: {
            backgroundColor: '#1f2937',
            borderBottom: '1px solid #374151',
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
            color: '#60a5fa'
        },
        navbarTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'white',
            margin: 0
        },
        navbarSubtitle: {
            fontSize: '0.875rem',
            color: '#9ca3af',
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
            color: 'white',
            fontSize: '0.875rem',
            margin: 0
        },
        userRole: {
            color: '#9ca3af',
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
            backgroundColor: '#1f2937',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #374151'
        },
        statHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1rem'
        },
        statTitle: {
            fontSize: '0.875rem',
            color: '#9ca3af',
            textTransform: 'uppercase',
            fontWeight: 600
        },
        statValue: {
            fontSize: '2rem',
            fontWeight: 'bold',
            color: 'white'
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
            backgroundColor: '#1f2937',
            borderRadius: '0.75rem',
            border: '1px solid #374151',
            overflow: 'hidden'
        },
        complaintsHeader: {
            padding: '1.5rem',
            borderBottom: '1px solid #374151'
        },
        headerTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1rem'
        },
        filters: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        searchInput: {
            padding: '0.75rem 1rem',
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.875rem'
        },
        filterSelect: {
            padding: '0.75rem 1rem',
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        tableContainer: {
            overflowX: 'auto'
        },
        table: {
            width: '100%',
            borderCollapse: 'collapse'
        },
        tableHeader: {
            backgroundColor: '#111827',
            borderBottom: '1px solid #374151'
        },
        tableHeaderCell: {
            padding: '1rem',
            textAlign: 'left',
            color: '#9ca3af',
            fontSize: '0.75rem',
            fontWeight: 600,
            textTransform: 'uppercase'
        },
        tableRow: {
            borderBottom: '1px solid #374151',
            cursor: 'pointer',
            transition: 'background-color 0.2s'
        },
        tableCell: {
            padding: '1rem',
            color: '#d1d5db',
            fontSize: '0.875rem'
        },
        complaintCell: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
        },
        complaintImage: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '0.375rem',
            objectFit: 'cover'
        },
        complaintInfo: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem'
        },
        complaintTitle: {
            fontWeight: 500,
            color: 'white'
        },
        complaintLocation: {
            color: '#9ca3af',
            fontSize: '0.75rem'
        },
        statusBadge: {
            padding: '0.25rem 0.5rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'inline-block'
        },
        priorityDot: {
            width: '0.5rem',
            height: '0.5rem',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '0.25rem'
        },
        actionsCell: {
            textAlign: 'center'
        },
        viewButton: {
            background: 'none',
            border: 'none',
            color: '#60a5fa',
            cursor: 'pointer',
            fontSize: '1rem'
        },
        detailsPanel: {
            backgroundColor: '#1f2937',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            border: '1px solid #374151'
        },
        detailsTitle: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '1.5rem'
        },
        detailsContent: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        detailsImage: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '0.5rem'
        },
        detailsText: {
            color: '#d1d5db',
            lineHeight: 1.6
        },
        formGroup: {
            marginBottom: '1rem'
        },
        formLabel: {
            display: 'block',
            marginBottom: '0.5rem',
            color: '#9ca3af',
            fontSize: '0.875rem'
        },
        formSelect: {
            width: '100%',
            padding: '0.75rem 1rem',
            backgroundColor: '#374151',
            border: '1px solid #4b5563',
            borderRadius: '0.5rem',
            color: 'white',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        metaInfo: {
            paddingTop: '1rem',
            borderTop: '1px solid #374151'
        },
        metaItem: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
            fontSize: '0.875rem'
        },
        metaLabel: {
            color: '#9ca3af'
        },
        metaValue: {
            color: '#d1d5db'
        },
        actionButtons: {
            display: 'flex',
            gap: '0.75rem',
            marginTop: '1.5rem'
        },
        saveButton: {
            flex: 1,
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
        },
        viewDetailsButton: {
            padding: '0.75rem 1rem',
            backgroundColor: '#374151',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            cursor: 'pointer'
        },
        emptyState: {
            padding: '3rem 1rem',
            textAlign: 'center'
        },
        emptyIcon: {
            fontSize: '3rem',
            color: '#4b5563',
            marginBottom: '1rem'
        },
        emptyTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#9ca3af',
            marginBottom: '0.5rem'
        },
        emptyText: {
            color: '#6b7280'
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
                        <i className="fas fa-shield-alt" style={pageStyles.navbarIcon}></i>
                        <div>
                            <h1 style={pageStyles.navbarTitle}>Admin Dashboard</h1>
                            <p style={pageStyles.navbarSubtitle}>Civic Complaint Management System</p>
                        </div>
                    </div>
                    
                    <div style={pageStyles.userInfo}>
                        <div style={pageStyles.userName}>
                            <p style={pageStyles.userNameText}>{user?.name}</p>
                            <p style={pageStyles.userRole}>System Administrator</p>
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
                                <div style={pageStyles.statTitle}>Total Complaints</div>
                                <div style={pageStyles.statValue}>{stats.total}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}>
                                <i className="fas fa-chart-bar" style={{ color: '#3b82f6' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Pending</div>
                                <div style={{ ...pageStyles.statValue, color: '#fbbf24' }}>{stats.pending}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: 'rgba(251, 191, 36, 0.1)' }}>
                                <i className="fas fa-clock" style={{ color: '#fbbf24' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>In Progress</div>
                                <div style={{ ...pageStyles.statValue, color: '#60a5fa' }}>{stats.inProgress}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: 'rgba(96, 165, 250, 0.1)' }}>
                                <i className="fas fa-tools" style={{ color: '#60a5fa' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Resolved</div>
                                <div style={{ ...pageStyles.statValue, color: '#10b981' }}>{stats.resolved}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: 'rgba(16, 185, 129, 0.1)' }}>
                                <i className="fas fa-check-circle" style={{ color: '#10b981' }}></i>
                            </div>
                        </div>
                    </div>
                    
                    <div style={pageStyles.statCard}>
                        <div style={pageStyles.statHeader}>
                            <div>
                                <div style={pageStyles.statTitle}>Departments</div>
                                <div style={{ ...pageStyles.statValue, color: '#8b5cf6' }}>{stats.departments}</div>
                            </div>
                            <div style={{ ...pageStyles.statIcon, backgroundColor: 'rgba(139, 92, 246, 0.1)' }}>
                                <i className="fas fa-building" style={{ color: '#8b5cf6' }}></i>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div style={pageStyles.mainGrid}>
                    {/* Complaint List */}
                    <div style={pageStyles.complaintsSection}>
                        <div style={pageStyles.complaintsHeader}>
                            <h2 style={pageStyles.headerTitle}>All Complaints</h2>
                            <div style={pageStyles.filters}>
                                <input
                                    type="text"
                                    placeholder="Search complaints..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={pageStyles.searchInput}
                                />
                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    style={pageStyles.filterSelect}
                                >
                                    <option value="all">All Status</option>
                                    <option value="pending">Pending</option>
                                    <option value="in-progress">In Progress</option>
                                    <option value="resolved">Resolved</option>
                                    <option value="closed">Closed</option>
                                    <option value="critical">Critical Priority</option>
                                    <option value="high">High Priority</option>
                                </select>
                            </div>
                        </div>
                        
                        <div style={pageStyles.tableContainer}>
                            {loading ? (
                                <div style={pageStyles.loadingContainer}>
                                    <div className="loading-spinner" style={{ borderColor: 'rgba(59, 130, 246, 0.3)' }}></div>
                                    <p style={{ color: '#9ca3af', marginTop: '1rem' }}>Loading complaints...</p>
                                </div>
                            ) : filteredComplaints.length > 0 ? (
                                <table style={pageStyles.table}>
                                    <thead style={pageStyles.tableHeader}>
                                        <tr>
                                            <th style={pageStyles.tableHeaderCell}>Complaint</th>
                                            <th style={pageStyles.tableHeaderCell}>Department</th>
                                            <th style={pageStyles.tableHeaderCell}>Status</th>
                                            <th style={pageStyles.tableHeaderCell}>Priority</th>
                                            <th style={pageStyles.tableHeaderCell}>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredComplaints.map(complaint => {
                                            const statusStyle = getStatusColor(complaint.status);
                                            const priorityColor = getPriorityColor(complaint.priority);
                                            
                                            return (
                                                <tr 
                                                    key={complaint._id} 
                                                    style={{
                                                        ...pageStyles.tableRow,
                                                        backgroundColor: selectedComplaint?._id === complaint._id ? '#374151' : 'transparent'
                                                    }}
                                                    onClick={() => setSelectedComplaint(complaint)}
                                                >
                                                    <td style={pageStyles.tableCell}>
                                                        <div style={pageStyles.complaintCell}>
                                                            <img 
                                                                src={`http://localhost:5000/${complaint.image}`}
                                                                alt=""
                                                                style={pageStyles.complaintImage}
                                                            />
                                                            <div style={pageStyles.complaintInfo}>
                                                                <div style={pageStyles.complaintTitle}>
                                                                    {complaint.title}
                                                                </div>
                                                                <div style={pageStyles.complaintLocation}>
                                                                    {complaint.location}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td style={pageStyles.tableCell}>
                                                        <div style={{ color: '#d1d5db' }}>{complaint.department}</div>
                                                    </td>
                                                    <td style={pageStyles.tableCell}>
                                                        <span style={{ ...pageStyles.statusBadge, ...statusStyle }}>
                                                            {complaint.status.replace('-', ' ')}
                                                        </span>
                                                    </td>
                                                    <td style={pageStyles.tableCell}>
                                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                                            <div style={{ ...pageStyles.priorityDot, backgroundColor: priorityColor }}></div>
                                                            <span style={{ color: '#d1d5db', textTransform: 'capitalize' }}>
                                                                {complaint.priority}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td style={{ ...pageStyles.tableCell, ...pageStyles.actionsCell }}>
                                                        <button style={pageStyles.viewButton}>
                                                            <i className="fas fa-eye"></i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            ) : (
                                <div style={pageStyles.emptyState}>
                                    <div style={pageStyles.emptyIcon}>
                                        <i className="fas fa-exclamation-circle"></i>
                                    </div>
                                    <h3 style={pageStyles.emptyTitle}>No complaints found</h3>
                                    <p style={pageStyles.emptyText}>Try adjusting your search or filter</p>
                                </div>
                            )}
                        </div>
                    </div>
                    
                    {/* Complaint Details Panel */}
                    <div style={pageStyles.detailsPanel}>
                        <h2 style={pageStyles.detailsTitle}>Complaint Details</h2>
                        
                        {selectedComplaint ? (
                            <div style={pageStyles.detailsContent}>
                                {selectedComplaint.image && (
                                    <img 
                                        src={`http://localhost:5000/${selectedComplaint.image}`} 
                                        alt="Complaint" 
                                        style={pageStyles.detailsImage}
                                    />
                                )}
                                
                                <div>
                                    <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>{selectedComplaint.title}</h3>
                                    <p style={pageStyles.detailsText}>{selectedComplaint.description}</p>
                                </div>
                                
                                <div>
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Priority</label>
                                        <select 
                                            value={selectedComplaint.priority}
                                            onChange={(e) => updatePriority(selectedComplaint._id, e.target.value)}
                                            style={pageStyles.formSelect}
                                        >
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                            <option value="critical">Critical</option>
                                        </select>
                                    </div>
                                    
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Assign Department</label>
                                        <select 
                                            value={selectedComplaint.department}
                                            onChange={(e) => assignDepartment(selectedComplaint._id, e.target.value)}
                                            style={pageStyles.formSelect}
                                        >
                                            <option>Public Works Department</option>
                                            <option>Electricity Department</option>
                                            <option>Water Supply Department</option>
                                            <option>Sanitation Department</option>
                                            <option>Road Transport Department</option>
                                            <option>Public Health Department</option>
                                            <option>Municipal Corporation</option>
                                        </select>
                                    </div>
                                    
                                    <div style={pageStyles.formGroup}>
                                        <label style={pageStyles.formLabel}>Status</label>
                                        <select 
                                            value={selectedComplaint.status}
                                            style={pageStyles.formSelect}
                                        >
                                            <option value="pending">Pending</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="resolved">Resolved</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.metaInfo}>
                                    <div style={pageStyles.metaItem}>
                                        <span style={pageStyles.metaLabel}>Submitted:</span>
                                        <span style={pageStyles.metaValue}>
                                            {new Date(selectedComplaint.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <div style={pageStyles.metaItem}>
                                        <span style={pageStyles.metaLabel}>Location:</span>
                                        <span style={pageStyles.metaValue}>{selectedComplaint.location}</span>
                                    </div>
                                    <div style={pageStyles.metaItem}>
                                        <span style={pageStyles.metaLabel}>Complaint ID:</span>
                                        <span style={pageStyles.metaValue}>{selectedComplaint._id.substring(0, 8)}</span>
                                    </div>
                                </div>
                                
                                <div style={pageStyles.actionButtons}>
                                    <button style={pageStyles.saveButton}>
                                        Save Changes
                                    </button>
                                    <button style={pageStyles.viewDetailsButton}>
                                        View Full Details
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div style={pageStyles.emptyState}>
                                <div style={pageStyles.emptyIcon}>
                                    <i className="fas fa-eye"></i>
                                </div>
                                <p style={{ color: '#9ca3af' }}>Select a complaint to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;