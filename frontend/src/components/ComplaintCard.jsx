import React from 'react';
import { Link } from 'react-router-dom';

const ComplaintCard = ({ complaint }) => {
    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <i className="fas fa-clock" style={{ color: '#d97706' }}></i>;
            case 'in-progress':
                return <i className="fas fa-tools" style={{ color: '#2563eb' }}></i>;
            case 'resolved':
                return <i className="fas fa-check-circle" style={{ color: '#059669' }}></i>;
            case 'closed':
                return <i className="fas fa-check-circle" style={{ color: '#6b7280' }}></i>;
            default:
                return <i className="fas fa-exclamation-circle" style={{ color: '#dc2626' }}></i>;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return { backgroundColor: '#fef3c7', color: '#92400e' };
            case 'in-progress':
                return { backgroundColor: '#dbeafe', color: '#1e40af' };
            case 'resolved':
                return { backgroundColor: '#d1fae5', color: '#065f46' };
            case 'closed':
                return { backgroundColor: '#f3f4f6', color: '#374151' };
            default:
                return { backgroundColor: '#fef2f2', color: '#991b1b' };
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case 'critical':
                return '#dc2626';
            case 'high':
                return '#ea580c';
            case 'medium':
                return '#d97706';
            case 'low':
                return '#16a34a';
            default:
                return '#6b7280';
        }
    };

    const cardStyles = {
        card: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            marginBottom: '1rem',
            transition: 'box-shadow 0.2s'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '1rem'
        },
        title: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        description: {
            color: '#6b7280',
            marginBottom: '1rem',
            lineHeight: 1.5
        },
        statusBadge: {
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        priorityDot: {
            width: '0.75rem',
            height: '0.75rem',
            borderRadius: '50%',
            display: 'inline-block'
        },
        metaInfo: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1rem',
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '1rem'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        imageContainer: {
            marginTop: '1rem'
        },
        image: {
            width: '100%',
            height: '12rem',
            objectFit: 'cover',
            borderRadius: '0.5rem'
        },
        footer: {
            marginTop: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid #e5e7eb',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        complaintId: {
            fontSize: '0.75rem',
            color: '#6b7280'
        },
        ratingContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        stars: {
            display: 'flex',
            gap: '0.125rem'
        },
        star: (filled) => ({
            color: filled ? '#fbbf24' : '#d1d5db',
            fontSize: '0.875rem'
        }),
        viewButton: {
            padding: '0.5rem 1rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            transition: 'background-color 0.2s'
        }
    };

    const statusStyle = getStatusColor(complaint.status);
    const priorityColor = getPriorityColor(complaint.priority);

    return (
        <div style={cardStyles.card}>
            <div style={cardStyles.header}>
                <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        {getStatusIcon(complaint.status)}
                        <h3 style={cardStyles.title}>{complaint.title}</h3>
                        <span style={{ ...cardStyles.statusBadge, ...statusStyle }}>
                            {complaint.status.replace('-', ' ')}
                        </span>
                        <div style={{ ...cardStyles.priorityDot, backgroundColor: priorityColor }}></div>
                    </div>
                    
                    <p style={cardStyles.description}>{complaint.description}</p>
                    
                    <div style={cardStyles.metaInfo}>
                        <div style={cardStyles.metaItem}>
                            <i className="fas fa-map-marker-alt"></i>
                            <span>{complaint.location}</span>
                        </div>
                        <div style={cardStyles.metaItem}>
                            <i className="fas fa-calendar"></i>
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                        </div>
                        <div style={{ color: '#3b82f6', fontWeight: 500 }}>
                            {complaint.department}
                        </div>
                    </div>
                    
                    {complaint.image && (
                        <div style={cardStyles.imageContainer}>
                            <img 
                                src={`http://localhost:5000/${complaint.image}`} 
                                alt="Complaint" 
                                style={cardStyles.image}
                            />
                        </div>
                    )}
                </div>
                
                <Link 
                    to={`/complaint-status/${complaint._id}`}
                    style={cardStyles.viewButton}
                >
                    View Details
                </Link>
            </div>
            
            <div style={cardStyles.footer}>
                <div style={cardStyles.complaintId}>
                    Complaint ID: {complaint._id?.substring(0, 8) || 'N/A'}
                </div>
                {complaint.rating && (
                    <div style={cardStyles.ratingContainer}>
                        <div style={cardStyles.stars}>
                            {[...Array(5)].map((_, i) => (
                                <i
                                    key={i}
                                    className="fas fa-star"
                                    style={cardStyles.star(i < complaint.rating)}
                                ></i>
                            ))}
                        </div>
                        <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>
                            {complaint.rating}/5
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComplaintCard;