/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'], // busca tests dentro de /src
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1', // soporte para alias "@"
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  clearMocks: true,
  verbose: true,
};
