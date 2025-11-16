export const validators = {
    isValidEmail(email) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      return emailRegex.test(email);
    },
  
    isValidPassword(password) {
      // At least 6 characters
      return password && password.length >= 6;
    },
  
    isValidPrice(price) {
      return typeof price === 'number' && price >= 0;
    },
  
    isValidQuantity(quantity) {
      return typeof quantity === 'number' && quantity >= 0 && Number.isInteger(quantity);
    },
  
    validateSweetData(data) {
      const errors = [];
  
      if (!data.name || data.name.trim().length === 0) {
        errors.push('Sweet name is required');
      }
  
      if (!data.category) {
        errors.push('Category is required');
      }
  
      const validCategories = ['chocolate', 'candy', 'gummy', 'lollipop', 'hard-candy', 'other'];
      if (data.category && !validCategories.includes(data.category)) {
        errors.push('Invalid category');
      }
  
      if (data.price === undefined || data.price === null) {
        errors.push('Price is required');
      } else if (!this.isValidPrice(data.price)) {
        errors.push('Price must be a positive number');
      }
  
      if (data.quantity !== undefined && !this.isValidQuantity(data.quantity)) {
        errors.push('Quantity must be a positive integer');
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    },
  
    validateUserData(data) {
      const errors = [];
  
      if (!data.name || data.name.trim().length === 0) {
        errors.push('Name is required');
      }
  
      if (!data.email) {
        errors.push('Email is required');
      } else if (!this.isValidEmail(data.email)) {
        errors.push('Invalid email format');
      }
  
      if (!data.password) {
        errors.push('Password is required');
      } else if (!this.isValidPassword(data.password)) {
        errors.push('Password must be at least 6 characters');
      }
  
      return {
        isValid: errors.length === 0,
        errors
      };
    }
  };