export const CATEGORIES = [
    'chocolate',
    'candy',
    'gummy',
    'lollipop',
    'hard-candy',
    'other'
  ];
  
  export const USER_ROLES = {
    USER: 'user',
    ADMIN: 'admin'
  };
  
  export const API_ENDPOINTS = {
    AUTH: {
      REGISTER: '/auth/register',
      LOGIN: '/auth/login'
    },
    SWEETS: {
      BASE: '/sweets',
      SEARCH: '/sweets/search',
      PURCHASE: (id) => `/sweets/${id}/purchase`,
      RESTOCK: (id) => `/sweets/${id}/restock`
    }
  };
  
  export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again.'
  };
  
  
  // ===== frontend/src/utils/helpers.js =====
  export const formatPrice = (price) => {
    return `$${Number(price).toFixed(2)}`;
  };
  
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  export const isValidEmail = (email) => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    return emailRegex.test(email);
  };
  
  export const isValidPrice = (price) => {
    return !isNaN(price) && Number(price) >= 0;
  };
  
  export const isValidQuantity = (quantity) => {
    return Number.isInteger(Number(quantity)) && Number(quantity) >= 0;
  };
  
  export const getStockStatus = (quantity) => {
    if (quantity === 0) return { status: 'out', label: 'Out of Stock', color: 'red' };
    if (quantity <= 10) return { status: 'low', label: 'Low Stock', color: 'orange' };
    return { status: 'good', label: 'In Stock', color: 'green' };
  };
  
  export const handleApiError = (error) => {
    if (error.response) {
      return error.response.data.message || 'An error occurred';
    } else if (error.request) {
      return 'Network error. Please check your connection.';
    } else {
      return 'An unexpected error occurred';
    }
  };
  