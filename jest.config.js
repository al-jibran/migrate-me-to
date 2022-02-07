/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	roots: ['<rootDir>/src'],
	testMatch: [
		'<rootDir>/src/__tests__/**/*.+(ts|tsx|js)',
		'<rootDir>/src/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	preset: 'ts-jest',
	testEnvironment: 'jest-environment-jsdom',
	testPathIgnorePatterns: ['<rootDir>/e2e/'],
};
