import swaggerAutogen from 'swagger-autogen';
import { CreateUserDto } from '../users/dto/create-user.dto.js';
import { UpdateUserDto } from '../users/dto/update-user.dto.js';
import { UserResponseDto } from '../users/dto/user-response.dto.js';

const outputFile = './swagger.json';
const endpointsFile = ['./src/app.js'];

const doc = {
  info: {
    title: 'API users',
    description: 'This API is for managing users',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  schemes: ['http'],
  definitions: {
    User: UserResponseDto.swaggerSchema(),
    CreateUser: CreateUserDto.swaggerSchema(),
    UpdateUser: UpdateUserDto.swaggerSchema(),
    Error: {
      message: 'Error message',
      error: 'Error details',
    },
    ValidationError: {
      message: 'Validation failed',
      errors: ['Email is required', 'Password must be at least 6 characters'],
    },
  },
};

swaggerAutogen()(outputFile, endpointsFile, doc);
