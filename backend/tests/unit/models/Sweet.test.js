import { describe, test, expect, beforeEach } from '@jest/globals';
import Sweet from '../../../src/models/Sweet.js';
import User from '../../../src/models/User.js';

describe('Sweet Model', () => {
  let sweetData;
  let user;

  beforeEach(async () => {
    user = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    sweetData = {
      name: 'Chocolate Bar',
      category: 'chocolate',
      price: 2.99,
      quantity: 100,
      description: 'Delicious chocolate bar',
      createdBy: user._id
    };
  });

  test('should create a new sweet with valid data', async () => {
    const sweet = await Sweet.create(sweetData);

    expect(sweet.name).toBe(sweetData.name);
    expect(sweet.category).toBe(sweetData.category);
    expect(sweet.price).toBe(sweetData.price);
    expect(sweet.quantity).toBe(sweetData.quantity);
  });

  test('should fail to create sweet without required fields', async () => {
    await expect(Sweet.create({})).rejects.toThrow();
  });

  test('should not allow negative price', async () => {
    sweetData.price = -5;
    await expect(Sweet.create(sweetData)).rejects.toThrow();
  });

  test('should not allow negative quantity', async () => {
    sweetData.quantity = -10;
    await expect(Sweet.create(sweetData)).rejects.toThrow();
  });

  test('should set default quantity to 0', async () => {
    delete sweetData.quantity;
    const sweet = await Sweet.create(sweetData);
    expect(sweet.quantity).toBe(0);
  });

  test('should not allow duplicate sweet names', async () => {
    await Sweet.create(sweetData);
    await expect(Sweet.create(sweetData)).rejects.toThrow();
  });

  test('should only allow valid categories', async () => {
    sweetData.category = 'invalid-category';
    await expect(Sweet.create(sweetData)).rejects.toThrow();
  });
});