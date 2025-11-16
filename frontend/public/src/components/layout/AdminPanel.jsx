import React, { useState, useEffect } from 'react';
import { sweetService } from '../../services/sweetService';
import SweetForm from '../admin/SweetForm';
import SweetManagement from '../admin/SweetManagement';
import Loading from '../common/Loading';
import './AdminPanel.css';

const AdminPanel = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

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

  const handleCreateSweet = async (sweetData) => {
    try {
      await sweetService.createSweet(sweetData);
      alert('Sweet created successfully!');
      setShowForm(false);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create sweet');
    }
  };

  const handleUpdateSweet = async (sweetData) => {
    try {
      await sweetService.updateSweet(editingSweet._id, sweetData);
      alert('Sweet updated successfully!');
      setEditingSweet(null);
      setShowForm(false);
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update sweet');
    }
  };

  const handleEdit = (sweet) => {
    setEditingSweet(sweet);
    setShowForm(true);
    setActiveTab('manage');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sweet?')) {
      return;
    }

    try {
      await sweetService.deleteSweet(id);
      alert('Sweet deleted successfully!');
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete sweet');
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingSweet(null);
  };

  const stats = {
    total: sweets.length,
    outOfStock: sweets.filter(s => s.quantity === 0).length,
    lowStock: sweets.filter(s => s.quantity > 0 && s.quantity <= 10).length,
    totalInventory: sweets.reduce((acc, s) => acc + s.quantity, 0),
    totalValue: sweets.reduce((acc, s) => acc + (s.price * s.quantity), 0)
  };

  if (loading && sweets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="admin-panel">
      <div className="admin-header">
        <div>
          <h1>Admin Panel</h1>
          <p>Manage your sweet shop inventory</p>
        </div>
        <button 
          onClick={() => {
            setShowForm(true);
            setActiveTab('manage');
          }} 
          className="btn-add-new"
          disabled={showForm}
        >
          + Add New Sweet
        </button>
      </div>

      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`tab-button ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Manage Sweets
        </button>
      </div>

      {error && (
        <div className="error-banner">{error}</div>
      )}

      {activeTab === 'overview' && (
        <div className="overview-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>Total Sweets</h3>
                <p className="stat-number">{stats.total}</p>
              </div>
            </div>

            <div className="stat-card danger">
              <div className="stat-icon">❌</div>
              <div className="stat-content">
                <h3>Out of Stock</h3>
                <p className="stat-number">{stats.outOfStock}</p>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon">⚠️</div>
              <div className="stat-content">
                <h3>Low Stock</h3>
                <p className="stat-number">{stats.lowStock}</p>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">📦</div>
              <div className="stat-content">
                <h3>Total Inventory</h3>
                <p className="stat-number">{stats.totalInventory}</p>
              </div>
            </div>

            <div className="stat-card info">
              <div className="stat-icon">💰</div>
              <div className="stat-content">
                <h3>Total Value</h3>
                <p className="stat-number">${stats.totalValue.toFixed(2)}</p>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h2>Quick Actions</h2>
            <div className="action-cards">
              <div className="action-card" onClick={() => setActiveTab('manage')}>
                <span className="action-icon">➕</span>
                <h3>Add Sweet</h3>
                <p>Create a new sweet item</p>
              </div>
              <div className="action-card" onClick={() => setActiveTab('manage')}>
                <span className="action-icon">✏️</span>
                <h3>Edit Sweets</h3>
                <p>Update existing items</p>
              </div>
              <div className="action-card" onClick={() => setActiveTab('manage')}>
                <span className="action-icon">🔄</span>
                <h3>Restock</h3>
                <p>Increase inventory levels</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'manage' && (
        <div className="manage-section">
          {showForm && (
            <div className="form-section">
              <h2>{editingSweet ? 'Edit Sweet' : 'Create New Sweet'}</h2>
              <SweetForm
                onSubmit={editingSweet ? handleUpdateSweet : handleCreateSweet}
                initialData={editingSweet}
                onCancel={handleCancel}
              />
            </div>
          )}

          <div className="management-section">
            <h2>All Sweets</h2>
            {loading ? (
              <Loading />
            ) : (
              <SweetManagement
                sweets={sweets}
                onUpdate={fetchSweets}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
