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

	it('returns a valid signature with getSignature', () => {
		const signature = header.getSignature(
			METHOD.POST,
			'https://api.twitter.com/1.1/statuses/update.json',
			{ status: 'Hello Ladies + Gentlemen, a signed OAuth request!' }
		);

		expect(signature).toMatch(validSignature);
	});
});
