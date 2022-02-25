/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
	roots: ['<rootDir>/src'],
	testMatch: [
		'<rootDir>/src/__tests__/**/*.+(ts|tsx|js)',
		'<rootDir>/src/?(*.)+(spec|test).+(ts|tsx|js)',
	],
	transform: {
		'^.+\\.(ts)$': 'ts-jest',
	},
	testPathIgnorePatterns: ['<rootDir>/src/__tests__/__utils__'],
	preset: 'ts-jest',
};
