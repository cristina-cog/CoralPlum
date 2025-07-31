import React, { useState, useEffect } from 'react';
import { carbonAPI } from '../services/api';
import CarbonChart from './CarbonChart';
import ActivityBreakdown from './ActivityBreakdown';
import RecentEntries from './RecentEntries';
import SummaryGenerator from './SummaryGenerator';

const TREE_EQUIVALENT_FACTOR = 21; // 1 tree absorbs ~21 kg CO₂/year

const Dashboard = () => {
  const [totalCarbon, setTotalCarbon] = useState(0);
  const [carbonBreakdown, setCarbonBreakdown] = useState({});
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [unit, setUnit] = useState('kg'); // 'kg' or 'trees'
  const userId = 'demo-user'; // In a real app, this would come from authentication

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all dashboard data in parallel
      const [totalResponse, breakdownResponse, entriesResponse] = await Promise.all([
        carbonAPI.getTotalCarbonEmission(userId),
        carbonAPI.getCarbonBreakdown(userId),
        carbonAPI.getUserEntries(userId)
      ]);

      setTotalCarbon(totalResponse.data);
      setCarbonBreakdown(breakdownResponse.data);
      setRecentEntries(entriesResponse.data.slice(0, 5)); // Show only last 5 entries
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <h2>Loading Dashboard...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header-centered">
        <h1 style={{ margin: 0 }}>🌱 Digital Carbon Footprint Dashboard</h1>
        <div className="unit-toggle-container">
          <button
            className={`refresh-btn unit-toggle-btn${unit === 'kg' ? ' active' : ''}`}
            onClick={() => setUnit('kg')}
            aria-pressed={unit === 'kg'}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            Carbon Emission
          </button>
          <button
            className={`refresh-btn unit-toggle-btn${unit === 'trees' ? ' active' : ''}`}
            onClick={() => setUnit('trees')}
            aria-pressed={unit === 'trees'}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0, marginLeft: '-4px' }}
          >
            Equivalent Trees
          </button>
        </div>
      </div>

      <div className="dashboard-summary">
        <div className="summary-card total-carbon">
          <h3>Total Carbon Footprint</h3>
          <div className="carbon-amount">
            <span className="value">
              {unit === 'kg'
                ? totalCarbon.toFixed(4)
                : (totalCarbon / TREE_EQUIVALENT_FACTOR).toFixed(2)}
            </span>
            <span className="unit">
              {unit === 'kg' ? 'kg CO₂' : 'Trees'}
            </span>
          </div>
          <p className="equivalent">
            {unit === 'kg'
              ? `≈ ${(totalCarbon * 2.2).toFixed(2)} lbs CO₂`
              : `1 tree = ~${TREE_EQUIVALENT_FACTOR} kg CO₂/year`}
          </p>
        </div>

        <div className="summary-card entries-count">
          <h3>Total Entries</h3>
          <div className="count">{recentEntries.length}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <CarbonChart carbonBreakdown={carbonBreakdown} unit={unit} setUnit={setUnit} />
        </div>

        <div className="breakdown-section">
          <ActivityBreakdown carbonBreakdown={carbonBreakdown} unit={unit} />
        </div>
      </div>

      <div className="recent-section">
        <RecentEntries entries={recentEntries} onRefresh={fetchDashboardData} unit={unit} />
      </div>

      <div className="summary-generator-section">
        <SummaryGenerator 
          userId={userId} 
          onSummaryGenerated={() => {
            // Optionally refresh dashboard data after summary generation
            console.log('Summary generated successfully');
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;