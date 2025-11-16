import { describe, test, expect, beforeEach } from '@jest/globals';
import User from '../../../src/models/User.js';

describe('User Model', () => {
  let userData;

  beforeEach(() => {
    userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123'
    };
  });

  test('should create a new user with valid data', async () => {
    const user = await User.create(userData);

    expect(user.name).toBe(userData.name);
    expect(user.email).toBe(userData.email);
    expect(user.role).toBe('user');
    expect(user.password).not.toBe(userData.password); // Should be hashed
  });

  test('should hash password before saving', async () => {
    const user = await User.create(userData);
    const isPasswordHashed = user.password !== userData.password;
    expect(isPasswordHashed).toBe(true);
  });

  test('should compare password correctly', async () => {
    const user = await User.create(userData);
    const userWithPassword = await User.findById(user._id).select('+password');
    
    const isMatch = await userWithPassword.comparePassword('password123');
    expect(isMatch).toBe(true);

    const isNotMatch = await userWithPassword.comparePassword('wrongpassword');
    expect(isNotMatch).toBe(false);
  });

  test('should fail to create user without required fields', async () => {
    await expect(User.create({})).rejects.toThrow();
  });

  test('should fail to create user with invalid email', async () => {
    userData.email = 'invalid-email';
    await expect(User.create(userData)).rejects.toThrow();
  });

  test('should not allow duplicate emails', async () => {
    await User.create(userData);
    await expect(User.create(userData)).rejects.toThrow();
  });

  test('should set default role to user', async () => {
    const user = await User.create(userData);
    expect(user.role).toBe('user');
  });

  test('should allow admin role', async () => {
    userData.role = 'admin';
    const user = await User.create(userData);
    expect(user.role).toBe('admin');
  });
});