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
	preset: 'ts-jest',
};
