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

// Ruta: GET /users
router.get('/:id', async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const user = await usersService.getOneUser(req.params.id);
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
  try {
    const userDto = new CreateUserDto(req.body);

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

// Ruta: PUT /users
router.put('/:id', async (req, res) => {
  try {
    const { error } = idSchema.validate(req.params.id);
    if (error) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const userDto = new UpdateUserDto(req.body);

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

//Ruta: DELETE /users
router.delete('/:id', async (req, res) => {
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
