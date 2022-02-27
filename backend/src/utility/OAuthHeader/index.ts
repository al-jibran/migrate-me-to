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

		// signature methods requires every oauth parameter and addition info like queries, data, etc. in its encoded form.
		const encodedParamsForSignature: string[] = this.getOAuthStrings(additionalParams);

		this.oAuthParams['oauth_signature'] = this.getEncryptedSignature(
			request,
			encodedParamsForSignature
		);

		const completeOAuthParams = this.getOAuthStrings();

		const headerString = `OAuth ${completeOAuthParams.join(', ')}`;

		return headerString;
	};

	private getOAuthStrings = (additionalParams?: Record<string, string>): string[] => {
		const params = { ...this.oAuthParams, ...additionalParams };
		return this.encodeAndSort(params);
	};

	private encodeAndSort = (params: Record<string, string>) => {
		const oauthStrings = [];
		for (const key in params) {
			const value = params[key] || '';
			const oauthString = `${uriPercentEncode(key)}="${uriPercentEncode(value)}"`;

			oauthStrings.push(oauthString);
		}

		return oauthStrings.sort();
	};

	private getEncryptedSignature = (request: Request, paramsForSignature: string[]) => {
		const signature = this.createSignature(request, paramsForSignature);
		const secretKey = `${this.consumerSecret}&${this.tokenSecret}`;

		return crypto.createHmac('sha1', secretKey).update(signature).digest('base64');
	};

	private createSignature = ({ method, uri }: Request, paramsForSignature: string[]): string => {
		// Separates url from its queries.
		const urlAndQuery = uri.split('?');
		const url = urlAndQuery[0] || '';
		const queryString = urlAndQuery[1];

		const queryParams: string[] = getUrlQueries(queryString);

		// removing " " attached when params were created as header params
		const oAuthParams: string[] = paramsForSignature.map((v) => v.replace(/"/g, ''));

		// Percent encoding the information to sign
		const methodAndUrlParams = `${method.toUpperCase()}&${uriPercentEncode(url)}`;

		const signatureParam = queryParams.concat(oAuthParams).sort().join('&');

		return `${methodAndUrlParams}&${uriPercentEncode(signatureParam)}`;
	};
}

export default OAuthHeader;
