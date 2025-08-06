module.exports = {
    testEnvironment: 'jsdom',
    transform: {
        '^.+\.tsx?$': 'ts-jest',
        '^.+\.jsx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!chai)/', // transform chai, ignore others
    ],
};