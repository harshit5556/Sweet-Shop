import React, { useState, useEffect } from 'react';
import { sweetService } from '../services/sweetService';
import SweetForm from '../components/admin/SweetForm';
import SweetManagement from '../components/admin/SweetManagement';
import Loading from '../components/common/Loading';
import './AdminPage.css';

const AdminPage = () => {
  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingSweet, setEditingSweet] = useState(null);

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

  if (loading && sweets.length === 0) {
    return <Loading />;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <button 
          onClick={() => setShowForm(true)} 
          className="btn-add"
          disabled={showForm}
        >
          + Add New Sweet
        </button>
      </div>

      {error && (
        <div className="error-banner">
          {error}
        </div>
      )}

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

      <div className="admin-content">
        <h2>Manage Sweets</h2>
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

      <div className="admin-stats">
        <div className="stat-card">
          <h3>Total Sweets</h3>
          <p className="stat-number">{sweets.length}</p>
        </div>
        <div className="stat-card">
          <h3>Out of Stock</h3>
          <p className="stat-number">
            {sweets.filter(s => s.quantity === 0).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Low Stock</h3>
          <p className="stat-number">
            {sweets.filter(s => s.quantity > 0 && s.quantity <= 10).length}
          </p>
        </div>
        <div className="stat-card">
          <h3>Total Inventory</h3>
          <p className="stat-number">
            {sweets.reduce((acc, s) => acc + s.quantity, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
