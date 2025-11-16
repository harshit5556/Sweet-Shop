import api from './api';

export const sweetService = {
  // Get all sweets
  async getAllSweets() {
    const response = await api.get('/sweets');
    return response.data;
  },

  // Get sweet by ID
  async getSweetById(id) {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  // Search sweets with filters
  async searchSweets(filters) {
    const params = new URLSearchParams();
    
    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const response = await api.get(`/sweets/search?${params.toString()}`);
    return response.data;
  },

  // Create new sweet (Admin only)
  async createSweet(sweetData) {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  // Update sweet (Admin only)
  async updateSweet(id, sweetData) {
    const response = await api.put(`/sweets/${id}`, sweetData);
    return response.data;
  },

  // Delete sweet (Admin only)
  async deleteSweet(id) {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  },

  // Get sweets by category
  async getSweetsByCategory(category) {
    const response = await api.get(`/sweets/search?category=${category}`);
    return response.data;
  },

  // Get low stock sweets (for admin dashboard)
  async getLowStockSweets(threshold = 10) {
    const response = await api.get('/sweets');
    const allSweets = response.data.data;
    const lowStock = allSweets.filter(sweet => sweet.quantity <= threshold);
    return { data: lowStock };
  },

  // Get out of stock sweets
  async getOutOfStockSweets() {
    const response = await api.get('/sweets');
    const allSweets = response.data.data;
    const outOfStock = allSweets.filter(sweet => sweet.quantity === 0);
    return { data: outOfStock };
  },

  // Get sweets statistics
  async getSweetsStatistics() {
    const response = await api.get('/sweets');
    const sweets = response.data.data;

    const stats = {
      total: sweets.length,
      totalValue: sweets.reduce((sum, s) => sum + (s.price * s.quantity), 0),
      avgPrice: sweets.length > 0 
        ? sweets.reduce((sum, s) => sum + s.price, 0) / sweets.length 
        : 0,
      categories: sweets.reduce((acc, sweet) => {
        acc[sweet.category] = (acc[sweet.category] || 0) + 1;
        return acc;
      }, {}),
      outOfStock: sweets.filter(s => s.quantity === 0).length,
      lowStock: sweets.filter(s => s.quantity > 0 && s.quantity <= 10).length,
      inStock: sweets.filter(s => s.quantity > 10).length
    };

    return { data: stats };
  }
};