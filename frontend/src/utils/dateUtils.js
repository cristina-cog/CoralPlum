// Date utility functions for API compatibility

/**
 * Converts a JavaScript Date object to the format expected by the backend
 * Backend expects: yyyy-MM-ddTHH:mm:ss (without timezone and milliseconds)
 * @param {Date} date - JavaScript Date object
 * @returns {string} - Formatted date string for backend
 */
export const formatDateForBackend = (date) => {
  return date.toISOString().slice(0, 19);
};

/**
 * Creates a date range for API calls
 * @param {string} startDateString - Start date in YYYY-MM-DD format
 * @param {string} endDateString - End date in YYYY-MM-DD format
 * @returns {object} - Object with formatted start and end dates
 */
export const createDateRange = (startDateString, endDateString) => {
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString + 'T23:59:59');
  
  return {
    start: formatDateForBackend(startDate),
    end: formatDateForBackend(endDate)
  };
};

/**
 * Creates a date range for the last N days
 * @param {number} days - Number of days to go back
 * @returns {object} - Object with formatted start and end dates
 */
export const createLastNDaysRange = (days) => {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - days);
  
  return {
    start: formatDateForBackend(start),
    end: formatDateForBackend(end)
  };
};
