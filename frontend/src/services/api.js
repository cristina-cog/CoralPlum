import axios from 'axios';

const API_BASE_URL = 'http://localhost:8090/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Carbon Footprint API calls
export const carbonAPI = {
  // Create new carbon footprint entry
  createEntry: (entry) => api.post('/carbon/entries', entry),
  
  // Get user entries
  getUserEntries: (userId) => api.get(`/carbon/entries/user/${userId}`),
  
  // Get user entries by date range
  getUserEntriesByDateRange: (userId, start, end) => 
    api.get(`/carbon/entries/user/${userId}/range`, { params: { start, end } }),
  
  // Get total carbon emission
  getTotalCarbonEmission: (userId) => api.get(`/carbon/total/user/${userId}`),
  
  // Get total carbon emission by date range
  getTotalCarbonEmissionByDateRange: (userId, start, end) => 
    api.get(`/carbon/total/user/${userId}/range`, { params: { start, end } }),
  
  // Get carbon breakdown by activity type
  getCarbonBreakdown: (userId) => api.get(`/carbon/breakdown/user/${userId}`),
  
  // Generate daily summary
  generateDailySummary: (userId, date) => 
    api.post(`/carbon/summary/user/${userId}`, null, { params: { date } }),
  
  // Get user summaries
  getUserSummaries: (userId) => api.get(`/carbon/summaries/user/${userId}`),
  
  // Delete entry
  deleteEntry: (entryId) => api.delete(`/carbon/entries/${entryId}`),
};

export default api;