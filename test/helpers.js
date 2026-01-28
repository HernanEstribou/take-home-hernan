import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.user.deleteMany({});
}

export async function createTestUsers(data = {}) {
  return await prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
}
