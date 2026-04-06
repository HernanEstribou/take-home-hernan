import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Cargar variables de entorno de test (override: true para sobreescribir cualquier DATABASE_URL heredada del entorno)
config({ path: resolve(__dirname, '../.env.test'), override: true });

// Setup global antes de todos los tests
export default async function globalSetup() {
  console.log('Setting up test database...');

  try {
    // Crear la base de datos si no existe y ejecutar migraciones
    // --skip-generate evita regenerar Prisma Client (evita conflicto de archivos)
    execSync('npx prisma migrate reset --force --skip-seed --skip-generate', {
      stdio: 'inherit',
      env: { ...process.env, DATABASE_URL: process.env.DATABASE_URL, NODE_ENV: 'test' },
    });

    console.log('Test database ready!');
  } catch (error) {
    console.error('Error setting up test database:', error);
    throw error;
  }
}
