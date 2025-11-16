import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { purchaseSweet, restockSweet } from '../../../src/controllers/inventoryController.js';
import User from '../../../src/models/User.js';
import Sweet from '../../../src/models/Sweet.js';

describe('Inventory Controller', () => {
  let req, res, user, sweet;

  beforeEach(async () => {
    user = await User.create({
      name: 'User',
      email: 'user@example.com',
      password: 'password123'
    });

    sweet = await Sweet.create({
      name: 'Test Sweet',
      category: 'candy',
      price: 2.99,
      quantity: 100,
      createdBy: user._id
    });

    req = {
      body: {},
      params: {},
      user: user
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('purchaseSweet', () => {
    test('should purchase sweet successfully', async () => {
      req.params.id = sweet._id.toString();
      req.body = { quantity: 10 };

      await purchaseSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.data.quantity).toBe(90);
    });

    test('should return error if insufficient quantity', async () => {
      req.params.id = sweet._id.toString();
      req.body = { quantity: 150 };

      await purchaseSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });

    test('should return error with invalid quantity', async () => {
      req.params.id = sweet._id.toString();
      req.body = { quantity: 0 };

      await purchaseSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });
  });

  describe('restockSweet', () => {
    test('should restock sweet successfully', async () => {
      req.params.id = sweet._id.toString();
      req.body = { quantity: 50 };

      await restockSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.data.quantity).toBe(150);
    });

    test('should return error with invalid quantity', async () => {
      req.params.id = sweet._id.toString();
      req.body = { quantity: -10 };

      await restockSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });

    test('should return error if sweet not found', async () => {
      req.params.id = '507f1f77bcf86cd799439011';
      req.body = { quantity: 50 };

      await restockSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });
});


