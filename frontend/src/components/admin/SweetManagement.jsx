import React, { useState } from 'react';
import { sweetService } from '../../services/sweetService';
import RestockForm from './RestockForm';
import './SweetManagement.css';

const SweetManagement = ({ sweets, onUpdate, onEdit, onDelete }) => {
  const [restockingId, setRestockingId] = useState(null);

  const handleRestockComplete = () => {
    setRestockingId(null);
    onUpdate();
  };

  return (
    <div className="sweet-management">
      <table className="sweet-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sweets.map((sweet) => (
            <tr key={sweet._id}>
              <td>{sweet.name}</td>
              <td>{sweet.category}</td>
              <td>${sweet.price.toFixed(2)}</td>
              <td>
                {sweet.quantity}
                {sweet.quantity === 0 && (
                  <span className="low-stock"> (Out of Stock)</span>
                )}
                {sweet.quantity > 0 && sweet.quantity <= 10 && (
                  <span className="low-stock"> (Low Stock)</span>
                )}
              </td>
              <td>
                <div className="action-buttons">
                  <button 
                    onClick={() => onEdit(sweet)} 
                    className="btn-edit"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => setRestockingId(sweet._id)} 
                    className="btn-restock"
                  >
                    Restock
                  </button>
                  <button 
                    onClick={() => onDelete(sweet._id)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {restockingId && (
        <RestockForm
          sweetId={restockingId}
          onSuccess={handleRestockComplete}
          onCancel={() => setRestockingId(null)}
        />
      )}
    </div>
  );
};

export default SweetManagement;
