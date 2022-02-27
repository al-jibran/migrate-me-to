import OAuthHeader from '../utility/OAuthHeader';
import { METHOD } from '../utility/OAuthHeader/types';
import { hasOwnProperty } from '../utility';
import { Request } from '../utility/OAuthHeader/types';
import { postWithHeader } from '../api';
import { responseToObject } from '../utility';

interface AuthorizeToken {
	oauth_token: string;
	oauth_token_secret: string;
	oauth_callback_confirmed: boolean;
}

interface AccessToken {
	oauth_token: string;
	oauth_token_secret: string;
}

const isAuthorizedToken = (obj: AuthorizeToken | {}): obj is AuthorizeToken => {
	return (
		hasOwnProperty(obj, 'oauth_token') &&
		hasOwnProperty(obj, 'oauth_token_secret') &&
		hasOwnProperty(obj, 'oauth_callback_confirmed')
	);
};

const isAccessToken = (obj: AccessToken | {}): obj is AccessToken => {
	return (
		hasOwnProperty(obj, 'oauth_token') &&
		hasOwnProperty(obj, 'oauth_token_secret')
	);
};

class Twitter {
	private TWITTER_BASE_URL = 'https://api.twitter.com';
	private oAuthHeader: OAuthHeader;

	constructor() {
		if (!process.env.TWITTER_CONSUMER_KEY) {
			throw new Error('The Consumer/API key was not provided');
		}

		if (!process.env.TWITTER_CONSUMER_KEY_SECRET) {
			throw new Error('The Consumer/API Secret was not provided');
		}

		const apiKey = process.env.TWITTER_CONSUMER_KEY;
		const apiKeySecret = process.env.TWITTER_CONSUMER_KEY_SECRET;

		this.oAuthHeader = new OAuthHeader(apiKey, apiKeySecret);
	}

	getAuthorizeToken = async (callbackUrl: string): Promise<AuthorizeToken> => {
		const request: Request = {
			method: METHOD.POST,
			uri: `${this.TWITTER_BASE_URL}/oauth/request_token`,
		};

		const headers = {
			Authorization: this.oAuthHeader.getHeaderString(request, {
				oauth_callback: callbackUrl,
			}),
		};

		try {
			const authorizeString = await postWithHeader(request.uri, headers);
			const parseAuthorizeString = responseToObject(authorizeString);

			if (!isAuthorizedToken(parseAuthorizeString)) {
				throw new Error(
					'Did not receive the expected response for authorization from Twitter.'
				);
			}

			if (!parseAuthorizeString.oauth_callback_confirmed) {
				throw new Error('OAuth Callback could not be confirmed');
			}

			return parseAuthorizeString;
		} catch (e) {
			throw e;
		}
	};

	getAccessToken = async (
		oauth_token: string,
		oauth_verifier: string
	): Promise<AccessToken> => {
		const request: Request = {
			method: METHOD.POST,
			uri: `${this.TWITTER_BASE_URL}/oauth/access_token`,
		};

		const headers = {
			Authorization: this.oAuthHeader.getHeaderString(request, {
				oauth_token,
				oauth_verifier,
			}),
		};

		try {
			const accessTokenString = await postWithHeader(request.uri, headers);
			const parseAccessTokenString = responseToObject(accessTokenString);

			if (!isAccessToken(parseAccessTokenString)) {
				throw new Error(
					'Did not receive the expected response for access tokens from Twitter'
				);
			}

			return parseAccessTokenString;
		} catch (e) {
			throw e;
		}
	};
}

export default Twitter;
