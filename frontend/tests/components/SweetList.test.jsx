import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import SweetList from '../../src/components/sweets/SweetList';

// Mock SweetCard
vi.mock('../../src/components/sweets/SweetCard', () => ({
  default: ({ sweet, onPurchase, isAdmin }) => (
    <div data-testid="sweet-card" data-sweet-id={sweet._id} data-is-admin={isAdmin}>
      {sweet.name}
    </div>
  )
}));

describe('SweetList', () => {
  const mockSweets = [
    {
      _id: '1',
      name: 'Chocolate Bar',
      category: 'chocolate',
      price: 2.99,
      quantity: 10
    },
    {
      _id: '2',
      name: 'Gummy Bears',
      category: 'gummy',
      price: 1.99,
      quantity: 5
    },
    {
      _id: '3',
      name: 'Lollipop',
      category: 'lollipop',
      price: 0.99,
      quantity: 20
    }
  ];

  const mockOnPurchase = vi.fn();

  it('renders all sweets in the list', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.getByText('Gummy Bears')).toBeInTheDocument();
    expect(screen.getByText('Lollipop')).toBeInTheDocument();
  });

  it('renders empty state when no sweets are provided', () => {
    render(<SweetList sweets={[]} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText(/no sweets available/i)).toBeInTheDocument();
  });

  it('renders empty state when sweets array is empty', () => {
    render(<SweetList sweets={[]} onPurchase={mockOnPurchase} />);
    
    const emptyState = screen.getByText(/no sweets available/i);
    expect(emptyState).toBeInTheDocument();
  });

  it('passes onPurchase callback to each SweetCard', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} />);
    
    const cards = screen.getAllByTestId('sweet-card');
    expect(cards).toHaveLength(3);
  });

  it('passes isAdmin prop to SweetCard when provided', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} isAdmin={true} />);
    
    const cards = screen.getAllByTestId('sweet-card');
    cards.forEach(card => {
      expect(card).toHaveAttribute('data-is-admin', 'true');
    });
  });

  it('passes isAdmin as false by default', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} />);
    
    const cards = screen.getAllByTestId('sweet-card');
    cards.forEach(card => {
      expect(card).toHaveAttribute('data-is-admin', 'false');
    });
  });

  it('renders correct number of sweet cards', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} />);
    
    const cards = screen.getAllByTestId('sweet-card');
    expect(cards).toHaveLength(mockSweets.length);
  });

  it('uses sweet _id as key for each card', () => {
    render(<SweetList sweets={mockSweets} onPurchase={mockOnPurchase} />);
    
    const cards = screen.getAllByTestId('sweet-card');
    expect(cards[0]).toHaveAttribute('data-sweet-id', '1');
    expect(cards[1]).toHaveAttribute('data-sweet-id', '2');
    expect(cards[2]).toHaveAttribute('data-sweet-id', '3');
  });

  it('handles single sweet in list', () => {
    const singleSweet = [mockSweets[0]];
    render(<SweetList sweets={singleSweet} onPurchase={mockOnPurchase} />);
    
    expect(screen.getByText('Chocolate Bar')).toBeInTheDocument();
    expect(screen.queryByText('Gummy Bears')).not.toBeInTheDocument();
  });
});

