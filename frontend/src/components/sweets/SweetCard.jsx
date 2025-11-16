import React from 'react';
import PurchaseButton from './PurchaseButton';
import { getStockClasses, getCategoryClasses, getPriceClasses } from '../../tailwind';

const SweetCard = ({ sweet, onPurchase, isAdmin }) => {
  const isOutOfStock = sweet.quantity === 0;

  return (
    <div className={`bg-white rounded-lg shadow-sweet p-6 transition-all duration-200 hover:shadow-sweet-lg ${
      isOutOfStock ? 'opacity-75 border-2 border-red-200' : 'border border-gray-200'
    }`}>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{sweet.name}</h3>
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-3 border ${getCategoryClasses(sweet.category)}`}>
        {sweet.category}
      </div>
      <div className={`text-2xl font-bold mb-3 ${getPriceClasses(sweet.price)}`}>
        ${sweet.price.toFixed(2)}
      </div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-600">Stock: <span className="font-semibold">{sweet.quantity}</span></span>
        {isOutOfStock && (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStockClasses(0)}`}>
            Out of Stock
          </span>
        )}
      </div>
      {sweet.description && (
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{sweet.description}</p>
      )}
      
      {!isAdmin && (
        <PurchaseButton 
          sweetId={sweet._id} 
          available={sweet.quantity > 0}
          onSuccess={onPurchase}
        />
      )}
    </div>
  );
};

export default SweetCard;
