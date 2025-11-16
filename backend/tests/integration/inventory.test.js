import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../src/server.js';
import User from '../../src/models/User.js';
import Sweet from '../../src/models/Sweet.js';

describe('Inventory Integration Tests', () => {
  let adminToken;
  let userToken;
  let sweet;
  let adminUser;

  beforeEach(async () => {
    // Create admin user
    const admin = await User.create({
      name: 'Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin'
    });
    adminUser = admin;

    // Create regular user
    await User.create({
      name: 'User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user'
    });

    // Login admin
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@example.com', password: 'password123' });
    adminToken = adminLogin.body.token;

    // Login user
    const userLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });
    userToken = userLogin.body.token;

    // Create a sweet
    sweet = await Sweet.create({
      name: 'Test Sweet',
      category: 'candy',
      price: 2.99,
      quantity: 100,
      createdBy: adminUser._id
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    test('user should purchase a sweet', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 10 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(90);
    });

    test('should not purchase if quantity exceeds stock', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 150 })
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient');
    });

    test('should not purchase with invalid quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 0 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should require authentication', async () => {
      await request(app)
        .post(`/api/sweets/${sweet._id}/purchase`)
        .send({ quantity: 10 })
        .expect(401);
    });

    test('should not purchase from non-existent sweet', async () => {
      const fakeId = '507f1f77bcf86cd799439011';
      await request(app)
        .post(`/api/sweets/${fakeId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 10 })
        .expect(404);
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    test('admin should restock a sweet', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: 50 })
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(150);
    });

    test('regular user should not restock', async () => {
      await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ quantity: 50 })
        .expect(403);
    });

    test('should not restock with invalid quantity', async () => {
      const response = await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ quantity: -10 })
        .expect(400);

      expect(response.body.success).toBe(false);
    });

    test('should require authentication', async () => {
      await request(app)
        .post(`/api/sweets/${sweet._id}/restock`)
        .send({ quantity: 50 })
        .expect(401);
    });
  });
});