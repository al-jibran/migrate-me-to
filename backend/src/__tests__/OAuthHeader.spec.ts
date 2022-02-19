import OAuthHeader from '../utility/OAuthHeader';

enum METHOD {
	POST = 'POST',
	GET = 'GET',
}

describe('OAuth Header', () => {
	const validHeaderString =
		/OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="\w+", oauth_signature="[a-zA-z0-9%]+.+", oauth_signature_method="HMAC-SHA1", oauth_timestamp="\d+",( oauth_token="[a-zA-z0-9%]+",)? oauth_version="1.0"/g;

	const validSignature = `POST&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fstatuses%2Fupdate.json&include_entities%3Dtrue%26${validHeaderString}%26status%3DHello%2520Ladies%2520%252B%2520Gentlemen%252C%2520a%2520signed%2520OAuth%2520request%2521`;

	let header: OAuthHeader;
	beforeEach(() => {
		header = new OAuthHeader('xvz1evFS4wEEPTGEFPHBog', 'def');
	});

	it('returns a header string without token', () => {
		const headerString = header.getHeaderString();
		expect(headerString).toMatch(validHeaderString);
	});

	describe('get queries from the url', () => {
		it('returns an empty array when the string provided is empty', () => {
			const url = 'https://www.twitter.com';

			const urlSplit = url.split('?');
			const urlParams = urlSplit.length > 1 ? urlSplit[1] : '';

			const parameters: string[] = header.getUrlQueries(urlParams);

			expect(parameters.length).toBe(0);
		});

		it('returns a single query string', () => {
			const url = 'https://www.twitter.com?include_entities=true';

			const urlSplit = url.split('?');
			const urlParams = urlSplit.length > 1 ? urlSplit[1] : '';

			const parameters: string[] = header.getUrlQueries(urlParams);

			expect(parameters.length).toBe(1);
			expect(parameters).toContain('include_entities=true');
		});

		it('returns list of paramters in the url', () => {
			const url =
				'https://www.twitter.com?include_entities=true&method=true&friends=false';

			const urlSplit = url.split('?');
			const urlParams = urlSplit.length > 1 ? urlSplit[1] : '';

			const parameters: string[] = header.getUrlQueries(urlParams);

			expect(parameters.length).toBe(3);
			expect(parameters).toContain('include_entities=true');
			expect(parameters).toContain('method=true');
			expect(parameters).toContain('friends=false');
		});
	});

	it('returns a valid signature with getSignature', () => {
		const signature = header.getSignature(
			METHOD.POST,
			'https://api.twitter.com/1.1/statuses/update.json',
			{ status: 'Hello Ladies + Gentlemen, a signed OAuth request!' }
		);

		expect(signature).toMatch(validSignature);
	});
});
