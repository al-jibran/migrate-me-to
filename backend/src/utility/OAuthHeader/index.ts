import crypto from 'crypto';
import { HeaderType, Request, Token } from './types';
import { uriPercentEncode, randomStringGenerator, getUrlQueries, getTimestamp } from '..';

class OAuthHeader {
	private oAuthParams: HeaderType = {
		oauth_consumer_key: '',
		oauth_nonce: '',
		oauth_signature_method: '',
		oauth_timestamp: '',
		oauth_version: '',
	};

	private consumerSecret: string;
	private tokenSecret = '';

	constructor(consumerKey: string, consumerSecret: string) {
		this.consumerSecret = consumerSecret;

		this.oAuthParams['oauth_consumer_key'] = consumerKey;
		this.oAuthParams['oauth_signature_method'] = 'HMAC-SHA1';
		this.oAuthParams['oauth_version'] = '1.0';
	}

	getHeaderString = (
		request: Request,
		additionalParams?: Record<string, string>,
		token?: Token
	): string => {
		this.oAuthParams['oauth_timestamp'] = getTimestamp();
		this.oAuthParams['oauth_nonce'] = randomStringGenerator();

		if (token) {
			this.oAuthParams['oauth_token'] = token.oauth_token;
			this.tokenSecret = token.oauth_token_secret || '';
		}

		// signature methods requires every oauth parameter in its encoded form.
		const encodedParamsForSignature: string[] =
			this.#getOAuthStrings(additionalParams);

		this.oAuthParams['oauth_signature'] = this.getEncryptedSignature(
			request,
			encodedParamsForSignature
		);

		const encodedSignature = uriPercentEncode(
			this.oAuthParams['oauth_signature']
		);

		// every other oauth param has already been encoded and sorted for oauth_signature.
		// Now that we have oauth_signature, we can encode it and sort it with the others.
		const completeOAuthParams = encodedParamsForSignature
			.concat(`oauth_signature=${encodedSignature}`)
			.sort();

		const headerString = `OAuth ${completeOAuthParams.join(', ')}`;

		return headerString;
	};

	getEncryptedSignature = (request: Request, paramsForSignature: string[]) => {
		const signature = this.#getSignature(request, paramsForSignature);
		const secretKey = `${this.consumerSecret}&${this.tokenSecret}`;

		return crypto
			.createHmac('sha1', secretKey)
			.update(signature)
			.digest('base64');
	};

	#getOAuthStrings = (additionalParams?: Record<string, string>): string[] => {
		const params = { ...this.oAuthParams, ...additionalParams };
		return this.#encodeAndSort(params);
	};

	#encodeAndSort = (params: Record<string, string>) => {
		const oauthStrings = [];

		for (const key in params) {
			const value = params[key] || '';
			const oauthString = `${uriPercentEncode(key)}="${uriPercentEncode(
				value
			)}"`;

			oauthStrings.push(oauthString);
		}

		return oauthStrings.sort();
	};

	};

	#getSignature = (
		{ method, uri, data }: Request,
		paramsForSignature: string[]
	): string => {
		// Collecting information to sign
		const urlAndQuery = uri.split('?');
		const url = urlAndQuery[0] || '';
		const queryString = urlAndQuery[1];

		const queryParams: string[] = getUrlQueries(queryString);

		const oAuthParams: string[] = paramsForSignature.map((v) =>
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
