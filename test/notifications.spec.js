import request from 'supertest';
import app from '../src/app.js';
import { describe, test, expect, beforeEach } from '@jest/globals';
import {
  cleanDatabase,
  createTestUsers,
  createTestNotifications,
  generateTestToken,
} from './helpers.js';

describe('GET /notifications/:id', () => {
  let createdUser;
  let authToken;

  beforeEach(async () => {
    await cleanDatabase();

    createdUser = await createTestUsers({
      email: 'hernan@gmail.com',
      password: '1234abcd',
    });
    authToken = generateTestToken(createdUser);

    await createTestNotifications({
      userId: createdUser.id,
      title: 'Test Notification',
      content: 'Test Content',
      channel: 'email',
      recipient: 'hernan@gmail.com',
    });
  });

  test('should return 200 and an array of notifications for the user', async () => {
    const response = await request(app)
      .get(`/notifications/${createdUser.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);

    const notification = response.body[0];
    expect(notification).toHaveProperty('title', 'Test Notification');
    expect(notification).toHaveProperty('content', 'Test Content');
    expect(notification).toHaveProperty('channel', 'email');
    expect(notification).toHaveProperty('recipient', 'hernan@gmail.com');
  });

  test('should return 400 when ID format is invalid', async () => {
    const response = await request(app)
      .get('/notifications/abc')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });

  test('should return 400 when ID is negative', async () => {
    const response = await request(app)
      .get('/notifications/-1')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });

  test('should return 401 when no token is provided', async () => {
    const response = await request(app)
      .get(`/notifications/${createdUser.id}`)
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Token not provided');
  });
});

describe('POST /notifications', () => {
  let createdUser;
  let authToken;

  beforeEach(async () => {
    await cleanDatabase();

    createdUser = await createTestUsers({
      email: 'hernan@gmail.com',
      password: '1234abcd',
    });
    authToken = generateTestToken(createdUser);
  });

  test('should return 201 and create a new notification', async () => {
    const notificationData = {
      title: 'New Notification',
      content: 'New Content',
      channel: 'email',
      recipient: 'hernan@gmail.com',
    };

    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .send(notificationData)
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('title', notificationData.title);
    expect(response.body).toHaveProperty('content', notificationData.content);
    expect(response.body).toHaveProperty('channel', notificationData.channel);
    expect(response.body).toHaveProperty(
      'recipient',
      notificationData.recipient,
    );
  });

  test('should return 400 when title is missing', async () => {
    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        content: 'Content',
        channel: 'email',
        recipient: 'hernan@gmail.com',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 400 when content is missing', async () => {
    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Title', channel: 'email', recipient: 'hernan@gmail.com' })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 400 when channel is missing', async () => {
    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'Title',
        content: 'Content',
        recipient: 'hernan@gmail.com',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 400 when recipient is missing', async () => {
    const response = await request(app)
      .post('/notifications')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Title', content: 'Content', channel: 'email' })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 401 when no token is provided', async () => {
    const response = await request(app)
      .post('/notifications')
      .send({
        title: 'Title',
        content: 'Content',
        channel: 'email',
        recipient: 'hernan@gmail.com',
      })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Token not provided');
  });
});

describe('PUT /notifications/:notificationId', () => {
  let createdUser;
  let otherUser;
  let createdNotification;
  let authToken;

  beforeEach(async () => {
    await cleanDatabase();

    createdUser = await createTestUsers({
      email: 'hernan@gmail.com',
      password: '1234abcd',
    });
    otherUser = await createTestUsers({
      email: 'other@gmail.com',
      password: '1234abcd',
    });
    authToken = generateTestToken(createdUser);

    createdNotification = await createTestNotifications({
      userId: createdUser.id,
      title: 'Original Title',
      content: 'Original Content',
      channel: 'email',
      recipient: 'hernan@gmail.com',
    });
  });

  test('should return 200 and update the notification', async () => {
    const updatedData = {
      title: 'Updated Title',
      content: 'Updated Content',
      channel: 'sms',
      recipient: '123456789',
    };

    const response = await request(app)
      .put(`/notifications/${createdNotification.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send(updatedData)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Notification updated');
    expect(response.body.data).toHaveProperty('title', updatedData.title);
    expect(response.body.data).toHaveProperty('content', updatedData.content);
    expect(response.body.data).toHaveProperty('channel', updatedData.channel);
    expect(response.body.data).toHaveProperty(
      'recipient',
      updatedData.recipient,
    );
  });

  test('should return 404 when notification does not exist', async () => {
    const nonExistentId = createdNotification.id + 1000;
    const response = await request(app)
      .put(`/notifications/${nonExistentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'T',
        content: 'C',
        channel: 'email',
        recipient: 'x@x.com',
      })
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Notification not found');
  });

  test('should return 403 when user does not own the notification', async () => {
    const otherToken = generateTestToken(otherUser);

    const response = await request(app)
      .put(`/notifications/${createdNotification.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .send({
        title: 'T',
        content: 'C',
        channel: 'email',
        recipient: 'x@x.com',
      })
      .expect(403)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Forbidden');
  });

  test('should return 400 when request data is invalid', async () => {
    const response = await request(app)
      .put(`/notifications/${createdNotification.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ title: 'Only title' })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Validation failed');
    expect(response.body).toHaveProperty('errors');
  });

  test('should return 400 when ID format is invalid', async () => {
    const response = await request(app)
      .put('/notifications/abc')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        title: 'T',
        content: 'C',
        channel: 'email',
        recipient: 'x@x.com',
      })
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });
});

describe('DELETE /notifications/:id', () => {
  let createdUser;
  let otherUser;
  let createdNotification;
  let authToken;

  beforeEach(async () => {
    await cleanDatabase();

    createdUser = await createTestUsers({
      email: 'hernan@gmail.com',
      password: '1234abcd',
    });
    otherUser = await createTestUsers({
      email: 'other@gmail.com',
      password: '1234abcd',
    });
    authToken = generateTestToken(createdUser);

    createdNotification = await createTestNotifications({
      userId: createdUser.id,
      title: 'To Delete',
      content: 'Delete Content',
      channel: 'email',
      recipient: 'hernan@gmail.com',
    });
  });

  test('should return 200 and delete the notification', async () => {
    const response = await request(app)
      .delete(`/notifications/${createdNotification.id}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(200)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Notification deleted');
    expect(response.body.data).toHaveProperty(
      'title',
      createdNotification.title,
    );
  });

  test('should return 404 when notification does not exist', async () => {
    const nonExistentId = createdNotification.id + 1000;
    const response = await request(app)
      .delete(`/notifications/${nonExistentId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .expect(404)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Notification not found');
  });

  test('should return 403 when user does not own the notification', async () => {
    const otherToken = generateTestToken(otherUser);

    const response = await request(app)
      .delete(`/notifications/${createdNotification.id}`)
      .set('Authorization', `Bearer ${otherToken}`)
      .expect(403)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Forbidden');
  });

  test('should return 400 when ID format is invalid', async () => {
    const response = await request(app)
      .delete('/notifications/abc')
      .set('Authorization', `Bearer ${authToken}`)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('message', 'Invalid ID format');
  });
});
