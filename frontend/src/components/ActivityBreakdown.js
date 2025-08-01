import React from 'react';
import { getActivityLabel, getActivityIcon } from '../utils/activityTypeMap';

const TREE_EQUIVALENT_FACTOR = 21;
const ActivityBreakdown = ({ carbonBreakdown, unit }) => {
  // Use centralized mapping for label and icon
  const formatActivityType = (type) => `${getActivityIcon(type)} ${getActivityLabel(type)}`;

  const getActivityDescription = (type) => {
    switch(type) {
      case 'CLOUD_USAGE': return 'Computing, storage, and data transfer';
      case 'CICD_USAGE': return 'Build pipelines and deployments';
      case 'EMAIL_USAGE': return 'Email sending and attachments';
      case 'DIGITAL_STORAGE': return 'File storage and backup';
      case 'VIDEO_STREAMING': return 'Video calls and streaming';
      case 'WEB_BROWSING': return 'Web browsing and downloads';
      case 'SOCIAL_MEDIA': return 'Social media posts and browsing';
      case 'ONLINE_MEETING': return 'Online meetings and video calls';
      case 'OTHER': return 'Other digital activities';
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
      <div className="breakdown-list" style={{ maxHeight: '600px', overflowY: 'auto' }}>
        {sortedActivities.map(([activityType, carbonValue]) => {
          const percentage = totalCarbon > 0 ? (carbonValue / totalCarbon * 100) : 0;
          const displayValue = unit === 'kg'
            ? carbonValue.toFixed(4) + ' kg CO₂'
            : (carbonValue / TREE_EQUIVALENT_FACTOR).toFixed(2) + ' Trees';
          return (
            <div key={activityType} className="breakdown-item">
              <div className="activity-header">
                <span className="activity-name">
                  {formatActivityType(activityType)}
                </span>
                <span className="activity-value">
                  {displayValue}
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
        <strong>
          Total: {unit === 'kg' ? totalCarbon.toFixed(4) + ' kg CO₂' : (totalCarbon / TREE_EQUIVALENT_FACTOR).toFixed(2) + ' Trees'}
        </strong>
      </div>
    </div>
  );
};

export default ActivityBreakdown;