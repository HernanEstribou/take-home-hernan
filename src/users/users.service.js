import * as userRepository from './users.repository.js';

const getAllUsers = () => {
  const response = userRepository.getAllUsers();

  return response;
};

const getOneUser = async (id) => {
  const response = await userRepository.getOneUser(id);
  return response;
};

const createNewUser = (user) => {
  const response = userRepository.createNewUser(user);

  return response;
};

const updateOneUser = async (id, userDto) => {
  const response = await userRepository.updateOneUser(id, userDto);
  return response;
};

const deleteOneUser = async (id) => {
  const response = await userRepository.deleteOneUser(id);
  return response;
};

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser };
