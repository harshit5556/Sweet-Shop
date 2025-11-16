import { describe, test, expect, beforeEach } from '@jest/globals';
import { inventoryService } from '../../../src/services/inventoryService.js';
import { sweetService } from '../../../src/services/sweetService.js';
import User from '../../../src/models/User.js';

describe('Inventory Service', () => {
  let user;
  let sweet;

  beforeEach(async () => {
    user = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    sweet = await sweetService.createSweet({
      name: 'Test Sweet',
      category: 'candy',
      price: 2.99,
      quantity: 100
    }, user._id);
  });

  describe('purchaseSweet', () => {
    test('should purchase sweet and decrease quantity', async () => {
      const result = await inventoryService.purchaseSweet(sweet._id, 10);

      expect(result.quantity).toBe(90);
    });

    test('should throw error if insufficient quantity', async () => {
      await expect(
        inventoryService.purchaseSweet(sweet._id, 150)
      ).rejects.toThrow('Insufficient quantity in stock');
    });

    test('should throw error if sweet not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await expect(
        inventoryService.purchaseSweet(fakeId, 10)
      ).rejects.toThrow('Sweet not found');
    });
  });

  describe('restockSweet', () => {
    test('should restock sweet and increase quantity', async () => {
      const result = await inventoryService.restockSweet(sweet._id, 50);

      expect(result.quantity).toBe(150);
    });

    test('should throw error if sweet not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await expect(
        inventoryService.restockSweet(fakeId, 50)
      ).rejects.toThrow('Sweet not found');
    });
  });

  describe('checkStock', () => {
    test('should return stock information', async () => {
      const stock = await inventoryService.checkStock(sweet._id);

      expect(stock.quantity).toBe(100);
      expect(stock.available).toBe(true);
      expect(stock.name).toBe('Test Sweet');
    });

    test('should show unavailable when quantity is 0', async () => {
      await inventoryService.purchaseSweet(sweet._id, 100);
      const stock = await inventoryService.checkStock(sweet._id);

      expect(stock.quantity).toBe(0);
      expect(stock.available).toBe(false);
    });
  });

  describe('getLowStockItems', () => {
    test('should return items with low stock', async () => {
      await inventoryService.purchaseSweet(sweet._id, 95);
      
      const lowStock = await inventoryService.getLowStockItems(10);

      expect(lowStock).toHaveLength(1);
      expect(lowStock[0].quantity).toBe(5);
    });

    test('should return empty array when no low stock items', async () => {
      const lowStock = await inventoryService.getLowStockItems(10);
      expect(lowStock).toHaveLength(0);
    });
  });
});