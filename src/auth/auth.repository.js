import { prisma } from '../config/prisma.js';

const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export { findUserByEmail };
