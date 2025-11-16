/**
 * Format price to currency string
 * @param {number} price - Price to format
 * @returns {string} Formatted price string
 */
export const formatPrice = (price) => {
  return `$${Number(price).toFixed(2)}`;
};

/**
 * Format date string to readable format
 * @param {string} dateString - Date string to format
 * @returns {string} Formatted date string
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Capitalize first letter of a string
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeFirst = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate price value
 * @param {number|string} price - Price to validate
 * @returns {boolean} True if valid price
 */
export const isValidPrice = (price) => {
  return !isNaN(price) && Number(price) >= 0;
};

/**
 * Validate quantity value
 * @param {number|string} quantity - Quantity to validate
 * @returns {boolean} True if valid quantity
 */
export const isValidQuantity = (quantity) => {
  return Number.isInteger(Number(quantity)) && Number(quantity) >= 0;
};

/**
 * Get stock status based on quantity
 * @param {number} quantity - Current quantity
 * @returns {Object} Stock status object with status, label, and color
 */
export const getStockStatus = (quantity) => {
  if (quantity === 0) {
    return { status: 'out', label: 'Out of Stock', color: 'red' };
  }
  if (quantity <= 10) {
    return { status: 'low', label: 'Low Stock', color: 'orange' };
  }
  return { status: 'good', label: 'In Stock', color: 'green' };
};

/**
 * Handle API errors and return user-friendly message
 * @param {Error} error - Error object from API call
 * @returns {string} User-friendly error message
 */
export const handleApiError = (error) => {
  if (error.response) {
    return error.response.data?.message || 'An error occurred';
  } else if (error.request) {
    return 'Network error. Please check your connection.';
  } else {
    return 'An unexpected error occurred';
  }
};

/**
 * Debounce function to limit function calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Truncate string to specified length
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncate = (str, maxLength = 100) => {
  if (!str || str.length <= maxLength) return str;
  return str.substring(0, maxLength) + '...';
};

