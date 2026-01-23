import { prisma } from '../config/prisma.js';

const getAllUsers = async () => {
  const users = await prisma.user.findMany();
  return users;
};

const getOneUser = async (id) => {
  const user = await prisma.user.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  return user;
};

const createNewUser = async (user) => {
  const newUser = await prisma.user.create({
    data: {
      email: user.email,
      password: user.password,
    },
  });

  return newUser;
};

const updateOneUser = async (id, userDto) => {
  const userIdInt = parseInt(id);

  const existingUser = await prisma.user.findUnique({
    where: { id: userIdInt },
  });

  if (!existingUser) {
    return null;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: userIdInt,
    },
    data: userDto,
  });

  return updatedUser;
};

const deleteOneUser = async (id) => {
  const userIdInt = parseInt(id);

  const existingUser = await prisma.user.findUnique({
    where: { id: userIdInt },
  });

  if (!existingUser) {
    return null;
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userIdInt,
    },
  });

  return deletedUser;
};

export { getAllUsers, getOneUser, createNewUser, updateOneUser, deleteOneUser };
