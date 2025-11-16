export default {
    testEnvironment: 'node',
    coverageDirectory: 'coverage',
    collectCoverageFrom: [
      'src/**/*.js',
      '!src/server.js'
    ],
    testMatch: [
      '**/tests/**/*.test.js'
    ],
    transform: {},
    moduleNameMapper: {
      '^@/(.*)$': '/src/$1'
    },
    setupFilesAfterEnv: ['/tests/setup.js']
  };