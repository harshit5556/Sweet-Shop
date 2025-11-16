import React, { useState, useEffect } from 'react';
import { sweetService } from '../services/sweetService';
import SweetList from '../components/sweets/SweetList';
import SweetSearch from '../components/sweets/SweetSearch';
import Loading from '../components/common/Loading';
import './DashboardPage.css';

const DashboardPage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

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

  const handleSearch = async (filters) => {
    if (Object.keys(filters).length === 0) {
      fetchSweets();
      setIsSearching(false);
      return;
    }

    try {
      setLoading(true);
      setIsSearching(true);
      const response = await sweetService.searchSweets(filters);
      setSweets(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Search failed');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchase = () => {
    fetchSweets();
  };

  if (loading && sweets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Sweet Dashboard</h1>
        <p>Browse and purchase your favorite sweets</p>
      </div>

      <SweetSearch onSearch={handleSearch} />

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

      {isSearching && (
        <div className="search-info">
          Showing {sweets.length} search result(s)
        </div>
      )}

      <div className="dashboard-content">
        {loading ? (
          <Loading />
        ) : (
          <SweetList sweets={sweets} onPurchase={handlePurchase} />
        )}
      </div>
    </div>
  );
};

export default DashboardPage;