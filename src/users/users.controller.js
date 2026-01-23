import express from 'express';
import Joi from 'joi';
import * as usersService from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { UserResponseDto } from './dto/user-response.dto.js';

const router = express.Router();

const idSchema = Joi.number().integer().positive().required();

// Ruta: GET /users
router.get('/', async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Retrieves a list of all users from the database'

  try {
    const users = await usersService.getAllUsers();
    const usersDto = users.map((user) => new UserResponseDto(user));

    res.status(200).json(usersDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching users', error: error.message });
  }
});

// Ruta: GET /users/:id
router.get('/:id', async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get user by ID'
  // #swagger.description = 'Retrieves a specific user by their ID'

  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const user = await usersService.getOneUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDto = new UserResponseDto(user);

    res.status(200).json(userDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error fetching user', error: error.message });
  }
});

// Ruta: POST /users
router.post('/', async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create a new user'
  // #swagger.description = 'Creates a new user with email and password'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User information',
      required: true,
      schema: { $ref: '#/definitions/CreateUser' }
  } */

  const { email, password } = req.body;

  try {
    const userDto = new CreateUserDto({ email, password });

    const validation = userDto.validate();

    if (!validation.valid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validation.errors,
      });
    }

    const user = await usersService.createNewUser(userDto);
    const userResponseDto = new UserResponseDto(user);

    res.status(201).json(userResponseDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error creating user', error: error.message });
  }
});

// Ruta: PUT /users/:id
router.put('/:id', async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update a user'
  // #swagger.description = 'Updates an existing user with new email and password'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated user information',
      required: true,
      schema: { $ref: '#/definitions/UpdateUser' }
  } */

  const { email, password } = req.body;

  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const userDto = new UpdateUserDto({ email, password });

    const validation = userDto.validate();

    if (!validation.valid) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: validation.errors,
      });
    }
    const user = await usersService.updateOneUser(req.params.id, userDto);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponseDto = new UserResponseDto(user);

    res.status(200).json(userResponseDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating user', error: error.message });
  }
});

//Ruta: DELETE /users/:id
router.delete('/:id', async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete a user'
  // #swagger.description = 'Deletes a user by their ID'

  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const user = await usersService.deleteOneUser(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userResponseDto = new UserResponseDto(user);

    res.status(200).json(userResponseDto);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting user', error: error.message });
  }
});

export default router;
