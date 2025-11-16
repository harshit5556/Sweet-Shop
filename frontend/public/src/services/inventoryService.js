import api from './api';

export const inventoryService = {
  async purchaseSweet(id, quantity) {
    const response = await api.post(`/sweets/${id}/purchase`, { quantity });
    return response.data;
  },

  async restockSweet(id, quantity) {
    const response = await api.post(`/sweets/${id}/restock`, { quantity });
    return response.data;
  }
};