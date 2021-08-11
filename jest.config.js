module.exports = {
  testEnvironment: 'jsdom',
  setupFiles: ['./test/setupJest.js'],
  testPathIgnorePatterns: ['/node_modules/', '/examples/', '/lib/'],
  timers: 'fake',
  resetModules: true,
  resetMocks: true,
};
