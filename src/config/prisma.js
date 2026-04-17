import { config } from 'dotenv';
import { PrismaClient } from '../generated/prisma/index.js';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// En CI (CircleCI setea CI=true automáticamente), usar las variables del entorno
// En local, siempre cargar .env.test con override para evitar usar base de datos de producción
if (process.env.NODE_ENV === 'test') {
  if (!process.env.CI) {
    config({ path: resolve(__dirname, '../../.env.test'), override: true });
  }
} else {
  config();
}

const prisma = new PrismaClient();

export { prisma };
