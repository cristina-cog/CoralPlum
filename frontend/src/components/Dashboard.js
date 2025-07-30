import React, { useState, useEffect } from 'react';
import { carbonAPI } from '../services/api';
import CarbonChart from './CarbonChart';
import ActivityBreakdown from './ActivityBreakdown';
import RecentEntries from './RecentEntries';

const Dashboard = () => {
  const [totalCarbon, setTotalCarbon] = useState(0);
  const [carbonBreakdown, setCarbonBreakdown] = useState({});
  const [recentEntries, setRecentEntries] = useState([]);
  const [loading, setLoading] = useState(true);
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
      <h1>🌱 Digital Carbon Footprint Dashboard</h1>
      
      <div className="dashboard-summary">
        <div className="summary-card total-carbon">
          <h3>Total Carbon Footprint</h3>
          <div className="carbon-amount">
            <span className="value">{totalCarbon.toFixed(4)}</span>
            <span className="unit">kg CO₂</span>
          </div>
          <p className="equivalent">≈ {(totalCarbon * 2.2).toFixed(2)} lbs CO₂</p>
        </div>
        
        <div className="summary-card entries-count">
          <h3>Total Entries</h3>
          <div className="count">{recentEntries.length}</div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="chart-section">
          <CarbonChart carbonBreakdown={carbonBreakdown} />
        </div>
        
        <div className="breakdown-section">
          <ActivityBreakdown carbonBreakdown={carbonBreakdown} />
        </div>
      </div>

      <div className="recent-section">
        <RecentEntries entries={recentEntries} onRefresh={fetchDashboardData} />
      </div>
    </div>
  );
};

export default Dashboard;