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

	getOAuthStrings = (additionalParams?: Record<string, string>): string[] => {
		const oauthStrings: string[] = [];
		const params = { ...this.#oAuthParams, ...additionalParams };

		for (const key in params) {
			const value = params[key] || '';
			const oauthString = `${uriPercentEncode(key)}="${uriPercentEncode(
				value
			)}"`;

			oauthStrings.push(oauthString);
		}

		return oauthStrings.sort();
	};

	getUrlQueries = (queries: string | undefined): string[] => {
		if (!queries) return [];

		const queryToAppend: string[] = queries.length ? queries.split('&') : [];

		return queryToAppend;
	};

	getHeaderString = (): string => {
		this.#consumerSecret;
		const headerString = `OAuth ${this.getOAuthStrings({
			oauth_signature: '3843euwfheuksd7282hdsu',
		}).join(', ')}`;

		return headerString;
	};

}

export default OAuthHeader;
