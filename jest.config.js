export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['js', 'json'],
  testMatch: ['**/test/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/generated/**'],
  coverageDirectory: 'coverage',
  verbose: true,
  forceExit: true, //Forzar salida después de los tests
  detectOpenHandles: true,
  silent: false, // Mostrar console.log en tests
  testTimeout: 10000, // 10 segundos por test (default: 5s)
  globalSetup: './test/setup.js',
  globalTeardown: './test/teardown.js',
  setupFiles: ['dotenv/config'],
};
