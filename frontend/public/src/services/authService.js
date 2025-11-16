import api from './api';

export const authService = {
  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  isAdmin() {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
};


// ===== frontend/src/services/sweetService.js =====
import api from './api';

export const sweetService = {
  async getAllSweets() {
    const response = await api.get('/sweets');
    return response.data;
  },

  async getSweetById(id) {
    const response = await api.get(`/sweets/${id}`);
    return response.data;
  },

  async searchSweets(filters) {
    const params = new URLSearchParams();
    if (filters.name) params.append('name', filters.name);
    if (filters.category) params.append('category', filters.category);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);

    const response = await api.get(`/sweets/search?${params.toString()}`);
    return response.data;
  },

  async createSweet(sweetData) {
    const response = await api.post('/sweets', sweetData);
    return response.data;
  },

  async updateSweet(id, sweetData) {
    const response = await api.put(`/sweets/${id}`, sweetData);
    return response.data;
  },

  async deleteSweet(id) {
    const response = await api.delete(`/sweets/${id}`);
    return response.data;
  }
};

