import { normalizeClass } from '../../utility/normalizeClass';

describe('utility', () => {
	describe('normalizeClass', () => {
		it('concatenates and adds the screen size prefix to every class', () => {
			const classesObject = {
				mobile: 'text-white bg-black',
				sm: 'sm:p-3 sm:m-4',
				dark: 'dark:text-green dark:bg-gray-200',
			};

			expect(normalizeClass(classesObject)).toMatch(
				'text-white bg-black sm:p-3 sm:m-4 dark:text-green dark:bg-gray-200'
			);
		});

		it('returns an empty string on an empty object', () => {
			expect(normalizeClass({})).toMatch('');
		});

		it('throws an error given an invalid value to a key', () => {
			const obj1 = {
				mobile: 'text-white bg-black',
				sm: '32',
			};

			const obj2 = {
				mobile: '--------------[]',
			};

			const obj3 = {
				mobile: 'جبران',
			};

			expect(() => {
				normalizeClass(obj1);
			}).toThrow(TypeError);

			expect(() => {
				normalizeClass(obj2);
			}).toThrow(TypeError);

			expect(() => {
				normalizeClass(obj3);
			}).toThrowError(TypeError);
		});
	});
});
