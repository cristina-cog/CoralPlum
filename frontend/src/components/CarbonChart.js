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

const CarbonChart = ({ carbonBreakdown }) => {
  const activityTypes = Object.keys(carbonBreakdown);
  const carbonValues = Object.values(carbonBreakdown);

  const pieData = {
    labels: activityTypes.map(type => {
      switch(type) {
        case 'CLOUD_USAGE': return 'Cloud Usage';
        case 'CICD_USAGE': return 'CI/CD';
        case 'EMAIL_USAGE': return 'Email';
        case 'DIGITAL_STORAGE': return 'Storage';
        case 'VIDEO_STREAMING': return 'Video';
        case 'WEB_BROWSING': return 'Browsing';
        default: return type;
      }
    }),
    datasets: [
      {
        data: carbonValues,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40',
          '#FF6384'
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
        label: 'Carbon Emission (kg CO₂)',
        data: carbonValues,
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
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
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'kg CO₂'
        }
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
      <h3>Carbon Footprint Visualization</h3>
      
      <div className="charts-grid">
        <div className="chart-item">
          <div className="chart-wrapper" style={{ height: '300px' }}>
            <Pie data={pieData} options={chartOptions} />
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