import OAuthHeader from '../utility/OAuthHeader';
import * as utility from '../utility';
import crypto from 'crypto';

enum METHOD {
	POST = 'POST',
	GET = 'GET',
}

describe('OAuth Header', () => {
	const headerWithoutToken =
		'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_version="1.0"';

	const headerWithToken =
		'OAuth oauth_consumer_key="xvz1evFS4wEEPTGEFPHBog", oauth_nonce="kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg", oauth_signature="tnnArxj06cWHq44gCs1OSKk%2FjLY%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1318622958", oauth_token="370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb", oauth_version="1.0"';

	const apiKey = 'xvz1evFS4wEEPTGEFPHBog';
	const apiSecret = 'kAcSOqF21Fu85e7zjz7ZN2U4ZRhfV3WpwPAoE3Z7kBw';
	const oauth_token = '370773112-GmHxMAgYyLbNEtIKZeRNFsMKPR9EyMZeS9weJAEb';
	const oauth_token_secret = 'LswwdoUaIvS8ltyTt5jkRh4J50vUPVVHtR2YPi5kE';

	const request = {
		method: METHOD.POST,
		uri: 'https://api.twitter.com/1.1/statuses/update.json?include_entities=true',
	};

	const data = { status: 'Hello Ladies + Gentlemen, a signed OAuth request!' };

	let header: OAuthHeader;
	let spiedOnCrypto: jest.SpyInstance;

	beforeEach(() => {
		header = new OAuthHeader(apiKey, apiSecret);

		jest.spyOn(utility, 'getTimestamp').mockImplementation(() => '1318622958');

		jest
			.spyOn(utility, 'randomStringGenerator')
			.mockImplementation(() => 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg');
	});

	describe('getHeaderString', () => {
		beforeEach(() => {
			// since getEncryptSignature method is private in class,
			// we are stubbing the method that it uses to encrypt the value.

			spiedOnCrypto = jest.spyOn(crypto, 'createHmac').mockImplementation(
				jest.fn().mockImplementation(() => ({
					update: () => ({
						digest: jest.fn().mockReturnValue('tnnArxj06cWHq44gCs1OSKk/jLY='),
					}),
				}))
			);
		});

		it('returns a header string without token', () => {
			const receivedString = header.getHeaderString(request);
			expect(receivedString).toMatch(headerWithoutToken);
		});

		it('returns a header string with token', () => {
			const receivedString = header.getHeaderString(
				request,
				{},
				{
					oauth_token,
				}
			);

			expect(receivedString).toMatch(headerWithToken);
		});

		it('returns a header without data to send in header', () => {
			const receivedString = header.getHeaderString(request, data, { oauth_token });
			expect(receivedString).toMatch(headerWithToken);
		});

		describe('signature', () => {
			it('is encrypted with apiKey only when oauth_token_secret is not given', () => {
				expect(crypto.createHmac).toHaveBeenCalledWith('sha1', `${apiSecret}&`);
			});

			it('is encrypted with apiKey and oauth_token_secret when it is given', () => {
				header.getHeaderString(request, data, {
					oauth_token,
					oauth_token_secret,
				});

				expect(crypto.createHmac).toHaveBeenCalledWith(
					'sha1',
					`${apiSecret}&${oauth_token_secret}`
				);
			});

	});
});
