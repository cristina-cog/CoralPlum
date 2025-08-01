import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title
);

const TREE_EQUIVALENT_FACTOR = 21; // 1 tree absorbs ~21 kg CO₂/year

const CarbonChart = ({ carbonBreakdown, unit, setUnit }) => {
  const activityTypes = Object.keys(carbonBreakdown);
  const carbonValues = Object.values(carbonBreakdown);

  // Convert values if needed
  const displayValues = unit === 'kg'
    ? carbonValues
    : carbonValues.map(val => (val / TREE_EQUIVALENT_FACTOR).toFixed(2));

  const pieData = {
    labels: activityTypes.map(type => {
      switch(type) {
        case 'CLOUD_USAGE': return 'Cloud Usage';
        case 'CICD_USAGE': return 'CI/CD';
        case 'EMAIL_USAGE': return 'Email';
        case 'DIGITAL_STORAGE': return 'Storage';
        case 'VIDEO_STREAMING': return 'Video';
        case 'WEB_BROWSING': return 'Browsing';
        case 'SOCIAL_MEDIA': return 'Social Media';
        case 'ONLINE_MEETING': return 'Online Meeting';
        case 'OTHER': return 'Other';
        default: return type;
      }
    }),
    datasets: [
      {
        data: displayValues,
        backgroundColor: [
          '#FF6384', // Cloud Usage
          '#36A2EB', // CI/CD
          '#FFCE56', // Email
          '#4BC0C0', // Storage
          '#9966FF', // Video
          '#FF9F40', // Browsing
          '#00C49A', // Social Media
          '#FF6F61', // Online Meeting
          '#BDBDBD'  // Other
        ],
        borderWidth: 2,
        borderColor: '#fff'
      }
    ]
  };

  const barData = {
    labels: pieData.labels,
    datasets: [
      {
        label: unit === 'kg' ? 'Carbon Emission (kg CO₂)' : 'Equivalent Trees Planted',
        data: displayValues,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'Carbon Footprint by Activity Type'
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'Carbon Emissions Comparison'
      }
    }
  };

  if (activityTypes.length === 0) {
    return (
      <div className="chart-container">
        <h3>Carbon Footprint Visualization</h3>
        <p>No data available to display charts.</p>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3>
        Carbon Footprint Visualization
      </h3>
      <div className="charts-grid">
        <div className="chart-item">
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>
        <div className="chart-item">
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarbonChart;