import React, { useState, useCallback } from 'react';
import { getActivityLabel, getActivityIcon } from '../utils/activityTypeMap';
import { carbonAPI } from '../services/api';
import { createDateRange } from '../utils/dateUtils';

const TREE_EQUIVALENT_FACTOR = 21; // 1 tree absorbs ~21 kg CO₂/year

const DateRangeAnalytics = ({ userId }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [totalEmission, setTotalEmission] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('kg'); // 'kg' or 'trees'

  const formatCarbonAmount = (carbonKg) => {
    if (unit === 'kg') {
      return `${carbonKg.toFixed(4)} kg CO₂`;
    } else {
      return `${(carbonKg / TREE_EQUIVALENT_FACTOR).toFixed(2)} Trees`;
    }
  };

  // Use centralized mapping for label and icon
  const formatActivityType = (type) => `${getActivityIcon(type)} ${getActivityLabel(type)}`;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const fetchDateRangeData = useCallback(async () => {
    if (!startDate || !endDate) {
      setError('Please select both start and end dates');
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      setError('Start date must be before end date');
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Convert dates to the format expected by backend using utility function
      const dateRange = createDateRange(startDate, endDate);

      // Fetch both total emission and entries for the date range
      const [totalResponse, entriesResponse] = await Promise.all([
        carbonAPI.getTotalCarbonEmissionByDateRange(userId, dateRange.start, dateRange.end),
        carbonAPI.getUserEntriesByDateRange(userId, dateRange.start, dateRange.end)
      ]);

      setTotalEmission(totalResponse.data);
      setEntries(entriesResponse.data);

    } catch (error) {
      console.error('Error fetching date range data:', error);
      setError('Failed to fetch data for the selected date range');
    } finally {
      setLoading(false);
    }
  }, [userId, startDate, endDate]);

  const getQuickDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    setStartDate(start.toISOString().split('T')[0]);
    setEndDate(end.toISOString().split('T')[0]);
  };

  const clearResults = () => {
    setTotalEmission(null);
    setEntries([]);
    setError('');
  };

  return (
    <div className="date-range-analytics">
      <div className="section-header">
        <h3>📅 Date Range Analytics</h3>
        <p>Analyze your carbon footprint for specific time periods</p>
      </div>

      <div className="date-range-controls">
        <div className="date-inputs">
          <div className="input-group">
            <label htmlFor="start-date">Start Date:</label>
            <input
              id="start-date"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="end-date">End Date:</label>
            <input
              id="end-date"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>

        <div className="quick-actions">
          <h4>Quick Select:</h4>
          <div className="quick-buttons">
            <button 
              className="quick-btn"
              onClick={() => getQuickDateRange(7)}
            >
              Last 7 Days
            </button>
            <button 
              className="quick-btn"
              onClick={() => getQuickDateRange(30)}
            >
              Last 30 Days
            </button>
            <button 
              className="quick-btn"
              onClick={() => getQuickDateRange(90)}
            >
              Last 3 Months
            </button>
            <button 
              className="quick-btn"
              onClick={() => getQuickDateRange(365)}
            >
              Last Year
            </button>
          </div>
        </div>

        <div className="action-buttons">
          <button 
            className="analyze-btn"
            onClick={fetchDateRangeData}
            disabled={loading || !startDate || !endDate}
          >
            {loading ? '🔄 Analyzing...' : '🔍 Analyze Range'}
          </button>
          
          {(totalEmission !== null || entries.length > 0) && (
            <button 
              className="clear-btn"
              onClick={clearResults}
            >
              🗑️ Clear Results
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="error-message">
          ❌ {error}
        </div>
      )}

      {totalEmission !== null && (
        <div className="analytics-results">
          <div className="total-emission-card">
            <div className="card-header">
              <h4>📊 Total Carbon Footprint</h4>
              <div className="unit-toggle">
                <button
                  className={`unit-btn ${unit === 'kg' ? 'active' : ''}`}
                  onClick={() => setUnit('kg')}
                >
                  kg CO₂
                </button>
                <button
                  className={`unit-btn ${unit === 'trees' ? 'active' : ''}`}
                  onClick={() => setUnit('trees')}
                >
                  Trees
                </button>
              </div>
            </div>
            
            <div className="emission-value">
              <span className="value">
                {unit === 'kg'
                  ? totalEmission.toFixed(4)
                  : (totalEmission / TREE_EQUIVALENT_FACTOR).toFixed(2)}
              </span>
              <span className="unit-label">
                {unit === 'kg' ? 'kg CO₂' : 'Trees'}
              </span>
            </div>

            <div className="date-range-info">
              <span>From {new Date(startDate).toLocaleDateString()} to {new Date(endDate).toLocaleDateString()}</span>
            </div>

            <div className="additional-info">
              <div className="info-item">
                <span className="label">Equivalent in pounds:</span>
                <span className="value">{(totalEmission * 2.2).toFixed(2)} lbs CO₂</span>
              </div>
              <div className="info-item">
                <span className="label">Daily average:</span>
                <span className="value">
                  {(() => {
                    const daysDiff = Math.max(1, Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)) + 1);
                    return formatCarbonAmount(totalEmission / daysDiff);
                  })()}
                </span>
              </div>
            </div>
          </div>

          {entries.length > 0 && (
            <div className="entries-breakdown">
              <div className="breakdown-header">
                <h4>📋 Activity Breakdown ({entries.length} entries)</h4>
              </div>
              
              <div className="entries-list">
                {entries.map(entry => (
                  <div key={entry.id} className="entry-item">
                    <div className="entry-header">
                        <span className="activity-type">
                          {formatActivityType(entry.activityType)}
                        </span>
                      <span className="carbon-amount">
                        {formatCarbonAmount(entry.carbonEmissionKg)}
                      </span>
                    </div>
                    
                    <div className="entry-description">
                      {entry.description}
                    </div>
                    
                    <div className="entry-timestamp">
                      {formatDate(entry.timestamp)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="breakdown-summary">
                <h5>Summary by Activity Type:</h5>
                <div className="activity-summary">
                  {(() => {
                    const activityTotals = entries.reduce((acc, entry) => {
                      const type = entry.activityType;
                      acc[type] = (acc[type] || 0) + entry.carbonEmissionKg;
                      return acc;
                    }, {});

                    return Object.entries(activityTotals)
                      .sort(([,a], [,b]) => b - a)
                      .map(([activityType, total]) => (
                        <div key={activityType} className="activity-summary-item">
                          <span className="activity-name">
                            {formatActivityType(activityType)}
                          </span>
                          <span className="activity-total">
                            {formatCarbonAmount(total)}
                          </span>
                          <span className="activity-percentage">
                            ({((total / totalEmission) * 100).toFixed(1)}%)
                          </span>
                        </div>
                      ));
                  })()}
                </div>
              </div>
            </div>
          )}

          {entries.length === 0 && (
            <div className="no-entries">
              <h4>📭 No Activities Found</h4>
              <p>No carbon footprint entries were found for the selected date range.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DateRangeAnalytics;
