import React, { useState } from 'react';
import { carbonAPI } from '../services/api';

const QuickSummaryButton = ({ userId, onSummaryGenerated, variant = 'default' }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [message, setMessage] = useState('');

  const generateTodaysSummary = async () => {
    try {
      setIsGenerating(true);
      setMessage('');
      
      const today = new Date().toISOString().split('T')[0]; // Format: YYYY-MM-DD
      await carbonAPI.generateDailySummary(userId, today);
      
      setMessage('✅ Summary generated!');
      
      if (onSummaryGenerated) {
        onSummaryGenerated();
      }

      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error('Error generating summary:', error);
      setMessage('❌ Failed to generate');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsGenerating(false);
    }
  };

  const getButtonClass = () => {
    switch (variant) {
      case 'compact':
        return 'quick-summary-btn compact';
      case 'success':
        return 'quick-summary-btn success';
      default:
        return 'quick-summary-btn default';
    }
  };

  return (
    <div className="quick-summary-container">
      <button 
        onClick={generateTodaysSummary}
        disabled={isGenerating}
        className={getButtonClass()}
        title="Generate today's carbon footprint summary"
      >
        {isGenerating ? '⏳ Generating...' : '📊 Generate Today\'s Summary'}
      </button>
      
      {message && (
        <div className={`quick-message ${message.includes('✅') ? 'success' : 'error'}`}>
          {message}
        </div>
      )}
    </div>
  );
};

export default QuickSummaryButton;
