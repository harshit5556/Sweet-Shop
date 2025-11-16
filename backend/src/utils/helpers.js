export const helpers = {
    // Format response
    formatResponse(success, data = null, message = null) {
      return {
        success,
        ...(message && { message }),
        ...(data && { data })
      };
    },
  
    // Format error response
    formatError(message, statusCode = 400) {
      return {
        success: false,
        message,
        statusCode
      };
    },
  
    // Pagination helper
    paginate(page = 1, limit = 10) {
      const skip = (page - 1) * limit;
      return { skip, limit };
    },
  
    // Calculate total pages
    calculateTotalPages(totalItems, limit) {
      return Math.ceil(totalItems / limit);
    },
  
    // Sanitize user data (remove password)
    sanitizeUser(user) {
      const userObject = user.toObject ? user.toObject() : user;
      delete userObject.password;
      return userObject;
    },
  
    // Format price
    formatPrice(price) {
      return `$${price.toFixed(2)}`;
    },
  
    // Generate random string
    generateRandomString(length = 10) {
      return Math.random().toString(36).substring(2, length + 2);
    },
  
    // Check if string is valid MongoDB ObjectId
    isValidObjectId(id) {
      return /^[0-9a-fA-F]{24}$/.test(id);
    },
  
    // Sort options helper
    getSortOptions(sortBy = 'createdAt', order = 'desc') {
      return { [sortBy]: order === 'desc' ? -1 : 1 };
    }
  };