import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function Tutorial() {
    const steps = [
        {
            icon: 'fas fa-camera',
            title: "Capture the Issue",
            description: "Take a clear photo of the civic issue using your camera or upload an existing image.",
            color: '#3b82f6'
        },
        {
            icon: 'fas fa-file-alt',
            title: "Describe the Problem",
            description: "Add a title and detailed description. Voice recording is available for convenience.",
            color: '#10b981'
        },
        {
            icon: 'fas fa-microphone',
            title: "Voice Note (Optional)",
            description: "Senior citizens can use voice recording instead of typing for accessibility.",
            color: '#8b5cf6'
        },
        {
            icon: 'fas fa-check-circle',
            title: "Review & Submit",
            description: "Verify all details before submitting your complaint for processing.",
            color: '#f59e0b'
        },
        {
            icon: 'fas fa-clock',
            title: "Track Status",
            description: "Monitor your complaint's progress through different stages until resolution.",
            color: '#ef4444'
        },
        {
            icon: 'fas fa-star',
            title: "Rate Service",
            description: "Provide feedback and rate the department's work quality after resolution.",
            color: '#8b5cf6'
        }
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
        header: {
            textAlign: 'center',
            marginBottom: '3rem'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem'
        },
        subtitle: {
            fontSize: '1.125rem',
            color: '#6b7280',
            maxWidth: '600px',
            margin: '0 auto'
        },
        stepsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem',
            marginBottom: '3rem'
        },
        stepCard: {
            backgroundColor: 'white',
            border: '1px solid #e5e7eb',
            borderRadius: '0.75rem',
            padding: '1.5rem',
            transition: 'transform 0.2s, box-shadow 0.2s'
        },
        stepHeader: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '1rem',
            marginBottom: '1rem'
        },
        stepIcon: {
            width: '3rem',
            height: '3rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem'
        },
        stepTitle: {
            fontSize: '1.25rem',
            fontWeight: 600,
            color: '#1f2937',
            marginBottom: '0.25rem'
        },
        stepDescription: {
            color: '#6b7280',
            lineHeight: 1.5
        },
        securityCard: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            marginBottom: '3rem',
            textAlign: 'center',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        },
        securityIcon: {
            fontSize: '3rem',
            color: '#3b82f6',
            marginBottom: '1rem'
        },
        securityTitle: {
            fontSize: '1.875rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        securitySubtitle: {
            color: '#6b7280',
            marginBottom: '2rem'
        },
        statsGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '2rem',
            marginTop: '2rem'
        },
        statItem: {
            textAlign: 'center'
        },
        statValue: {
            fontSize: '2.25rem',
            fontWeight: 'bold',
            marginBottom: '0.5rem'
        },
        statLabel: {
            color: '#6b7280',
            fontSize: '0.875rem'
        },
        actions: {
            textAlign: 'center'
        },
        buttonGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            alignItems: 'center',
            marginBottom: '1.5rem'
        },
        primaryButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 2rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            fontWeight: 500,
            transition: 'background-color 0.2s'
        },
        secondaryButton: {
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.75rem 2rem',
            backgroundColor: 'white',
            color: '#374151',
            textDecoration: 'none',
            borderRadius: '0.5rem',
            border: '1px solid #d1d5db',
            fontWeight: 500,
            transition: 'background-color 0.2s'
        },
        supportText: {
            color: '#6b7280',
            fontSize: '0.875rem'
        }
    };

    return (
        <div style={pageStyles.container}>
            <Navbar />
            
            <div style={pageStyles.content}>
                <div style={pageStyles.header}>
                    <h1 style={pageStyles.title}>How It Works</h1>
                    <p style={pageStyles.subtitle}>
                        Learn how to effectively use our civic complaint management system to report issues
                        and track their resolution in real-time.
                    </p>
                </div>
                
                <div style={pageStyles.stepsGrid}>
                    {steps.map((step, index) => (
                        <div 
                            key={index} 
                            style={pageStyles.stepCard}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-4px)';
                                e.currentTarget.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = 'none';
                            }}
                        >
                            <div style={pageStyles.stepHeader}>
                                <div style={{ ...pageStyles.stepIcon, backgroundColor: `${step.color}15` }}>
                                    <i className={step.icon} style={{ color: step.color }}></i>
                                </div>
                                <div>
                                    <h3 style={pageStyles.stepTitle}>{step.title}</h3>
                                    <p style={pageStyles.stepDescription}>{step.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div style={pageStyles.securityCard}>
                    <div style={pageStyles.securityIcon}>
                        <i className="fas fa-shield-alt"></i>
                    </div>
                    <h2 style={pageStyles.securityTitle}>Security & Privacy</h2>
                    <p style={pageStyles.securitySubtitle}>Your information is protected with industry-standard security measures</p>
                    
                    <div style={pageStyles.statsGrid}>
                        <div style={pageStyles.statItem}>
                            <div style={{ ...pageStyles.statValue, color: '#3b82f6' }}>256-bit</div>
                            <div style={pageStyles.statLabel}>Encryption for all sensitive data</div>
                        </div>
                        <div style={pageStyles.statItem}>
                            <div style={{ ...pageStyles.statValue, color: '#10b981' }}>100%</div>
                            <div style={pageStyles.statLabel}>Aadhar verification for identity</div>
                        </div>
                        <div style={pageStyles.statItem}>
                            <div style={{ ...pageStyles.statValue, color: '#8b5cf6' }}>24/7</div>
                            <div style={pageStyles.statLabel}>System monitoring & protection</div>
                        </div>
                    </div>
                </div>
                
                <div style={pageStyles.actions}>
                    <div style={pageStyles.buttonGroup}>
                        <Link
                            to="/new-complaint"
                            style={pageStyles.primaryButton}
                        >
                            File Your First Complaint
                        </Link>
                        <Link
                            to="/dashboard"
                            style={pageStyles.secondaryButton}
                        >
                            Go to Dashboard
                        </Link>
                    </div>
                    
                    <p style={pageStyles.supportText}>
                        Need help? Contact our support team at support@civicconnect.gov.in
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Tutorial;