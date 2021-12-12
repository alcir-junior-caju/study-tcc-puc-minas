const { name } = require('./package.json');

module.exports = {
  displayName: name,
  name,
  collectCoverage: true,
  collectCoverageFrom: ['./src/*.ts'],
  coverageDirectory: './coverage',
  coverageReporters: ['text-summary', 'text', 'lcov'],
  verbose: true,
};
