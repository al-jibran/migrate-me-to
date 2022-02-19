import crypto from 'crypto-js';
import { uriPercentEncode } from './uriPercentEncode';

interface Token {
	oauth_token: string;
	tokenSecret: string;
}

interface Request {
	method: METHOD;
	uri: string;
	data?: Record<string, string>;
}

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

	getHeaderString = (request: Request, token?: Token): string => {
		if (token) {
			this.#oAuthParams['oauth_token'] = token.oauth_token;
			this.#tokenSecret = token.tokenSecret;
		}

		this.#oAuthParams['oauth_signature'] = this.getEncryptedSignature(request);

		const headerString = `OAuth ${this.getOAuthStrings().join(', ')}`;

		return headerString;
	};

	getEncryptedSignature = (request: Request) => {
		const signature = this.getSignature(request);
		const secretKey = `${this.#consumerSecret}&${this.#tokenSecret}`;

		return crypto.HmacSHA1(signature, secretKey).toString();
	};

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

	getSignature = ({ method, uri, data }: Request): string => {
		// Collecting information to sign
		const urlAndQuery = uri.split('?');
		const url = urlAndQuery[0] || '';
		const queryString = urlAndQuery[1];

		const queryParams: string[] = this.getUrlQueries(queryString);

		const oAuthParams: string[] = this.getOAuthStrings().map((v) =>
			v.replace(/"/g, '')
		);

		let dataEncoded: string[] = [];

		// data will be defined only with POST requests.
		if (data) {
			dataEncoded = Object.keys(data).map((k) => {
				const encodedKey = uriPercentEncode(k);
				const encodedValue = uriPercentEncode(data[k] || '');
				return `${encodedKey}=${encodedValue}`;
			});
		}

		// Percent encoding the information to sign
		
		const methodAndUrlParams = `${method.toUpperCase()}&${uriPercentEncode(
			url
		)}`;

		const signatureParam = queryParams
			.concat(oAuthParams)
			.concat(dataEncoded)
			.sort()
			.join('&');

		return `${methodAndUrlParams}&${uriPercentEncode(signatureParam)}`;
	};
}

export default OAuthHeader;
