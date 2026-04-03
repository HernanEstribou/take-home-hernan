import swaggerAutogen from 'swagger-autogen';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { UpdateUserDto } from '../users/dto/update-user.dto.js';
import { UserResponseDto } from '../users/dto/user-response.dto.js';
import { CreateNotificationDto } from '../notifications/dto/create-notification.dto.js';
import { UpdateNotificationDto } from '../notifications/dto/update-notification.dto.js';
import { NotificationResponseDto } from '../notifications/dto/notification-response.js';

const outputFile = './swagger.json';
const endpointsFile = ['./src/app.js'];

const doc = {
  info: {
    title: 'Notifications API',
    description: 'API for managing users, authentication and notifications',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      in: 'header',
      name: 'Authorization',
      description: 'Enter: Bearer <token>',
    },
  },
  definitions: {
    User: UserResponseDto.swaggerSchema(),
    CreateUser: CreateUserDto.swaggerSchema(),
    UpdateUser: UpdateUserDto.swaggerSchema(),
    Notification: NotificationResponseDto.swaggerSchema(),
    CreateNotification: CreateNotificationDto.swaggerSchema(),
    UpdateNotification: UpdateNotificationDto.swaggerSchema(),
    Login: {
      email: 'user@example.com',
      password: 'password123',
    },
    Token: {
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    Error: {
      message: 'Error message',
      error: 'Error details',
    },
    ValidationError: {
      message: 'Validation failed',
      errors: ['Field is required'],
    },
  },
};

swaggerAutogen()(outputFile, endpointsFile, doc);
