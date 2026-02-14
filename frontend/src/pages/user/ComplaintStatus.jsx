import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';

function ComplaintStatus() {
    const { id } = useParams();
    const { token } = useAuth();
    const [complaint, setComplaint] = useState(null);
    const [loading, setLoading] = useState(true);
    const [rating, setRating] = useState(0);
    const [feedback, setFeedback] = useState('');
    const [submittingRating, setSubmittingRating] = useState(false);

    useEffect(() => {
        fetchComplaintDetails();
    }, [id]);

    const fetchComplaintDetails = async () => {
        try {
            // Mock data for now
            const mockComplaint = {
                _id: id,
                title: 'Pothole on Main Road',
                description: 'Large pothole causing traffic issues and vehicle damage. Located near the central intersection.',
                status: 'in-progress',
                priority: 'high',
                location: 'Main Road, Sector 5, Near Central Park',
                department: 'Public Works Department',
                image: 'uploads/complaint1.jpg',
                createdAt: new Date('2024-01-15'),
                adminNotes: 'Work order issued. Department team will visit site within 24 hours.',
                resolutionImage: null,
                rating: null,
                feedback: null
            };
            
            setComplaint(mockComplaint);
        } catch (error) {
            console.error('Error fetching complaint details:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleRatingSubmit = async () => {
        if (!rating || rating < 1 || rating > 5) {
            alert('Please select a rating between 1 and 5 stars');
            return;
        }

        setSubmittingRating(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Update complaint with rating
            setComplaint({
                ...complaint,
                rating,
                feedback,
                status: 'closed'
            });
            
            alert('Thank you for your feedback!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        } finally {
            setSubmittingRating(false);
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                return {
                    icon: 'fas fa-clock',
                    color: '#d97706',
                    title: 'Pending Review',
                    description: 'Your complaint is waiting for admin review',
                    progress: 25
                };
            case 'in-progress':
                return {
                    icon: 'fas fa-tools',
                    color: '#2563eb',
                    title: 'In Progress',
                    description: 'Department is working on your complaint',
                    progress: 50
                };
            case 'resolved':
                return {
                    icon: 'fas fa-check-circle',
                    color: '#059669',
                    title: 'Resolved',
                    description: 'Your complaint has been resolved',
                    progress: 75
                };
            case 'closed':
                return {
                    icon: 'fas fa-check-circle',
                    color: '#6b7280',
                    title: 'Closed',
                    description: 'Complaint is closed with feedback',
                    progress: 100
                };
            default:
                return {
                    icon: 'fas fa-exclamation-circle',
                    color: '#dc2626',
                    title: 'Unknown',
                    description: 'Status unknown',
                    progress: 0
                };
        }
    };

    const timelineSteps = [
        { status: 'pending', label: 'Submitted', date: 'Today, 10:30 AM' },
        { status: 'pending', label: 'Under Review', date: 'Expected: Tomorrow' },
        { status: 'pending', label: 'Assigned to Department', date: 'Expected: Within 24h' },
        { status: 'pending', label: 'Work in Progress', date: 'Expected: Within 48h' },
        { status: 'pending', label: 'Resolved', date: 'Expected: 3-5 days' }
    ];

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
        breadcrumb: {
            marginBottom: '1.5rem'
        },
        breadcrumbNav: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
        },
        breadcrumbLink: {
            color: '#6b7280',
            textDecoration: 'none'
        },
        breadcrumbSeparator: {
            color: '#9ca3af'
        },
        mainGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
        },
        complaintCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        complaintHeader: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            marginBottom: '1.5rem'
        },
        complaintTitleRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        complaintTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            margin: 0
        },
        statusBadge: {
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        priorityBadge: {
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            fontSize: '0.875rem',
            fontWeight: 500
        },
        complaintDescription: {
            color: '#4b5563',
            lineHeight: 1.6,
            marginBottom: '1.5rem'
        },
        complaintMeta: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        },
        metaItem: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#6b7280'
        },
        metaIcon: {
            width: '1rem'
        },
        imagesSection: {
            marginTop: '1.5rem'
        },
        imagesTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1rem'
        },
        imagesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1rem'
        },
        imageContainer: {
            position: 'relative'
        },
        image: {
            width: '100%',
            height: '200px',
            objectFit: 'cover',
            borderRadius: '0.5rem'
        },
        imageLabel: {
            fontSize: '0.875rem',
            color: '#6b7280',
            marginTop: '0.5rem'
        },
        timelineSection: {
            marginTop: '2rem'
        },
        timelineTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1.5rem'
        },
        timelineContainer: {
            position: 'relative'
        },
        progressBar: {
            position: 'absolute',
            left: 0,
            top: '20px',
            width: '100%',
            height: '2px',
            backgroundColor: '#e5e7eb',
            zIndex: 1
        },
        progressFill: {
            height: '2px',
            backgroundColor: '#3b82f6',
            transition: 'width 0.3s ease-in-out'
        },
        timelineSteps: {
            position: 'relative',
            display: 'flex',
            justifyContent: 'space-between',
            zIndex: 2
        },
        timelineStep: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        },
        stepCircle: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid',
            marginBottom: '0.5rem',
            fontWeight: 600
        },
        stepLabel: {
            fontSize: '0.875rem',
            fontWeight: 500,
            color: '#1f2937',
            textAlign: 'center'
        },
        stepDate: {
            fontSize: '0.75rem',
            color: '#6b7280',
            textAlign: 'center'
        },
        sidebar: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        statusCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        statusTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1rem'
        },
        statusInfo: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '1.5rem'
        },
        statusIcon: {
            fontSize: '1.5rem'
        },
        statusContent: {
            flex: 1
        },
        statusContentTitle: {
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '0.25rem'
        },
        statusContentDescription: {
            color: '#6b7280',
            fontSize: '0.875rem'
        },
        progressContainer: {
            marginTop: '1rem'
        },
        progressInfo: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            marginBottom: '0.5rem'
        },
        progressBarSmall: {
            height: '0.5rem',
            backgroundColor: '#e5e7eb',
            borderRadius: '9999px',
            overflow: 'hidden'
        },
        progressFillSmall: {
            height: '100%',
            backgroundColor: '#3b82f6',
            borderRadius: '9999px',
            transition: 'width 0.3s ease-in-out'
        },
        notesCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        notesTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1rem'
        },
        notesContent: {
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '0.5rem',
            padding: '1rem'
        },
        notesText: {
            color: '#1e40af',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            margin: 0
        },
        ratingCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        ratingTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1rem'
        },
        ratingSection: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
        },
        starsContainer: {
            display: 'flex',
            justifyContent: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
        },
        starButton: {
            background: 'none',
            border: 'none',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: 0,
            color: '#d1d5db'
        },
        feedbackInput: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            resize: 'vertical',
            minHeight: '80px'
        },
        submitButton: {
            width: '100%',
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: 500,
            cursor: 'pointer'
        },
        existingRating: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        },
        starsDisplay: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        starDisplay: {
            display: 'flex',
            gap: '0.125rem'
        },
        starIcon: (filled) => ({
            color: filled ? '#fbbf24' : '#d1d5db',
            fontSize: '1.25rem'
        }),
        ratingValue: {
            fontSize: '1.25rem',
            fontWeight: 'bold',
            color: '#1f2937'
        },
        feedbackDisplay: {
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '1rem'
        },
        feedbackText: {
            color: '#4b5563',
            fontSize: '0.875rem',
            lineHeight: 1.5,
            margin: 0
        },
        actionsCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        actionsTitle: {
            fontSize: '1.125rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '1rem'
        },
        actionsList: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
        },
        actionLink: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.75rem 1rem',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            transition: 'background-color 0.2s'
        },
        actionIcon: {
            fontSize: '0.875rem',
            color: '#6b7280'
        },
        loadingContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: '1rem'
        },
        errorContainer: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '400px',
            gap: '1rem',
            textAlign: 'center'
        },
        errorIcon: {
            fontSize: '4rem',
            color: '#dc2626'
        },
        errorTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937'
        },
        errorText: {
            color: '#6b7280',
            marginBottom: '1rem'
        }
    };

    if (loading) {
        return (
            <div style={pageStyles.container}>
                <Navbar />
                <div style={pageStyles.content}>
                    <div style={pageStyles.loadingContainer}>
                        <div className="loading-spinner"></div>
                        <p style={{ color: '#6b7280' }}>Loading complaint details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!complaint) {
        return (
            <div style={pageStyles.container}>
                <Navbar />
                <div style={pageStyles.content}>
                    <div style={pageStyles.errorContainer}>
                        <div style={pageStyles.errorIcon}>
                            <i className="fas fa-exclamation-circle"></i>
                        </div>
                        <h2 style={pageStyles.errorTitle}>Complaint Not Found</h2>
                        <p style={pageStyles.errorText}>The complaint you're looking for doesn't exist or you don't have access to it.</p>
                        <Link
                            to="/dashboard"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '0.75rem 1.5rem',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                textDecoration: 'none',
                                borderRadius: '0.5rem',
                                fontWeight: 500
                            }}
                        >
                            Go Back to Dashboard
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const statusInfo = getStatusInfo(complaint.status);

    return (
        <div style={pageStyles.container}>
            <Navbar />
            
            <div style={pageStyles.content}>
                {/* Breadcrumb */}
                <div style={pageStyles.breadcrumb}>
                    <nav style={pageStyles.breadcrumbNav}>
                        <Link to="/dashboard" style={pageStyles.breadcrumbLink}>Dashboard</Link>
                        <i className="fas fa-chevron-right" style={pageStyles.breadcrumbSeparator}></i>
                        <span style={{ color: '#1f2937', fontWeight: 500 }}>
                            Complaint #{complaint._id?.substring(0, 8) || 'N/A'}
                        </span>
                    </nav>
                </div>
                
                <div style={{ ...pageStyles.mainGrid, gridTemplateColumns: '1fr' }}>
                    {/* Main Content */}
                    <div>
                        {/* Complaint Details */}
                        <div style={pageStyles.complaintCard}>
                            <div style={pageStyles.complaintHeader}>
                                <div style={pageStyles.complaintTitleRow}>
                                    <h1 style={pageStyles.complaintTitle}>{complaint.title}</h1>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                        <span style={{
                                            ...pageStyles.statusBadge,
                                            backgroundColor: `${statusInfo.color}15`,
                                            color: statusInfo.color
                                        }}>
                                            <i className={statusInfo.icon}></i>
                                            {complaint.status.replace('-', ' ')}
                                        </span>
                                        <span style={{
                                            ...pageStyles.priorityBadge,
                                            backgroundColor: complaint.priority === 'critical' ? '#fef2f2' : 
                                                           complaint.priority === 'high' ? '#ffedd5' : 
                                                           complaint.priority === 'medium' ? '#fef3c7' : '#f0fdf4',
                                            color: complaint.priority === 'critical' ? '#991b1b' : 
                                                  complaint.priority === 'high' ? '#9a3412' : 
                                                  complaint.priority === 'medium' ? '#92400e' : '#166534'
                                        }}>
                                            Priority: {complaint.priority}
                                        </span>
                                    </div>
                                </div>
                                
                                <p style={pageStyles.complaintDescription}>{complaint.description}</p>
                                
                                <div style={pageStyles.complaintMeta}>
                                    <div style={pageStyles.metaItem}>
                                        <i className="fas fa-map-marker-alt" style={pageStyles.metaIcon}></i>
                                        <span>{complaint.location}</span>
                                    </div>
                                    <div style={pageStyles.metaItem}>
                                        <i className="fas fa-building" style={pageStyles.metaIcon}></i>
                                        <span>{complaint.department}</span>
                                    </div>
                                    <div style={pageStyles.metaItem}>
                                        <i className="fas fa-calendar" style={pageStyles.metaIcon}></i>
                                        <span>Submitted: {new Date(complaint.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Images */}
                            <div style={pageStyles.imagesSection}>
                                <h3 style={pageStyles.imagesTitle}>Issue Photos</h3>
                                <div style={pageStyles.imagesGrid}>
                                    <div style={pageStyles.imageContainer}>
                                        <img 
                                            src={`http://localhost:5000/${complaint.image}`} 
                                            alt="Complaint" 
                                            style={pageStyles.image}
                                        />
                                        <div style={pageStyles.imageLabel}>Original Issue</div>
                                    </div>
                                    {complaint.resolutionImage && (
                                        <div style={pageStyles.imageContainer}>
                                            <img 
                                                src={`http://localhost:5000/${complaint.resolutionImage}`} 
                                                alt="Resolution" 
                                                style={pageStyles.image}
                                            />
                                            <div style={pageStyles.imageLabel}>Resolution Photo</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            {/* Timeline */}
                            <div style={pageStyles.timelineSection}>
                                <h3 style={pageStyles.timelineTitle}>Progress Timeline</h3>
                                <div style={pageStyles.timelineContainer}>
                                    <div style={pageStyles.progressBar}>
                                        <div 
                                            style={{ 
                                                ...pageStyles.progressFill,
                                                width: `${statusInfo.progress}%`
                                            }}
                                        ></div>
                                    </div>
                                    
                                    <div style={pageStyles.timelineSteps}>
                                        {timelineSteps.map((step, index) => (
                                            <div key={index} style={pageStyles.timelineStep}>
                                                <div style={{
                                                    ...pageStyles.stepCircle,
                                                    backgroundColor: index * 20 <= statusInfo.progress ? '#3b82f6' : 'white',
                                                    borderColor: index * 20 <= statusInfo.progress ? '#3b82f6' : '#e5e7eb',
                                                    color: index * 20 <= statusInfo.progress ? 'white' : '#9ca3af'
                                                }}>
                                                    {index + 1}
                                                </div>
                                                <div style={pageStyles.stepLabel}>{step.label}</div>
                                                <div style={pageStyles.stepDate}>{step.date}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    {/* Sidebar */}
                    <div style={pageStyles.sidebar}>
                        {/* Status Card */}
                        <div style={pageStyles.statusCard}>
                            <h3 style={pageStyles.statusTitle}>Current Status</h3>
                            <div style={pageStyles.statusInfo}>
                                <i className={statusInfo.icon} style={{ ...pageStyles.statusIcon, color: statusInfo.color }}></i>
                                <div style={pageStyles.statusContent}>
                                    <div style={pageStyles.statusContentTitle}>{statusInfo.title}</div>
                                    <div style={pageStyles.statusContentDescription}>{statusInfo.description}</div>
                                </div>
                            </div>
                            
                            <div style={pageStyles.progressContainer}>
                                <div style={pageStyles.progressInfo}>
                                    <span style={{ color: '#6b7280' }}>Progress</span>
                                    <span style={{ fontWeight: 500, color: '#1f2937' }}>{statusInfo.progress}%</span>
                                </div>
                                <div style={pageStyles.progressBarSmall}>
                                    <div 
                                        style={{
                                            ...pageStyles.progressFillSmall,
                                            width: `${statusInfo.progress}%`
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Admin Notes */}
                        {complaint.adminNotes && (
                            <div style={pageStyles.notesCard}>
                                <h3 style={pageStyles.notesTitle}>Admin Notes</h3>
                                <div style={pageStyles.notesContent}>
                                    <p style={pageStyles.notesText}>{complaint.adminNotes}</p>
                                </div>
                            </div>
                        )}
                        
                        {/* Rating Section */}
                        {complaint.status === 'resolved' && !complaint.rating ? (
                            <div style={pageStyles.ratingCard}>
                                <h3 style={pageStyles.ratingTitle}>Rate the Service</h3>
                                <div style={pageStyles.ratingSection}>
                                    <div style={pageStyles.starsContainer}>
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                onClick={() => setRating(star)}
                                                style={pageStyles.starButton}
                                            >
                                                <i 
                                                    className="fas fa-star" 
                                                    style={{ color: star <= rating ? '#fbbf24' : '#d1d5db' }}
                                                ></i>
                                            </button>
                                        ))}
                                    </div>
                                    
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: '#374151' }}>
                                            Feedback (Optional)
                                        </label>
                                        <textarea
                                            value={feedback}
                                            onChange={(e) => setFeedback(e.target.value)}
                                            placeholder="Share your experience..."
                                            style={pageStyles.feedbackInput}
                                        />
                                    </div>
                                    
                                    <button
                                        onClick={handleRatingSubmit}
                                        disabled={submittingRating}
                                        style={{
                                            ...pageStyles.submitButton,
                                            opacity: submittingRating ? 0.5 : 1,
                                            cursor: submittingRating ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {submittingRating ? 'Submitting...' : 'Submit Rating'}
                                    </button>
                                </div>
                            </div>
                        ) : complaint.rating ? (
                            <div style={pageStyles.ratingCard}>
                                <h3 style={pageStyles.ratingTitle}>Your Rating</h3>
                                <div style={pageStyles.existingRating}>
                                    <div style={pageStyles.starsDisplay}>
                                        <div style={pageStyles.starDisplay}>
                                            {[...Array(5)].map((_, i) => (
                                                <i
                                                    key={i}
                                                    className="fas fa-star"
                                                    style={pageStyles.starIcon(i < complaint.rating)}
                                                ></i>
                                            ))}
                                        </div>
                                        <span style={pageStyles.ratingValue}>{complaint.rating}/5</span>
                                    </div>
                                    {complaint.feedback && (
                                        <div style={pageStyles.feedbackDisplay}>
                                            <p style={pageStyles.feedbackText}>{complaint.feedback}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : null}
                        
                        {/* Quick Actions */}
                        <div style={pageStyles.actionsCard}>
                            <h3 style={pageStyles.actionsTitle}>Quick Actions</h3>
                            <div style={pageStyles.actionsList}>
                                <Link
                                    to="/new-complaint"
                                    style={pageStyles.actionLink}
                                >
                                    <span>File New Complaint</span>
                                    <i className="fas fa-chevron-right" style={pageStyles.actionIcon}></i>
                                </Link>
                                <Link
                                    to="/dashboard"
                                    style={pageStyles.actionLink}
                                >
                                    <span>Back to Dashboard</span>
                                    <i className="fas fa-chevron-right" style={pageStyles.actionIcon}></i>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ComplaintStatus;