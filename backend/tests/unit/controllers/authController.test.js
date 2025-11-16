import { describe, test, expect, jest, beforeEach } from '@jest/globals';
import { register, login } from '../../../src/controllers/authController.js';
import User from '../../../src/models/User.js';

describe('Auth Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
  });

  describe('register', () => {
    test('should register user successfully', async () => {
      req.body = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalled();
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.token).toBeDefined();
    });

    test('should return error if user already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      };

      await User.create(userData);

      req.body = userData;

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });
  });

  describe('login', () => {
    beforeEach(async () => {
      await User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123'
      });
    });

    test('should login successfully with correct credentials', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'password123'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(true);
      expect(response.token).toBeDefined();
    });

    test('should return error with incorrect password', async () => {
      req.body = {
        email: 'test@example.com',
        password: 'wrongpassword'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });

    test('should return error without email or password', async () => {
      req.body = {
        email: 'test@example.com'
      };

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      const response = res.json.mock.calls[0][0];
      expect(response.success).toBe(false);
    });
  });
});
