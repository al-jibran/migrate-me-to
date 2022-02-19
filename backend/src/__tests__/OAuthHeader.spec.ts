import OAuthHeader from '../utility/OAuthHeader';

enum METHOD {
	POST = 'POST',
	GET = 'GET',
}

describe('OAuth Header', () => {
	const oauthParamsWithoutToken =
		/OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="\w+", oauth_signature="[a-zA-z0-9%]+", oauth_signature_method="HMAC-SHA1", oauth_timestamp="\d+", oauth_version="1.0"/g;

	const oauthParamsWithToken =
		/OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="\w+", oauth_signature="[a-zA-z0-9%]+", oauth_signature_method="HMAC-SHA1", oauth_timestamp="\d+", oauth_token="[a-zA-z0-9%]+", oauth_version="1.0"/g;

	const validSignature =
		/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$/g;

	const request = {
		method: METHOD.POST,
		uri: 'https://api.twitter.com/1.1/statuses/update.json?include_entities=true',
		data: { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' },
	};

	let header: OAuthHeader;

	beforeEach(() => {
		header = new OAuthHeader('xvz1evFS4wEEPTGEFPHBog', 'def');
	});

	it('returns a header string without token', () => {
		const headerString = header.getHeaderString(request);
		expect(headerString).toMatch(oauthParamsWithoutToken);
	});

	it('returns a header string with token', () => {
		const headerString = header.getHeaderString(request, {
			oauth_token: 'abcdefghi',
			tokenSecret: 'secret',
		});
		expect(headerString).toMatch(oauthParamsWithToken);
	});

	it('returns a valid base64 string encoded signature with getEncryptedSignature', () => {
		const signature = header.getEncryptedSignature(request);

		expect(signature).toMatch(validSignature);
	});

	describe('get queries from the url', () => {
		const urlParams = (url: string): string[] => {
			const urlSplit = url.split('?');
			const urlParams = urlSplit.length > 1 ? urlSplit[1] : '';

			return header.getUrlQueries(urlParams);
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
