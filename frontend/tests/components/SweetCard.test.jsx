import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SweetCard from '../../src/components/sweets/SweetCard';

// Mock PurchaseButton
vi.mock('../../src/components/sweets/PurchaseButton', () => ({
  default: ({ sweetId, available, onSuccess }) => (
    <button data-testid="purchase-button" data-sweet-id={sweetId} disabled={!available}>
      Purchase
    </button>
  )
}));

describe('SweetCard', () => {
  const mockSweet = {
    _id: '1',
    name: 'Chocolate Bar',
    category: 'chocolate',
    price: 2.99,
    quantity: 10,
    description: 'Delicious chocolate bar'
  };

  const mockOnPurchase = vi.fn();

  it('renders sweet information correctly', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.getByText('chocolate')).toBeInTheDocument();
    expect(screen.getByText('$2.99')).toBeInTheDocument();
    expect(screen.getByText(/stock: 10/i)).toBeInTheDocument();
    expect(screen.getByText('Delicious chocolate bar')).toBeInTheDocument();
  });

  it('renders purchase button when not admin and in stock', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} isAdmin={false} />);
    
    const purchaseButton = screen.getByTestId('purchase-button');
    expect(purchaseButton).toBeInTheDocument();
    expect(purchaseButton).not.toBeDisabled();
  });

  it('does not render purchase button when admin', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} isAdmin={true} />);
    
    expect(screen.queryByTestId('purchase-button')).not.toBeInTheDocument();
  });

  it('displays out of stock label when quantity is 0', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    render(<SweetCard sweet={outOfStockSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText(/out of stock/i)).toBeInTheDocument();
  });

  it('applies out-of-stock class when quantity is 0', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    const { container } = render(<SweetCard sweet={outOfStockSweet} onPurchase={mockOnPurchase} />);
    
    const card = container.querySelector('.sweet-card');
    expect(card).toHaveClass('out-of-stock');
  });

  it('disables purchase button when out of stock', () => {
    const outOfStockSweet = { ...mockSweet, quantity: 0 };
    render(<SweetCard sweet={outOfStockSweet} onPurchase={mockOnPurchase} isAdmin={false} />);
    
    const purchaseButton = screen.getByTestId('purchase-button');
    expect(purchaseButton).toBeDisabled();
  });

  it('renders without description when not provided', () => {
    const sweetWithoutDescription = { ...mockSweet };
    delete sweetWithoutDescription.description;
    
    render(<SweetCard sweet={sweetWithoutDescription} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.queryByText('Delicious chocolate bar')).not.toBeInTheDocument();
  });

  it('formats price correctly', () => {
    const expensiveSweet = { ...mockSweet, price: 15.99 };
    render(<SweetCard sweet={expensiveSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('$15.99')).toBeInTheDocument();
  });

  it('passes correct props to PurchaseButton', () => {
    render(<SweetCard sweet={mockSweet} onPurchase={mockOnPurchase} isAdmin={false} />);
    
    const purchaseButton = screen.getByTestId('purchase-button');
    expect(purchaseButton).toHaveAttribute('data-sweet-id', '1');
  });
});

