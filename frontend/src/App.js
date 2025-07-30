import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import TrackingForm from './components/TrackingForm';
import './App.css';

function App() {
  const [refreshDashboard, setRefreshDashboard] = useState(0);

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