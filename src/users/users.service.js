import * as userRepository from './users.repository.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

const getAllUsers = () => {
  const response = userRepository.getAllUsers();

  return response;
};

const getOneUser = async (id) => {
  const response = await userRepository.getOneUser(id);
  return response;
};

const createNewUser = async (user) => {
  const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);
  const response = await userRepository.createNewUser({
    ...user,
    password: hashedPassword,
  });

  return response;
};

const updateOneUser = async (id, userDto) => {
  const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);
  const response = await userRepository.updateOneUser(id, {
    ...userDto,
    password: hashedPassword,
  });
  return response;
};

const deleteOneUser = async (id) => {
  const response = await userRepository.deleteOneUser(id);
  return response;
};

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser };
