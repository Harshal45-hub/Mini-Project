import React, { useState, useEffect, useRef } from 'react';

const VoiceRecorder = ({ onRecordingComplete }) => {
    const [isRecording, setIsRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [audioURL, setAudioURL] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);
    const [recordingTime, setRecordingTime] = useState(0);
    
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const audioRef = useRef(null);
    const timerRef = useRef(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            
            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunksRef.current.push(event.data);
                }
            };
            
            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const audioUrl = URL.createObjectURL(audioBlob);
                setAudioURL(audioUrl);
                setAudioBlob(audioBlob);
                audioChunksRef.current = [];
                
                if (onRecordingComplete) {
                    const audioFile = new File([audioBlob], 'voice-note.webm', { type: 'audio/webm' });
                    onRecordingComplete(audioFile);
                }
            };
            
            mediaRecorderRef.current.start();
            setIsRecording(true);
            
            setRecordingTime(0);
            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
            
        } catch (error) {
            console.error('Error accessing microphone:', error);
            alert('Could not access microphone. Please check permissions.');
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
            
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const togglePlayback = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const clearRecording = () => {
        setAudioURL('');
        setAudioBlob(null);
        setIsPlaying(false);
        setRecordingTime(0);
        
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        
        if (onRecordingComplete) {
            onRecordingComplete(null);
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
            
            if (mediaRecorderRef.current && isRecording) {
                mediaRecorderRef.current.stop();
            }
            
            if (audioURL) {
                URL.revokeObjectURL(audioURL);
            }
        };
    }, []);

    return (
        <div style={{
            padding: '1rem',
            border: '1px solid #e5e7eb',
            borderRadius: '0.5rem',
            backgroundColor: '#f9fafb'
        }}>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '1rem'
            }}>
                <h3 style={{ margin: 0, fontWeight: 500, color: '#374151' }}>Voice Recording</h3>
                {isRecording && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <div style={{
                            width: '0.75rem',
                            height: '0.75rem',
                            backgroundColor: '#dc2626',
                            borderRadius: '50%',
                            animation: 'pulse 1.5s infinite'
                        }}></div>
                        <span style={{ fontSize: '0.875rem', color: '#dc2626' }}>Recording...</span>
                        <span style={{ fontSize: '0.875rem', fontFamily: 'monospace' }}>
                            {formatTime(recordingTime)}
                        </span>
                    </div>
                )}
            </div>
            
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                marginBottom: '1rem'
            }}>
                {!isRecording && !audioURL ? (
                    <button
                        onClick={startRecording}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#dc2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer'
                        }}
                    >
                        <i className="fas fa-microphone"></i>
                        <span>Start Recording</span>
                    </button>
                ) : isRecording ? (
                    <button
                        onClick={stopRecording}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.5rem 1rem',
                            backgroundColor: '#4b5563',
                            color: 'white',
                            border: 'none',
                            borderRadius: '0.375rem',
                            cursor: 'pointer'
                        }}
                    >
                        <i className="fas fa-square"></i>
                        <span>Stop Recording</span>
                    </button>
                ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <button
                            onClick={togglePlayback}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#3b82f6',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            {isPlaying ? (
                                <i className="fas fa-pause"></i>
                            ) : (
                                <i className="fas fa-play"></i>
                            )}
                            <span>{isPlaying ? 'Pause' : 'Play'}</span>
                        </button>
                        
                        <button
                            onClick={clearRecording}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#e5e7eb',
                                color: '#374151',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-trash"></i>
                            <span>Clear</span>
                        </button>
                        
                        <button
                            onClick={startRecording}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.5rem 1rem',
                                backgroundColor: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '0.375rem',
                                cursor: 'pointer'
                            }}
                        >
                            <i className="fas fa-microphone"></i>
                            <span>Re-record</span>
                        </button>
                    </div>
                )}
            </div>
            
            {audioURL && (
                <div style={{ marginTop: '1rem' }}>
                    <audio
                        ref={audioRef}
                        src={audioURL}
                        onEnded={() => setIsPlaying(false)}
                        style={{ width: '100%' }}
                    />
                    <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#4b5563' }}>
                        <p>Recording ready! You can play it back or re-record if needed.</p>
                    </div>
                </div>
            )}
            
            <div style={{
                fontSize: '0.75rem',
                color: '#6b7280',
                marginTop: '1rem'
            }}>
                <p style={{ margin: '0.25rem 0' }}>• Click "Start Recording" to begin</p>
                <p style={{ margin: '0.25rem 0' }}>• Click "Stop Recording" when finished</p>
                <p style={{ margin: '0.25rem 0' }}>• Maximum recording time: 5 minutes</p>
            </div>
        </div>
    );
};

export default VoiceRecorder;