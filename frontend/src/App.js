import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TrackingForm from './components/TrackingForm';
import UserSummaries from './components/UserSummaries';
import DateRangeAnalytics from './components/DateRangeAnalytics';
import './App.css';

function App() {
  const [refreshDashboard, setRefreshDashboard] = useState(0);
  const userId = 'demo-user'; // In a real app, this would come from authentication

  const handleEntryAdded = () => {
    setRefreshDashboard(prev => prev + 1);
  };

  return (
    <Router>
      <div className="App">
        <header className="app-header">
          <div className="header-content">
            <h1 className="app-title">
              🌱 Digital Carbon Tracker
            </h1>
            <nav className="app-nav">
              <Link to="/" className="nav-link">📊 Dashboard</Link>
              <Link to="/track" className="nav-link">➕ Track Activity</Link>
              <Link to="/summaries" className="nav-link">📈 Summaries</Link>
              <Link to="/analytics" className="nav-link">📅 Date Analytics</Link>
            </nav>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={<Dashboard key={refreshDashboard} />} 
            />
            <Route 
              path="/track" 
              element={<TrackingForm onEntryAdded={handleEntryAdded} />} 
            />
            <Route 
              path="/summaries" 
              element={<UserSummaries userId={userId} />} 
            />
            <Route 
              path="/analytics" 
              element={<DateRangeAnalytics userId={userId} />} 
            />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>
            🌍 Help reduce your digital carbon footprint • 
            Built with Spring Boot & React
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;