import { uriPercentEncode } from './uriPercentEncode';

interface HeaderType extends Record<string, string> {
	oauth_consumer_key: string;
	oauth_signature_method: string;
	oauth_timestamp: string;
	oauth_version: string;
}

enum METHOD {
	POST = 'POST',
	GET = 'GET',
}

class OAuthHeader {
	#oAuthParams: HeaderType = {
		oauth_consumer_key: '',
		oauth_nonce: 'kYjzVBB8Y0ZFabxSWbWovY3uYSQ2pTgmZeNu2VS4cg',
		oauth_signature_method: '',
		oauth_timestamp: '',
		oauth_version: '',
	};

	#consumerSecret: string;

	constructor(consumerKey: string, consumerSecret: string) {
		this.#consumerSecret = consumerSecret;

		this.#oAuthParams['oauth_consumer_key'] = consumerKey;
		this.#oAuthParams['oauth_signature_method'] = 'HMAC-SHA1';
		this.#oAuthParams['oauth_version'] = '1.0';
		this.#oAuthParams['oauth_timestamp'] = Date.now().toString();
	}
}

export default OAuthHeader;
