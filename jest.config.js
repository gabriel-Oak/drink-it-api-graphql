require('reflect-metadata');

/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@App/(.*)$': '<rootDir>/src/$1',
    '^lib/(.*)$': '<rootDir>/common/$1',
  },
  coveragePathIgnorePatterns: [
    '/dist/',
    '/node_modules/',
  ],
  testMatch: [
    '**/?(*.)+(spec|test).[tj]s?(x)',
  ],
  setupFiles: [
    '<rootDir>/jest.global.js',
  ],
};
