import React from 'react';
import SweetCard from './SweetCard';
import './SweetList.css';

const SweetList = ({ sweets, onPurchase, isAdmin = false }) => {
  if (sweets.length === 0) {
    return (
      <div className="empty-state">
        <p>No sweets available</p>
      </div>
    );
  }

  return (
    <div className="sweet-list">
      {sweets.map((sweet) => (
        <SweetCard 
          key={sweet._id} 
          sweet={sweet} 
          onPurchase={onPurchase}
          isAdmin={isAdmin}
        />
      ))}
    </div>
  );
};

export default SweetList;
