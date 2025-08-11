module.exports = {
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/apps/domains/src/$1',
        '^test/utils$': '<rootDir>/test/utils.ts',
        '^@mui/utils/macros/MuiError\\.macro$': '<rootDir>/test/mocks/MuiError.js'
    },
    moduleFileExtensions: ['js', 'mjs', 'cjs', 'jsx', 'ts', 'mts', 'cts', 'tsx', 'json', 'node'],
    transformIgnorePatterns: [
        '/node_modules/(?!chai)/', // transform chai, ignore others
    ],
    setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    testMatch: [
        '**/__tests__/**/*.(ts|tsx|js)',
        '**/*.(test|spec).(ts|tsx|js)'
    ]
};