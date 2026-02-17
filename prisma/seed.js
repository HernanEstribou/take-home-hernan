import { PrismaClient } from '../src/generated/prisma/index.js';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

// Simple password hashing
function hashPassword(password) {
  return createHash('sha256').update(password).digest('hex');
}

const mockUsers = [
  {
    email: 'john.doe@example.com',
    password: hashPassword('password123'),
  },
  {
    email: 'jane.smith@example.com',
    password: hashPassword('password456'),
  },
  {
    email: 'bob.wilson@example.com',
    password: hashPassword('password789'),
  },
];

async function seed() {
  console.log('Starting seed...');

  for (const user of mockUsers) {
    try {
      await prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: user,
      });
      console.log(`✓ Created/Updated user: ${user.email}`);
    } catch (error) {
      console.error(`✗ Error with user ${user.email}:`, error.message);
    }
  }

  console.log('Seed completed!');
}

seed()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
