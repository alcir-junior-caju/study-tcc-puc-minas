const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  collectCoverage: true,
  collectCoverageFrom: ['./src/*.{ts,tsx}'],
  coverageDirectory: './coverage',
  coverageReporters: ['text-summary', 'text', 'lcov'],
  verbose: true,
};
