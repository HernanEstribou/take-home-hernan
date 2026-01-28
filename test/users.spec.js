import request from 'supertest';
import app from '../src/app.js';
import { describe, test, expect, beforeEach } from '@jest/globals';
import { cleanDatabase, createTestUsers } from './helpers.js';

describe('GET /users', () => {
  beforeEach(async () => {
    await cleanDatabase();

    // Test Users
    const testUsers = [
      { email: 'hernan@gmail.com', password: '1234abcd' },
      { email: 'pedro@gmail.com', password: '4567qwer' },
      { email: 'juan@gmail.com', password: '9874asdf' },
    ];

    await Promise.all(testUsers.map((user) => createTestUsers(user)));
  });

  test('should return 200 and an array of users', async () => {
    const response = await request(app)
      .get('/users')
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(3);

    const user = response.body[0];
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('email');
    expect(user).not.toHaveProperty('password');
  });
});

describe('GET /users/:id', () => {
  let createdUser;

  beforeEach(async () => {
    await cleanDatabase();

    const userData = {
      email: 'hernan@gmail.com',
      password: '1234abcd',
    };

    createdUser = await createTestUsers(userData);
  });

  test('should return 200 and user data with id and email', async () => {
    const response = await request(app)
      .get(`/users/${createdUser.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id', createdUser.id);
    expect(response.body).toHaveProperty('email', createdUser.email);
    expect(response.body).not.toHaveProperty('password');

    expect(typeof response.body.id).toBe('number');
    expect(typeof response.body.email).toBe('string');

    expect(Object.keys(response.body)).toEqual(['id', 'email']);
  });

  test('should return 404 when user does not exist', async () => {
    const nonExistentId = createdUser.id + 1000;
    const response = await request(app)
      .get(`/users/${nonExistentId}`)
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'User not found');
  });

  test('should return 400 when ID format is invalid', async () => {
    const response = await request(app)
      .get('/users/abc')
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });

  test('should return 400 when ID is negative', async () => {
    const response = await request(app)
      .get('/users/-1')
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });
});

describe('POST /users', () => {
  beforeEach(async () => {
    await cleanDatabase();
  });

  test('should return 201 and create a new user', async () => {
    const userData = {
      email: 'hernan@gmail.com',
      password: '1234abcd',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id');
    expect(response.body).toHaveProperty('email', userData.email);
    expect(response.body).not.toHaveProperty('password');
    expect(typeof response.body.id).toBe('number');
  });

  test('should return 400 when email is missing', async () => {
    const userData = {
      password: '1234abcd',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 400 when password is missing', async () => {
    const userData = {
      email: 'hernan@gmail.com',
    };

    const response = await request(app)
      .post('/users')
      .send(userData)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });
});

describe('PUT /users/:id', () => {
  let createdUser;
  let updatedUser;
  beforeEach(async () => {
    await cleanDatabase();

    const user = {
      email: 'user@gmail.com',
      password: '1234abcd',
    };

    updatedUser = {
      email: 'updated@example.com',
      password: '4567qwert',
    };

    createdUser = await createTestUsers(user);
  });

  test('should return 200 and update user with new data', async () => {
    const response = await request(app)
      .put(`/users/${createdUser.id}`)
      .send(updatedUser)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id', createdUser.id);
    expect(response.body).toHaveProperty('email', updatedUser.email);
    expect(response.body).not.toHaveProperty('password');
  });

  test('should return 404 when user does not exist', async () => {
    const nonExistentId = createdUser.id + 1000;
    const response = await request(app)
      .put(`/users/${nonExistentId}`)
      .send(updatedUser)
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'User not found');
  });

  test('should return 400 when request data is invalid', async () => {
    const invalidData = {
      username: '', // Empty username is invalid
    };

    const response = await request(app)
      .put(`/users/${createdUser.id}`)
      .send(invalidData)
      .expect(400);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });
});

describe('DELETE /users/:id', () => {
  let createdUser;
  beforeEach(async () => {
    await cleanDatabase();

    const user = {
      email: 'user@gmail.com',
      password: '1234abcd',
    };

    createdUser = await createTestUsers(user);
  });

  test('should return 200 and delete the user', async () => {
    const response = await request(app)
      .delete(`/users/${createdUser.id}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('id', createdUser.id);
    expect(response.body).toHaveProperty('email', createdUser.email);
    expect(response.body).not.toHaveProperty('password');

    // Verify user was actually deleted
    await request(app).get(`/users/${createdUser.id}`).expect(404);
  });

  test('should return 404 when user does not exist', async () => {
    const nonExistentId = createdUser.id + 1000;
    const response = await request(app)
      .delete(`/users/${nonExistentId}`)
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'User not found');
  });
});
