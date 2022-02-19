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
});
