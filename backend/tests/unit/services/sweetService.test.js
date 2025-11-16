import { describe, test, expect, beforeEach } from '@jest/globals';
import { sweetService } from '../../../src/services/sweetService.js';
import User from '../../../src/models/User.js';
import Sweet from '../../../src/models/Sweet.js';

describe('Sweet Service', () => {
  let user;
  let sweetData;

  beforeEach(async () => {
    user = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    sweetData = {
      name: 'Candy Bar',
      category: 'candy',
      price: 1.99,
      quantity: 50,
      description: 'Sweet candy bar'
    };
  });

  describe('createSweet', () => {
    test('should create a new sweet', async () => {
      const sweet = await sweetService.createSweet(sweetData, user._id);

      expect(sweet.name).toBe(sweetData.name);
      expect(sweet.category).toBe(sweetData.category);
      expect(sweet.price).toBe(sweetData.price);
    });
  });

  describe('getAllSweets', () => {
    test('should return all sweets', async () => {
      await sweetService.createSweet(sweetData, user._id);
      await sweetService.createSweet({ ...sweetData, name: 'Candy Bar 2' }, user._id);

      const sweets = await sweetService.getAllSweets();
      
      expect(sweets).toHaveLength(2);
    });

    test('should return empty array when no sweets exist', async () => {
      const sweets = await sweetService.getAllSweets();
      expect(sweets).toHaveLength(0);
    });
  });

  describe('getSweetById', () => {
    test('should return sweet by id', async () => {
      const created = await sweetService.createSweet(sweetData, user._id);
      const sweet = await sweetService.getSweetById(created._id);

      expect(sweet.name).toBe(sweetData.name);
    });

    test('should throw error if sweet not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await expect(sweetService.getSweetById(fakeId)).rejects.toThrow('Sweet not found');
    });
  });

  describe('searchSweets', () => {
    beforeEach(async () => {
      await sweetService.createSweet(sweetData, user._id);
      await sweetService.createSweet({
        name: 'Chocolate',
        category: 'chocolate',
        price: 3.99,
        quantity: 30
      }, user._id);
    });

    test('should search by name', async () => {
      const sweets = await sweetService.searchSweets({ name: 'Candy' });
      expect(sweets).toHaveLength(1);
      expect(sweets[0].name).toBe('Candy Bar');
    });

    test('should search by category', async () => {
      const sweets = await sweetService.searchSweets({ category: 'chocolate' });
      expect(sweets).toHaveLength(1);
      expect(sweets[0].category).toBe('chocolate');
    });

    test('should search by price range', async () => {
      const sweets = await sweetService.searchSweets({ minPrice: 1, maxPrice: 2 });
      expect(sweets).toHaveLength(1);
    });
  });

  describe('updateSweet', () => {
    test('should update sweet', async () => {
      const created = await sweetService.createSweet(sweetData, user._id);
      const updated = await sweetService.updateSweet(created._id, { price: 2.49 });

      expect(updated.price).toBe(2.49);
    });

    test('should throw error if sweet not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await expect(
        sweetService.updateSweet(fakeId, { price: 2.49 })
      ).rejects.toThrow('Sweet not found');
    });
  });

  describe('deleteSweet', () => {
    test('should delete sweet', async () => {
      const created = await sweetService.createSweet(sweetData, user._id);
      await sweetService.deleteSweet(created._id);

      const sweets = await sweetService.getAllSweets();
      expect(sweets).toHaveLength(0);
    });

    test('should throw error if sweet not found', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await expect(sweetService.deleteSweet(fakeId)).rejects.toThrow('Sweet not found');
    });
  });
});
