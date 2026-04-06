import { PrismaClient } from '../src/generated/prisma/index.js';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

config({ path: resolve(__dirname, '../.env.test'), override: true });

const prisma = new PrismaClient();

export async function cleanDatabase() {
  await prisma.notification.deleteMany({});
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

export async function createTestNotifications(data = {}) {
  return await prisma.notification.create({
    data: {
      userId: data.userId,
      title: data.title,
      content: data.content,
      channel: data.channel,
      recipient: data.recipient,
    },
  });
}

export function generateTestToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h',
  });
}
