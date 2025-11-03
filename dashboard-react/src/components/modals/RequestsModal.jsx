// src/components/modals/RequestModal.jsx
import React from 'react';

const RequestModal = ({ isOpen, request, onClose }) => {
    if (!isOpen || !request) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-close" onClick={onClose}>×</div>
        
                <div className="modal-header">
                    <div className="modal-avatar">
                        {request.name ? request.name[0].toUpperCase() : '?'}
                    </div>
                    <div className="modal-title-section">
                        <h2>{request.name}</h2>
                        <div className="modal-position">{request.position}</div>
                    </div>
                </div>

                <div className="modal-section">
                    <div className="modal-section-title">Contact Information</div>
                    <div className="modal-info-grid">
                        <div className="modal-info-item">
                            <div className="modal-info-label">📧 Email</div>
                            <div className="modal-info-value">{request.email}</div>
                        </div>
                        <div className="modal-info-item">
                            <div className="modal-info-label">💼 Experience</div>
                            <div className="modal-info-value">{request.experience}</div>
                        </div>
                        <div className="modal-info-item">
                            <div className="modal-info-label">📅 Application Date</div>
                            <div className="modal-info-value">{request.date}</div>
                        </div>
                        <div className="modal-info-item">
                            <div className="modal-info-label">📊 Status</div>
                            <div className="modal-info-value">
                                <span className={`status ${request.status}`}>
                                    {request.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="modal-section">
                    <div className="modal-section-title">Skills & Technologies</div>
                    <div className="modal-skills">
                        {request.skills && request.skills.map((skill, index) => (
                            <span key={index} className="modal-skill">{skill}</span>
                        ))}
                    </div>
                </div>

                <div className="modal-section">
                    <div className="modal-section-title">Cover Letter</div>
                    <div className="modal-description">{request.description}</div>
                </div>

                <div className="modal-actions">
                    <button className="modal-btn modal-btn-approve">Approve</button>
                    <button className="modal-btn modal-btn-reject">Reject</button>
                    <button className="modal-btn modal-btn-contact">Schedule Interview</button>
                </div>
            </div>
        </div>
    );
};

export default RequestModal; 