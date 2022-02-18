import OAuthHeader from '../utility/OAuthHeader';

describe('OAuth Header', () => {
	const validHeaderString =
		/OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce=".+", oauth_signature=".+", oauth_signature_method="HMAC-SHA1", oauth_timestamp="\d+",( oauth_token=".+",)? oauth_version="1.0"/g;

	it('returns a header string without token', () => {
		const header = new OAuthHeader('xvz1evFS4wEEPTGEFPHBog', 'def');
		const headerString = header.getHeaderString();
		expect(headerString).toMatch(validHeaderString);
	});
});
