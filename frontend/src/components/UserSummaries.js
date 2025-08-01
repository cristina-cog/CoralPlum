import React, { useState, useEffect, useCallback } from 'react';
import { getActivityLabel, getActivityIcon } from '../utils/activityTypeMap';
import { carbonAPI } from '../services/api';
import SummaryGenerator from './SummaryGenerator';

const TREE_EQUIVALENT_FACTOR = 21; // 1 tree absorbs ~21 kg CO₂/year

const UserSummaries = ({ userId, unit = 'kg' }) => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserSummaries = useCallback(async () => {
    try {
      setLoading(true);
      const response = await carbonAPI.getUserSummaries(userId);
      setSummaries(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching user summaries:', error);
      setError('Failed to load summaries');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchUserSummaries();
  }, [fetchUserSummaries]);

  // Use centralized mapping for label and icon
  const formatActivityType = (type) => `${getActivityIcon(type)} ${getActivityLabel(type)}`;

  const formatCarbonAmount = (carbonKg) => {
    if (unit === 'kg') {
      return `${carbonKg.toFixed(4)} kg CO₂`;
    } else {
      return `${(carbonKg / TREE_EQUIVALENT_FACTOR).toFixed(2)} Trees`;
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="user-summaries loading">
        <h3>📊 Carbon Footprint Summaries</h3>
        <p>Loading summaries...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-summaries error">
        <h3>📊 Carbon Footprint Summaries</h3>
        <p className="error-message">{error}</p>
        <button onClick={fetchUserSummaries} className="retry-btn">
          🔄 Retry
        </button>
      </div>
    );
  }

  if (summaries.length === 0) {
    return (
      <div className="user-summaries empty">
        <div className="section-header">
          <h3>📊 Carbon Footprint Summaries</h3>
          <button onClick={fetchUserSummaries} className="refresh-btn">
            🔄 Refresh
          </button>
        </div>

        <SummaryGenerator 
          userId={userId} 
          onSummaryGenerated={fetchUserSummaries}
        />
        
        <p>No daily summaries available yet. Generate your first summary to see historical data!</p>
      </div>
    );
  }

  return (
    <div className="user-summaries">
      <div className="section-header">
        <h3>📊 Carbon Footprint Summaries</h3>
        <button onClick={fetchUserSummaries} className="refresh-btn">
          🔄 Refresh
        </button>
      </div>

      <SummaryGenerator 
        userId={userId} 
        onSummaryGenerated={fetchUserSummaries}
      />

      <div className="summaries-list">
        {summaries.map(summary => (
          <div key={summary.id} className="summary-card">
            <div className="summary-header">
              <div className="summary-date">
                {formatDate(summary.summaryDate)}
              </div>
              <div className="summary-total">
                {formatCarbonAmount(summary.totalCarbonEmissionKg)}
              </div>
            </div>

            {summary.carbonByActivityType && Object.keys(summary.carbonByActivityType).length > 0 && (
              <div className="summary-breakdown">
                <h4>Activity Breakdown:</h4>
                <div className="activity-list">
                  {Object.entries(summary.carbonByActivityType)
                    .sort(([,a], [,b]) => b - a)
                    .map(([activityType, carbonValue]) => (
                      <div key={activityType} className="activity-item">
                        <span className="activity-name">
                          {formatActivityType(activityType)}
                        </span>
                        <span className="activity-value">
                          {formatCarbonAmount(carbonValue)}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {summaries.length > 0 && (
        <div className="summaries-stats">
          <div className="stat-item">
            <span className="stat-label">Total Summaries:</span>
            <span className="stat-value">{summaries.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Average Daily Carbon:</span>
            <span className="stat-value">
              {formatCarbonAmount(
                summaries.reduce((sum, s) => sum + s.totalCarbonEmissionKg, 0) / summaries.length
              )}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserSummaries;
