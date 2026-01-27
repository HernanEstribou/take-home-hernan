import { config } from 'dotenv';
import { PrismaClient } from '../generated/prisma/index.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar .env.test si estamos en modo test
if (process.env.NODE_ENV === 'test') {
  config({ path: resolve(__dirname, '../../.env.test'), override: true });
} else {
  config();
}

const prisma = new PrismaClient();

export { prisma };
