import React from 'react';

const ActivityBreakdown = ({ carbonBreakdown }) => {
  const formatActivityType = (type) => {
    switch(type) {
      case 'CLOUD_USAGE': return '☁️ Cloud Usage';
      case 'CICD_USAGE': return '🔧 CI/CD';
      case 'EMAIL_USAGE': return '📧 Email';
      case 'DIGITAL_STORAGE': return '💾 Storage';
      case 'VIDEO_STREAMING': return '📺 Video';
      case 'WEB_BROWSING': return '🌐 Browsing';
      default: return `📱 ${type}`;
    }
  };

  const getActivityDescription = (type) => {
    switch(type) {
      case 'CLOUD_USAGE': return 'Computing, storage, and data transfer';
      case 'CICD_USAGE': return 'Build pipelines and deployments';
      case 'EMAIL_USAGE': return 'Email sending and attachments';
      case 'DIGITAL_STORAGE': return 'File storage and backup';
      case 'VIDEO_STREAMING': return 'Video calls and streaming';
      case 'WEB_BROWSING': return 'Web browsing and downloads';
      default: return 'Other digital activities';
    }
  };

  const totalCarbon = Object.values(carbonBreakdown).reduce((sum, value) => sum + value, 0);

  const sortedActivities = Object.entries(carbonBreakdown)
    .sort(([,a], [,b]) => b - a);

  if (sortedActivities.length === 0) {
    return (
      <div className="activity-breakdown">
        <h3>Activity Breakdown</h3>
        <p>No activities tracked yet.</p>
      </div>
    );
  }

  return (
    <div className="activity-breakdown">
      <h3>Activity Breakdown</h3>
      
      <div className="breakdown-list">
        {sortedActivities.map(([activityType, carbonValue]) => {
          const percentage = totalCarbon > 0 ? (carbonValue / totalCarbon * 100) : 0;
          
          return (
            <div key={activityType} className="breakdown-item">
              <div className="activity-header">
                <span className="activity-name">
                  {formatActivityType(activityType)}
                </span>
                <span className="activity-value">
                  {carbonValue.toFixed(4)} kg CO₂
                </span>
              </div>
              
              <div className="activity-description">
                {getActivityDescription(activityType)}
              </div>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              
              <div className="activity-percentage">
                {percentage.toFixed(1)}% of total
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="breakdown-summary">
        <strong>Total: {totalCarbon.toFixed(4)} kg CO₂</strong>
      </div>
    </div>
  );
};

export default ActivityBreakdown;