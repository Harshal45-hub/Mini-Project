import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import Navbar from '../../components/Navbar';
import VoiceRecorder from '../../components/VoiceRecorder';

function NewComplaint() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        department: '',
        image: null,
        voiceNote: null
    });
    const [preview, setPreview] = useState(null);
    const webcamRef = useRef(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { token } = useAuth();

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

    const captureImage = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setFormData({ ...formData, image: dataURLtoBlob(imageSrc) });
        setPreview(imageSrc);
    };

    const dataURLtoBlob = (dataURL) => {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleVoiceRecordingComplete = (audioFile) => {
        setFormData({
            ...formData,
            voiceNote: audioFile
        });
    };

    const handleSubmit = async () => {
        try {
            const formDataToSend = new FormData();
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('location', formData.location);
            formDataToSend.append('department', formData.department);
            
            if (formData.image) {
                formDataToSend.append('image', formData.image, 'complaint.jpg');
            }
            
            if (formData.voiceNote) {
                formDataToSend.append('voiceNote', formData.voiceNote, 'voice-note.webm');
            }

            // Uncomment when backend is ready
            // await axios.post('/api/complaints', formDataToSend, {
            //     headers: {
            //         'Authorization': `Bearer ${token}`,
            //         'Content-Type': 'multipart/form-data'
            //     }
            // });

            console.log('Complaint submitted:', formData);
            alert('Complaint submitted successfully! (Demo)');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error submitting complaint:', error);
            alert('Failed to submit complaint. Please try again.');
        }
    };

    const pageStyles = {
        container: {
            minHeight: '100vh',
            backgroundColor: '#f9fafb'
        },
        content: {
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 1rem'
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '0.75rem',
            padding: '2rem',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
        },
        progressContainer: {
            marginBottom: '2rem'
        },
        progressSteps: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '0.5rem'
        },
        progressStep: {
            width: '2.5rem',
            height: '2.5rem',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            position: 'relative'
        },
        progressLine: {
            flex: 1,
            height: '2px',
            backgroundColor: '#e5e7eb',
            margin: '0 0.5rem'
        },
        progressLabels: {
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '0.875rem',
            color: '#6b7280'
        },
        stepHeader: {
            textAlign: 'center',
            marginBottom: '2rem'
        },
        stepIcon: {
            fontSize: '3rem',
            marginBottom: '1rem'
        },
        stepTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        stepDescription: {
            color: '#6b7280'
        },
        cameraContainer: {
            backgroundColor: '#f3f4f6',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        cameraPreview: {
            width: '100%',
            height: '300px',
            objectFit: 'cover',
            borderRadius: '0.5rem',
            marginBottom: '1rem'
        },
        cameraActions: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        },
        button: {
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            fontWeight: 500,
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            transition: 'background-color 0.2s'
        },
        formGroup: {
            marginBottom: '1.5rem'
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
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            resize: 'vertical',
            minHeight: '100px'
        },
        select: {
            width: '100%',
            padding: '0.75rem 1rem',
            border: '1px solid #d1d5db',
            borderRadius: '0.5rem',
            fontSize: '1rem',
            backgroundColor: 'white'
        },
        reviewContainer: {
            backgroundColor: '#f9fafb',
            borderRadius: '0.5rem',
            padding: '1.5rem',
            marginBottom: '1.5rem'
        },
        reviewGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1rem'
        },
        reviewItem: {
            marginBottom: '1rem'
        },
        reviewLabel: {
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '0.25rem'
        },
        reviewValue: {
            fontWeight: 500,
            color: '#1f2937'
        },
        infoBox: {
            backgroundColor: '#dbeafe',
            border: '1px solid #93c5fd',
            borderRadius: '0.5rem',
            padding: '1rem',
            marginBottom: '1.5rem'
        },
        infoHeader: {
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '0.5rem'
        },
        infoIcon: {
            color: '#1d4ed8',
            fontSize: '1.25rem',
            flexShrink: 0
        },
        infoTitle: {
            fontWeight: 600,
            color: '#1e40af',
            marginBottom: '0.25rem'
        },
        infoList: {
            margin: 0,
            paddingLeft: '1.5rem',
            color: '#1e40af'
        },
        infoItem: {
            marginBottom: '0.25rem'
        },
        actionButtons: {
            display: 'flex',
            justifyContent: 'space-between',
            gap: '1rem',
            marginTop: '2rem'
        }
    };

    const renderStep = () => {
        switch(step) {
            case 1:
                return (
                    <div>
                        <div style={pageStyles.stepHeader}>
                            <div style={{ ...pageStyles.stepIcon, color: '#3b82f6' }}>
                                <i className="fas fa-camera"></i>
                            </div>
                            <h2 style={pageStyles.stepTitle}>Step 1: Capture the Issue</h2>
                            <p style={pageStyles.stepDescription}>Take a clear photo or upload an existing image</p>
                        </div>
                        
                        <div style={pageStyles.cameraContainer}>
                            {!preview ? (
                                <div>
                                    <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', overflow: 'hidden', marginBottom: '1rem' }}>
                                        <Webcam
                                            audio={false}
                                            ref={webcamRef}
                                            screenshotFormat="image/jpeg"
                                            style={{ width: '100%', height: '300px' }}
                                        />
                                    </div>
                                    <div style={pageStyles.cameraActions}>
                                        <button
                                            onClick={captureImage}
                                            style={{ ...pageStyles.button, backgroundColor: '#3b82f6', color: 'white' }}
                                        >
                                            <i className="fas fa-camera"></i>
                                            <span>Capture Photo</span>
                                        </button>
                                        <button
                                            onClick={() => fileInputRef.current.click()}
                                            style={{ ...pageStyles.button, backgroundColor: '#4b5563', color: 'white' }}
                                        >
                                            <i className="fas fa-upload"></i>
                                            <span>Upload Photo</span>
                                        </button>
                                    </div>
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            ) : (
                                <div>
                                    <div style={{ position: 'relative' }}>
                                        <img src={preview} alt="Preview" style={pageStyles.cameraPreview} />
                                        <button
                                            onClick={() => {
                                                setPreview(null);
                                                setFormData({ ...formData, image: null });
                                            }}
                                            style={{
                                                position: 'absolute',
                                                top: '1rem',
                                                right: '1rem',
                                                padding: '0.5rem 1rem',
                                                backgroundColor: '#dc2626',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '0.5rem',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            Retake
                                        </button>
                                    </div>
                                    <div style={pageStyles.infoBox}>
                                        <div style={pageStyles.infoHeader}>
                                            <i className="fas fa-check-circle" style={pageStyles.infoIcon}></i>
                                            <div>
                                                <div style={pageStyles.infoTitle}>Photo captured successfully</div>
                                                <p style={{ color: '#1e40af', margin: 0 }}>Proceed to next step</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <button
                                onClick={() => setStep(2)}
                                disabled={!formData.image}
                                style={{
                                    ...pageStyles.button,
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    opacity: !formData.image ? 0.5 : 1,
                                    cursor: !formData.image ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <span>Next Step</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                );
            
            case 2:
                return (
                    <div>
                        <div style={pageStyles.stepHeader}>
                            <div style={{ ...pageStyles.stepIcon, color: '#10b981' }}>
                                <i className="fas fa-clipboard-list"></i>
                            </div>
                            <h2 style={pageStyles.stepTitle}>Step 2: Describe the Issue</h2>
                            <p style={pageStyles.stepDescription}>Provide details about the problem</p>
                        </div>
                        
                        <div style={pageStyles.formGroup}>
                            <label style={pageStyles.label}>Complaint Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g., Pothole on Main Road"
                                style={pageStyles.input}
                            />
                        </div>
                        
                        <div style={pageStyles.formGroup}>
                            <label style={pageStyles.label}>Detailed Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the issue in detail..."
                                style={pageStyles.textarea}
                            />
                        </div>
                        
                        <div style={pageStyles.formGroup}>
                            <label style={pageStyles.label}>Voice Recording (Optional)</label>
                            <VoiceRecorder onRecordingComplete={handleVoiceRecordingComplete} />
                        </div>
                        
                        <div style={pageStyles.formGroup}>
                            <label style={pageStyles.label}>Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g., Near Central Park, Sector 5"
                                style={pageStyles.input}
                            />
                        </div>
                        
                        <div style={pageStyles.formGroup}>
                            <label style={pageStyles.label}>Select Department</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                style={pageStyles.select}
                            >
                                <option value="">Choose responsible department</option>
                                {departments.map(dept => (
                                    <option key={dept} value={dept}>{dept}</option>
                                ))}
                            </select>
                        </div>
                        
                        <div style={pageStyles.actionButtons}>
                            <button
                                onClick={() => setStep(1)}
                                style={{ ...pageStyles.button, backgroundColor: '#4b5563', color: 'white' }}
                            >
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </button>
                            <button
                                onClick={() => setStep(3)}
                                disabled={!formData.title || !formData.description || !formData.location || !formData.department}
                                style={{
                                    ...pageStyles.button,
                                    backgroundColor: '#3b82f6',
                                    color: 'white',
                                    opacity: (!formData.title || !formData.description || !formData.location || !formData.department) ? 0.5 : 1,
                                    cursor: (!formData.title || !formData.description || !formData.location || !formData.department) ? 'not-allowed' : 'pointer'
                                }}
                            >
                                <span>Review & Submit</span>
                                <i className="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                );
            
            case 3:
                return (
                    <div>
                        <div style={pageStyles.stepHeader}>
                            <div style={{ ...pageStyles.stepIcon, color: '#10b981' }}>
                                <i className="fas fa-check-circle"></i>
                            </div>
                            <h2 style={pageStyles.stepTitle}>Step 3: Review & Submit</h2>
                            <p style={pageStyles.stepDescription}>Verify all details before submission</p>
                        </div>
                        
                        <div style={pageStyles.reviewContainer}>
                            <div style={pageStyles.reviewGrid}>
                                <div style={pageStyles.reviewItem}>
                                    <div style={pageStyles.reviewLabel}>Complaint Title</div>
                                    <div style={pageStyles.reviewValue}>{formData.title}</div>
                                </div>
                                <div style={pageStyles.reviewItem}>
                                    <div style={pageStyles.reviewLabel}>Department</div>
                                    <div style={pageStyles.reviewValue}>{formData.department}</div>
                                </div>
                                <div style={{ ...pageStyles.reviewItem, gridColumn: '1 / -1' }}>
                                    <div style={pageStyles.reviewLabel}>Description</div>
                                    <div style={pageStyles.reviewValue}>{formData.description}</div>
                                </div>
                                <div style={{ ...pageStyles.reviewItem, gridColumn: '1 / -1' }}>
                                    <div style={pageStyles.reviewLabel}>Location</div>
                                    <div style={pageStyles.reviewValue}>{formData.location}</div>
                                </div>
                                {preview && (
                                    <div style={{ ...pageStyles.reviewItem, gridColumn: '1 / -1' }}>
                                        <div style={pageStyles.reviewLabel}>Image Preview</div>
                                        <img src={preview} alt="Issue" style={{ width: '100%', maxWidth: '400px', height: '200px', objectFit: 'cover', borderRadius: '0.5rem' }} />
                                    </div>
                                )}
                                {formData.voiceNote && (
                                    <div style={{ ...pageStyles.reviewItem, gridColumn: '1 / -1' }}>
                                        <div style={pageStyles.reviewLabel}>Voice Note</div>
                                        <div style={{ backgroundColor: '#d1fae5', border: '1px solid #a7f3d0', borderRadius: '0.5rem', padding: '0.75rem' }}>
                                            <p style={{ color: '#065f46', margin: 0 }}>Voice recording attached ✓</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        <div style={pageStyles.infoBox}>
                            <div style={pageStyles.infoHeader}>
                                <i className="fas fa-info-circle" style={pageStyles.infoIcon}></i>
                                <div>
                                    <div style={pageStyles.infoTitle}>Important Information</div>
                                    <ul style={pageStyles.infoList}>
                                        <li style={pageStyles.infoItem}>Your complaint will be forwarded to the selected department</li>
                                        <li style={pageStyles.infoItem}>You can track the status in your dashboard</li>
                                        <li style={pageStyles.infoItem}>Expected response time: 24-48 hours</li>
                                        <li style={pageStyles.infoItem}>You'll receive updates via email</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        
                        <div style={pageStyles.actionButtons}>
                            <button
                                onClick={() => setStep(2)}
                                style={{ ...pageStyles.button, backgroundColor: '#4b5563', color: 'white' }}
                            >
                                <i className="fas fa-arrow-left"></i>
                                <span>Back</span>
                            </button>
                            <button
                                onClick={handleSubmit}
                                style={{ ...pageStyles.button, backgroundColor: '#10b981', color: 'white' }}
                            >
                                <i className="fas fa-check-circle"></i>
                                <span>Submit Complaint</span>
                            </button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <div style={pageStyles.container}>
            <Navbar />
            
            <div style={pageStyles.content}>
                <div style={pageStyles.card}>
                    {/* Progress Steps */}
                    <div style={pageStyles.progressContainer}>
                        <div style={pageStyles.progressSteps}>
                            {[1, 2, 3].map((stepNum) => (
                                <div key={stepNum} style={{ display: 'flex', alignItems: 'center' }}>
                                    <div style={{
                                        ...pageStyles.progressStep,
                                        backgroundColor: step >= stepNum ? '#3b82f6' : '#e5e7eb',
                                        color: step >= stepNum ? 'white' : '#9ca3af'
                                    }}>
                                        {stepNum}
                                    </div>
                                    {stepNum < 3 && (
                                        <div style={{
                                            ...pageStyles.progressLine,
                                            backgroundColor: step > stepNum ? '#3b82f6' : '#e5e7eb'
                                        }} />
                                    )}
                                </div>
                            ))}
                        </div>
                        <div style={pageStyles.progressLabels}>
                            <span style={{ color: step >= 1 ? '#3b82f6' : '#6b7280', fontWeight: step >= 1 ? 500 : 400 }}>
                                Capture Issue
                            </span>
                            <span style={{ color: step >= 2 ? '#3b82f6' : '#6b7280', fontWeight: step >= 2 ? 500 : 400 }}>
                                Describe Issue
                            </span>
                            <span style={{ color: step >= 3 ? '#3b82f6' : '#6b7280', fontWeight: step >= 3 ? 500 : 400 }}>
                                Review & Submit
                            </span>
                        </div>
                    </div>
                    
                    {renderStep()}
                </div>
                
                <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                    <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                        Need help? Check our{' '}
                        <a href="/tutorial" style={{ color: '#3b82f6', textDecoration: 'none' }}>
                            tutorial guide
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default NewComplaint;