import request from 'supertest';
import app from '../src/app.js';
import {
  jest,
  describe,
  test,
  expect,
  beforeEach,
  afterEach,
} from '@jest/globals';

describe('GET /users', () => {
  test('Should respond with a 200 status code', async () => {
    const response = await request(app).get('/users').expect(200);

    expect(Array.isArray(response.body)).toBe(true);

    if (response.body > 0) {
      const user = response.body[0];

      expect(user).toHaveProperty('id');
      expect(user).toHaveProperty('email');
    }
  });
});
