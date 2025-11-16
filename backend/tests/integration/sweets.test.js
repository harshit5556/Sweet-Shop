import { describe, test, expect, beforeEach } from '@jest/globals';
import request from 'supertest';
import app from '../../src/server.js';
import User from '../../src/models/User.js';
import Sweet from '../../src/models/Sweet.js';

describe('Sweets Integration Tests', () => {
  let adminToken;
  let userToken;
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
  });

  describe('POST /api/sweets', () => {
    test('admin should create a sweet', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.99,
        quantity: 100
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(sweetData.name);
    });

    test('regular user should not create a sweet', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.99,
        quantity: 100
      };

      await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(403);
    });

    test('should not create sweet without authentication', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.99,
        quantity: 100
      };

      await request(app)
        .post('/api/sweets')
        .send(sweetData)
        .expect(401);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create({
        name: 'Candy',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: adminUser._id
      });
    });

    test('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data).toHaveLength(1);
    });

    test('should require authentication', async () => {
      await request(app)
        .get('/api/sweets')
        .expect(401);
    });
  });

  describe('GET /api/sweets/search', () => {
    beforeEach(async () => {
      await Sweet.create({
        name: 'Chocolate Bar',
        category: 'chocolate',
        price: 2.99,
        quantity: 50,
        createdBy: adminUser._id
      });
      await Sweet.create({
        name: 'Gummy Bears',
        category: 'gummy',
        price: 1.49,
        quantity: 100,
        createdBy: adminUser._id
      });
    });

    test('should search by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].name).toBe('Chocolate Bar');
    });

    test('should search by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=gummy')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
      expect(response.body.data[0].category).toBe('gummy');
    });

    test('should search by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=2&maxPrice=3')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.data).toHaveLength(1);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'Old Name',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: adminUser._id
      });
    });

    test('admin should update a sweet', async () => {
      const response = await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ name: 'New Name', price: 2.49 })
        .expect(200);

      expect(response.body.data.name).toBe('New Name');
      expect(response.body.data.price).toBe(2.49);
    });

    test('regular user should not update a sweet', async () => {
      await request(app)
        .put(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send({ name: 'New Name' })
        .expect(403);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweet;

    beforeEach(async () => {
      sweet = await Sweet.create({
        name: 'To Delete',
        category: 'candy',
        price: 1.99,
        quantity: 50,
        createdBy: adminUser._id
      });
    });

    test('admin should delete a sweet', async () => {
      await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      const deletedSweet = await Sweet.findById(sweet._id);
      expect(deletedSweet).toBeNull();
    });

    test('regular user should not delete a sweet', async () => {
      await request(app)
        .delete(`/api/sweets/${sweet._id}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);
    });
  });
});
