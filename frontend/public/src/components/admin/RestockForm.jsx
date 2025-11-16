import React, { useState } from 'react';
import { useInventory } from '../../hooks/useInventory';
import './RestockForm.css';

const RestockForm = ({ sweetId, onSuccess, onCancel }) => {
  const [quantity, setQuantity] = useState('');
  const { restock, loading, error } = useInventory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await restock(sweetId, parseInt(quantity));
      alert('Restock successful!');
      onSuccess();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Restock Sweet</h3>
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="quantity">Quantity to Add:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? 'Restocking...' : 'Restock'}
            </button>
            <button type="button" onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestockForm;

