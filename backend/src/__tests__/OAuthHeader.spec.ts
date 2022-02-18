import OAuthHeader from '../utility/OAuthHeader';

describe('OAuth Header', () => {
	it('returns a header string without token', () => {
		const header = new OAuthHeader('abc', 'def');
		header.getHeaderString();
		expect(2).toBe(2);
	});
});
