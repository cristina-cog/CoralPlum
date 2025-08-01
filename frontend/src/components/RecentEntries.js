import React from 'react';
import { getActivityLabel, getActivityIcon } from '../utils/activityTypeMap';

const TREE_EQUIVALENT_FACTOR = 21;
const RecentEntries = ({ entries, onRefresh, unit }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Use centralized mapping for label and icon
  const formatActivityType = (type) => `${getActivityIcon(type)} ${getActivityLabel(type)}`;

  if (entries.length === 0) {
    return (
      <div className="recent-entries">
        <h3>Recent Activities</h3>
        <p>No activities tracked yet. Start by adding your first carbon footprint entry!</p>
      </div>
    );
  }

  return (
    <div className="recent-entries">
      <div className="section-header">
        <h3>Recent Activities</h3>
        <button onClick={onRefresh} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>
      
      <div className="entries-list">
        {entries.map(entry => (
          <div key={entry.id} className="entry-item">
            <div className="entry-header">
                <span className="activity-type">
                  {formatActivityType(entry.activityType)}
                </span>
              <span className="carbon-amount">
                {unit === 'kg'
                  ? entry.carbonEmissionKg.toFixed(4) + ' kg CO₂'
                  : (entry.carbonEmissionKg / TREE_EQUIVALENT_FACTOR).toFixed(2) + ' Trees'}
              </span>
            </div>
            
            <div className="entry-description">
              {entry.description}
            </div>
            
            <div className="entry-details">
              {entry.cloudProvider && (
                <span className="detail-tag">☁️ {entry.cloudProvider}</span>
              )}
              {entry.cicdPlatform && (
                <span className="detail-tag">🔧 {entry.cicdPlatform}</span>
              )}
              {entry.computeHours && (
                <span className="detail-tag">⏱️ {entry.computeHours}h compute</span>
              )}
              {entry.buildMinutes && (
                <span className="detail-tag">🔨 {entry.buildMinutes}min build</span>
              )}
              {entry.emailCount && (
                <span className="detail-tag">📧 {entry.emailCount} emails</span>
              )}
            </div>
            
            <div className="entry-timestamp">
              {formatDate(entry.timestamp)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentEntries;