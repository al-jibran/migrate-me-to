import { uriPercentEncode } from '../utility';

describe('encoding of string', () => {
	const test1 = 'Ladies + Gentlemen';
	const test2 = 'An encoded string!';
	const test3 = 'Dogs, Cats & Mice';
	const test4 = 'ƒ';

	it('encodes strings correctly', () => {
		expect(uriPercentEncode(test1)).toBe('Ladies%20%2B%20Gentlemen');
		expect(uriPercentEncode(test2)).toBe('An%20encoded%20string%21');
		expect(uriPercentEncode(test3)).toBe('Dogs%2C%20Cats%20%26%20Mice');
		expect(uriPercentEncode(test4)).toBe('%C6%92');
	});

	it('does not encode the character given an exception', () => {
		expect(uriPercentEncode(test1, [' ', '+'])).toBe(test1);
		expect(uriPercentEncode(test2, ['!'])).toBe('An%20encoded%20string!');
	});
});
