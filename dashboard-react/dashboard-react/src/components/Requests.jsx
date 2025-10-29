import { useState } from 'react'
import '../styles/requests.css'
import { requestsData } from '../data/requestsData';
import RequestModal from '../components/modals/RequestsModal';
import { useComponentAnimations } from '../hooks/useAnimations'

export default function Requests() {
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const pageRef = useComponentAnimations()
  
  return (
    <div ref={pageRef} className="page-container">
      <div className="header">
        <div className="header-top">
          <div>
            <h1>Job Applications</h1>
            <p>Review and manage candidate applications.</p>
          </div>
          <div className="header-right">
            <div className="profile-pic">
              <svg width="55" height="55" viewBox="0 0 55 55">
                <rect width="55" height="55" fill="#e5e7eb"/>
                <circle cx="27.5" cy="20" r="8" fill="#9ca3af"/>
                <path d="M10 45c0-8 7-12 17.5-12S45 37 45 45" fill="#9ca3af"/>
              </svg>
            </div>
            <div className="notification-icon">
              <div className="notification-badge">3</div>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                <path d="M18 8c0-3.3-2.7-6-6-6S6 4.7 6 8c0 4.5-2 6-2 6h16s-2-1.5-2-6z"/>
                <path d="M13.73 21c-.3.5-.8.9-1.4 1-.6.1-1.3-.1-1.7-.6-.2-.2-.3-.5-.4-.8"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="content-area">
        {/* Stats Grid */}
        <div className="stats-grid animate-on-scroll">
          <div className="stat-card animate-on-scroll">
            <div className="stat-icon">📋</div>
            <div className="stat-value">24</div>
            <div className="stat-label">Total Applications</div>
          </div>
          <div className="stat-card animate-on-scroll">
            <div className="stat-icon">⏳</div>
            <div className="stat-value">8</div>
            <div className="stat-label">Pending Review</div>
          </div>
          <div className="stat-card animate-on-scroll">
            <div className="stat-icon">👁️</div>
            <div className="stat-value">10</div>
            <div className="stat-label">In Review</div>
          </div>
          <div className="stat-card animate-on-scroll">
            <div className="stat-icon">✅</div>
            <div className="stat-value">6</div>
            <div className="stat-label">Approved</div>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="filters-bar animate-on-scroll">
          <button className="filter-btn active">All Applications</button>
          <button className="filter-btn">Pending</button>
          <button className="filter-btn">In Review</button>
          <button className="filter-btn">Approved</button>
          <button className="filter-btn">Rejected</button>
          <div className="search-box">
            <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            <input type="text" placeholder="Search by name or position..."/>
          </div>
        </div>

        {/* Requests List */}
        <div className="requests-list">
          {requestsData.map((request, index) => (
            <div key={index} className="request-card">
              <div className="request-header">
                <div className="avatar">
                  {request.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="request-info">
                  <div className="request-name">{request.name}</div>
                  <div className="request-position">{request.position}</div>
                </div>
                <div className={`request-status ${request.status === 'pending' ? 'status-pending' : request.status === 'review' ? 'status-review' : 'status-approved'}`}>
                  {request.status === 'pending' && 'Pending'}
                  {request.status === 'review' && 'In Review'}
                  {request.status === 'approved' && 'Approved'}
                </div>
              </div>
              
              <div className="request-details">
                <div className="detail-item">
                  <span className="detail-icon">📧</span>
                  {request.email}
                </div>
                <div className="detail-item">
                  <span className="detail-icon">💼</span>
                  {request.experience} experience
                </div>
                <div className="detail-item">
                  <span className="detail-icon">📅</span>
                  {request.date}
                </div>
              </div>

              <div className="skills-container">
                {request.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="skill-tag">{skill}</div>
                ))}
              </div>

              <div className="request-actions">
                <button className="action-btn btn-view" onClick={() => {
                  setSelectedRequest(request)
                  setShowModal(true)
                }}>📄 View Details</button>
                {request.status !== 'approved' ? (
                  <>
                    <button className="action-btn btn-approve">✓ Approve</button>
                    <button className="action-btn btn-reject">✗ Reject</button>
                  </>
                ) : (
                  <button className="action-btn modal-btn-contact" onClick={() => window.location.href = `mailto:${request.email}`}>
                    💬 Contact
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && selectedRequest && (
        <RequestModal 
          isOpen={showModal} 
          request={selectedRequest}
          onClose={() => {
            setShowModal(false)
            setSelectedRequest(null)
          }}
        />
      )}
    </div>
  )
}