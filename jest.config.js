module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['./test/jest-setup.ts'],
  testPathIgnorePatterns: ['/node_modules/', '/examples/', '/lib/'],
  timers: 'fake',
  resetModules: true,
  resetMocks: true,
};
