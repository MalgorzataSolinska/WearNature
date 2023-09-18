// jest.config.cjs

const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  testEnvironment: 'jsdom', // Use jsdom for testing React components
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Use Babel for JavaScript/JSX files
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Handle CSS imports
  },
  // Other Jest configuration options...
};
