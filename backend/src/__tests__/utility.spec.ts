import { getUrlQueries, uriPercentEncode } from '../utility';

describe('utility', () => {
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

	describe('get queries from the url', () => {
		const urlParams = (url: string): string[] => {
			const urlSplit = url.split('?');
			const urlParams = urlSplit.length > 1 ? urlSplit[1] : '';

			return getUrlQueries(urlParams);
		};

		it('returns an empty array when the string provided is empty', () => {
			const url = 'https://www.twitter.com';
			const parameters = urlParams(url);

			expect(parameters.length).toBe(0);
		});

		it('returns a single query string', () => {
			const url = 'https://www.twitter.com?include_entities=true';
			const parameters = urlParams(url);

			expect(parameters.length).toBe(1);
			expect(parameters).toContain('include_entities=true');
		});

		it('returns list of paramters in the url', () => {
			const url =
				'https://www.twitter.com?include_entities=true&method=true&friends=false';

			const parameters = urlParams(url);

			expect(parameters.length).toBe(3);
			expect(parameters).toContain('include_entities=true');
			expect(parameters).toContain('method=true');
			expect(parameters).toContain('friends=false');
		});
	});
});
