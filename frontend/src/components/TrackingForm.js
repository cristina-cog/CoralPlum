import React, { useState } from 'react';
import { carbonAPI } from '../services/api';
import QuickSummaryButton from './QuickSummaryButton';

const TrackingForm = ({ onEntryAdded }) => {
  const [formData, setFormData] = useState({
    activityType: 'CLOUD_USAGE',
    description: '',
    userId: 'demo-user',
    // Cloud usage fields
    cloudProvider: '',
    computeHours: '',
    storageGB: '',
    dataTransferGB: '',
    // CI/CD fields
    cicdPlatform: '',
    buildMinutes: '',
    projectName: '',
    // Email fields
    emailCount: '',
    attachmentSizeMB: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      // Prepare data for submission
      const entryData = {
        ...formData,
        // Convert string numbers to actual numbers
        computeHours: formData.computeHours ? parseFloat(formData.computeHours) : null,
        storageGB: formData.storageGB ? parseFloat(formData.storageGB) : null,
        dataTransferGB: formData.dataTransferGB ? parseFloat(formData.dataTransferGB) : null,
        buildMinutes: formData.buildMinutes ? parseInt(formData.buildMinutes) : null,
        emailCount: formData.emailCount ? parseInt(formData.emailCount) : null,
        attachmentSizeMB: formData.attachmentSizeMB ? parseFloat(formData.attachmentSizeMB) : null
      };

      await carbonAPI.createEntry(entryData);
      
      setMessage('✅ Carbon footprint entry added successfully!');
      
      // Reset form
      setFormData({
        activityType: 'CLOUD_USAGE',
        description: '',
        userId: 'demo-user',
        cloudProvider: '',
        computeHours: '',
        storageGB: '',
        dataTransferGB: '',
        cicdPlatform: '',
        buildMinutes: '',
        projectName: '',
        emailCount: '',
        attachmentSizeMB: ''
      });

      if (onEntryAdded) {
        onEntryAdded();
      }

    } catch (error) {
      console.error('Error adding entry:', error);
      setMessage('❌ Error adding carbon footprint entry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderActivitySpecificFields = () => {
    switch (formData.activityType) {
      case 'CLOUD_USAGE':
        return (
          <div className="activity-fields">
            <h4>☁️ Cloud Usage Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Cloud Provider</label>
                <select 
                  name="cloudProvider" 
                  value={formData.cloudProvider}
                  onChange={handleInputChange}
                >
                  <option value="">Select Provider</option>
                  <option value="AWS">Amazon Web Services</option>
                  <option value="Google Cloud">Google Cloud Platform</option>
                  <option value="Azure">Microsoft Azure</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Compute Hours</label>
                <input
                  type="number"
                  step="0.1"
                  name="computeHours"
                  value={formData.computeHours}
                  onChange={handleInputChange}
                  placeholder="e.g., 24.5"
                />
              </div>
              <div className="form-group">
                <label>Storage (GB)</label>
                <input
                  type="number"
                  step="0.1"
                  name="storageGB"
                  value={formData.storageGB}
                  onChange={handleInputChange}
                  placeholder="e.g., 100"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data Transfer (GB)</label>
                <input
                  type="number"
                  step="0.1"
                  name="dataTransferGB"
                  value={formData.dataTransferGB}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                />
              </div>
            </div>
          </div>
        );

      case 'CICD_USAGE':
        return (
          <div className="activity-fields">
            <h4>🔧 CI/CD Usage Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>CI/CD Platform</label>
                <select 
                  name="cicdPlatform" 
                  value={formData.cicdPlatform}
                  onChange={handleInputChange}
                >
                  <option value="">Select Platform</option>
                  <option value="Jenkins">Jenkins</option>
                  <option value="GitHub Actions">GitHub Actions</option>
                  <option value="GitLab CI">GitLab CI</option>
                  <option value="Azure DevOps">Azure DevOps</option>
                  <option value="CircleCI">CircleCI</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Build Minutes</label>
                <input
                  type="number"
                  name="buildMinutes"
                  value={formData.buildMinutes}
                  onChange={handleInputChange}
                  placeholder="e.g., 120"
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="e.g., My Web App"
                />
              </div>
            </div>
          </div>
        );

      case 'EMAIL_USAGE':
        return (
          <div className="activity-fields">
            <h4>📧 Email Usage Details</h4>
            <div className="form-row">
              <div className="form-group">
                <label>Number of Emails</label>
                <input
                  type="number"
                  name="emailCount"
                  value={formData.emailCount}
                  onChange={handleInputChange}
                  placeholder="e.g., 50"
                />
              </div>
              <div className="form-group">
                <label>Attachment Size (MB)</label>
                <input
                  type="number"
                  step="0.1"
                  name="attachmentSizeMB"
                  value={formData.attachmentSizeMB}
                  onChange={handleInputChange}
                  placeholder="e.g., 25.5"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="activity-fields">
            <p>Select an activity type to see specific fields.</p>
          </div>
        );
    }
  };

  return (
    <div className="tracking-form">
      <h2>📊 Track New Activity</h2>
      
      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Activity Type *</label>
          <select 
            name="activityType" 
            value={formData.activityType}
            onChange={handleInputChange}
            required
          >
            <option value="CLOUD_USAGE">☁️ Cloud Usage</option>
            <option value="CICD_USAGE">🔧 CI/CD Usage</option>
            <option value="EMAIL_USAGE">📧 Email Usage</option>
            <option value="DIGITAL_STORAGE">💾 Digital Storage</option>
            <option value="VIDEO_STREAMING">📺 Video Streaming</option>
            <option value="WEB_BROWSING">🌐 Web Browsing</option>
            <option value="OTHER">📱 Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Description *</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Describe this activity..."
            required
          />
        </div>

        {renderActivitySpecificFields()}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? '⏳ Adding...' : '✅ Add Entry'}
        </button>
      </form>

      <div className="summary-generator-section">
        <h4>📊 Generate Summary</h4>
        <p>After adding entries, generate a daily summary to track your progress:</p>
        <QuickSummaryButton 
          userId={formData.userId} 
          variant="success"
          onSummaryGenerated={() => {
            console.log('Summary generated from tracking form');
          }}
        />
      </div>
    </div>
  );
};

export default TrackingForm;