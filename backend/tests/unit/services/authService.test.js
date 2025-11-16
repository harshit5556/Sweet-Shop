import { describe, test, expect, beforeEach } from '@jest/globals';
import { authService } from '../../../src/services/authService.js';
import User from '../../../src/models/User.js';

describe('Auth Service', () => {
  let userData;

  beforeEach(() => {
    userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
  });

  describe('registerUser', () => {
    test('should register a new user', async () => {
      const user = await authService.registerUser(userData);

      expect(user.name).toBe(userData.name);
      expect(user.email).toBe(userData.email);
      expect(user.password).not.toBe(userData.password);
    });

    test('should throw error if user already exists', async () => {
      await authService.registerUser(userData);
      
      await expect(authService.registerUser(userData)).rejects.toThrow('User already exists');
    });
  });

  describe('loginUser', () => {
    test('should login user with correct credentials', async () => {
      await authService.registerUser(userData);
      
      const user = await authService.loginUser(userData.email, userData.password);
      
      expect(user.email).toBe(userData.email);
    });

    test('should throw error with incorrect email', async () => {
      await authService.registerUser(userData);
      
      await expect(
        authService.loginUser('wrong@example.com', userData.password)
      ).rejects.toThrow('Invalid credentials');
    });

    test('should throw error with incorrect password', async () => {
      await authService.registerUser(userData);
      
      await expect(
        authService.loginUser(userData.email, 'wrongpassword')
      ).rejects.toThrow('Invalid credentials');
    });
  });

  describe('generateToken', () => {
    test('should generate a valid JWT token', async () => {
      const user = await authService.registerUser(userData);
      const token = authService.generateToken(user._id);
      
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
    });
  });

  describe('verifyToken', () => {
    test('should verify a valid token', async () => {
      const user = await authService.registerUser(userData);
      const token = authService.generateToken(user._id);
      
      const decoded = authService.verifyToken(token);
      
      expect(decoded.id).toBe(user._id.toString());
    });

    test('should throw error for invalid token', () => {
      expect(() => authService.verifyToken('invalid-token')).toThrow();
    });
  });
});