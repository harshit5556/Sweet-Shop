import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import {
  createSweet,
  getAllSweets,
  searchSweets,
  updateSweet,
  deleteSweet
} from '../../../src/controllers/sweetController.js';
import User from '../../../src/models/User.js';
import Sweet from '../../../src/models/Sweet.js';

describe('Sweet Controller', () => {
  let req, res, user;

  beforeEach(async () => {
    user = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });

    req = {
      body: {},
      params: {},
      query: {},
      user: user
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('createSweet', () => {
    test('should create sweet successfully', async () => {
      req.body = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.99,
        quantity: 100
      };

      await createSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.data.name).toBe('Chocolate Bar');
    });

    test('should return error with invalid data', async () => {
      req.body = {
        name: 'Test'
        // Missing required fields
      };

      await createSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });
  });

  describe('getAllSweets', () => {
    test('should get all sweets', async () => {
      await Sweet.create({
        name: 'Sweet 1',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: user._id
      });

      await getAllSweets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.count).toBe(1);
    });
  });

  describe('searchSweets', () => {
    beforeEach(async () => {
      await Sweet.create({
        name: 'Chocolate',
        category: 'chocolate',
        price: 2.99,
        quantity: 50,
        createdBy: user._id
      });
    });

    test('should search by name', async () => {
      req.query = { name: 'Chocolate' };

      await searchSweets(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.data).toHaveLength(1);
    });
  });

  describe('updateSweet', () => {
    test('should update sweet', async () => {
      const sweet = await Sweet.create({
        name: 'Old Name',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: user._id
      });

      req.params.id = sweet._id.toString();
      req.body = { name: 'New Name' };

      await updateSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.data.name).toBe('New Name');
    });

    test('should return error if sweet not found', async () => {
      req.params.id = '507f1f77bcf86cd799439011';
      req.body = { name: 'New Name' };

      await updateSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
    });
  });

  describe('deleteSweet', () => {
    test('should delete sweet', async () => {
      const sweet = await Sweet.create({
        name: 'To Delete',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: user._id
      });

      req.params.id = sweet._id.toString();

      await deleteSweet(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });
  });
});