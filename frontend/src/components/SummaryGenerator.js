import React, { useState } from 'react';
import { carbonAPI } from '../services/api';

const SummaryGenerator = ({ userId, onSummaryGenerated }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const generateTodaysSummary = async () => {
    try {
      setIsGenerating(true);
      setMessage('');
      
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      await carbonAPI.generateDailySummary(userId, today);
      
      setMessage('✅ Daily summary generated successfully!');
      
      if (onSummaryGenerated) {
        onSummaryGenerated();
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setMessage('❌ Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const generateCustomSummary = async (date) => {
    try {
      setIsGenerating(true);
      setMessage('');
      
      await carbonAPI.generateDailySummary(userId, date);
      
      setMessage(`✅ Summary for ${date} generated successfully!`);
      
      if (onSummaryGenerated) {
        onSummaryGenerated();
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      setMessage('❌ Failed to generate summary. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCustomDateSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const date = formData.get('date');
    if (date) {
      generateCustomSummary(date);
    }
  };

  return (
    <div className="summary-generator">
      <div className="generator-header">
        <h4>🏗️ Generate Carbon Summary</h4>
        <p>Create daily summaries to track your carbon footprint over time</p>
      </div>

      {message && (
        <div className={`message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}

      <div className="generator-actions">
        <button 
          onClick={generateTodaysSummary}
          disabled={isGenerating}
          className="generate-btn primary"
        >
          {isGenerating ? '⏳ Generating...' : '📅 Generate Today\'s Summary'}
        </button>

        <div className="custom-date-section">
          <h5>Generate for Specific Date:</h5>
          <form onSubmit={handleCustomDateSubmit} className="date-form">
            <input 
              type="date" 
              name="date"
              max={new Date().toISOString().split('T')[0]}
              required
              className="date-input"
            />
            <button 
              type="submit"
              disabled={isGenerating}
              className="generate-btn secondary"
            >
              {isGenerating ? '⏳ Generating...' : '🎯 Generate'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SummaryGenerator;
