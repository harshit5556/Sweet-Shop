import { useState } from 'react';
import { inventoryService } from '../services/inventoryService';

export const useInventory = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const purchase = async (id, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryService.purchaseSweet(id, quantity);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Purchase failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const restock = async (id, quantity) => {
    try {
      setLoading(true);
      setError(null);
      const response = await inventoryService.restockSweet(id, quantity);
      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Restock failed';
      setError(errorMsg);
      throw new Error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return { purchase, restock, loading, error };
};
