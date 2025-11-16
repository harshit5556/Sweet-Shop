import { useState, useEffect } from 'react';
import { sweetService } from '../services/sweetService';

export const useSweets = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSweets = async () => {
    try {
      setLoading(true);
      const response = await sweetService.getAllSweets();
      setSweets(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch sweets');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const refreshSweets = () => {
    fetchSweets();
  };

  return { sweets, loading, error, refreshSweets };
};
