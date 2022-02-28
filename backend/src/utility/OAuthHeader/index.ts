import crypto from 'crypto';
import { AdditionalOauth, HeaderType, Request } from './types';
import { uriPercentEncode, randomStringGenerator, getUrlQueries, getTimestamp } from '..';
import { ProxyError } from '../../Errors';

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

	/**
	 * This method generates a header string that is used for Authorization of OAuth 1.0 requests.
	 * @param request A request object that contains uri endpoint to send request to and HTTP Method like GET, POST, etc.
	 * @param additionalOAuthParams An optional object that may contain oauth_callback, oauth_verifier, oauth_token (access token), oauth_token_secret (access token secret)
	 * @param dataToSend An optional object that may contain data to send with POST methods.
	 * @returns A string to be used in the Authorization Header for making oauth requests.
	 */
	getHeaderString = (
		request: Request,
		additionalOAuthParams?: AdditionalOauth,
		dataToSend: Record<string, string> = {}
	): string => {
		this.oAuthParams['oauth_timestamp'] = getTimestamp();
		this.oAuthParams['oauth_nonce'] = randomStringGenerator();

		if (additionalOAuthParams) {
			Object.keys(additionalOAuthParams).forEach((param) => {
				const value = additionalOAuthParams[param as keyof AdditionalOauth];

				if (!value) {
					throw new ProxyError('Could not create header for OAuth Request', 500);
				}

				if (param === 'oauth_token_secret') this.tokenSecret = value;
				else this.oAuthParams[param] = value;
			});
		}

		// signature methods requires every oauth parameter and addition info like queries, data, etc. in its encoded form.
		const encodedParamsForSignature: string[] = this.getOAuthStrings(dataToSend);

		this.oAuthParams['oauth_signature'] = this.getEncryptedSignature(
			request,
			encodedParamsForSignature
		);

		const completeOAuthParams = this.getOAuthStrings();

		const headerString = `OAuth ${completeOAuthParams.join(', ')}`;

		return headerString;
	};

	private getOAuthStrings = (additionalParams: Record<string, string> = {}): string[] => {
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
