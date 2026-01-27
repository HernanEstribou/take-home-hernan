import { prisma } from '../src/config/prisma.js';

// Teardown global después de todos los tests
export default async function globalTeardown() {
  console.log(' Cleaning up test database...');
  await prisma.$disconnect();
  console.log('Test database disconnected!');
}
