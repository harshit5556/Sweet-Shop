import React, { useState } from 'react';
import { useInventory } from '../../hooks/useInventory';
import './PurchaseButton.css';

const PurchaseButton = ({ sweetId, available, onSuccess }) => {
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const { purchase, loading, error } = useInventory();

  const handlePurchase = async () => {
    try {
      await purchase(sweetId, quantity);
      setShowModal(false);
      setQuantity(1);
      onSuccess();
      alert('Purchase successful!');
    } catch (err) {
      alert(err.message);
    }
  };

  if (!available) {
    return <button className="btn-purchase" disabled>Out of Stock</button>;
  }

  return (
    <>
      <button 
        className="btn-purchase" 
        onClick={() => setShowModal(true)}
        disabled={!available}
      >
        Purchase
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Purchase Sweet</h3>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>

            <div className="modal-actions">
              <button 
                onClick={handlePurchase} 
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Processing...' : 'Confirm Purchase'}
              </button>
              <button 
                onClick={() => setShowModal(false)} 
                className="btn-secondary"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PurchaseButton;
