import express from 'express';
import axios from 'axios';

import OAuthHeader from '../utility/OAuthHeader';
import { METHOD, Request } from '../utility/OAuthHeader/types';
import { uriPercentEncode } from '../utility';

import { TWITTER_BASE_URL } from '../config';

const twitterRouter = express.Router();

const encodedCallback = uriPercentEncode(
	'http://127.0.0.1:4000/twitter/callback'
);

twitterRouter.get('/authorize', async (_req, res) => {
	const apiKey = process.env.CONSUMER_API_KEY;
	const secret = process.env.CONSUMER_API_KEY_SECRET;

	if (!apiKey) {
		throw new Error('The Consumer/API key was not provided');
	}

	if (!secret) {
		throw new Error('The Consumer/API Secret was not provided');
	}

	const request: Request = {
		method: METHOD.POST,
		uri: `${TWITTER_BASE_URL}/oauth/request_token?oauth_callback=${encodedCallback}`,
	};

	try {
		const header = new OAuthHeader(apiKey, secret);
		const { data } = await axios.post(request.uri, undefined, {
			headers: {
				Authorization: header.getHeaderString(request),
			},
		});

		const oAuthAuthorize: Record<string, string> = responseToObject(data);

		if (!oAuthAuthorize.oauth_callback_confirmed) {
			throw new Error('Could not confirm callback for oauth.');
		}

		const authorizeUserLink = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthAuthorize.oauth_token}`;

		res.json({
			authorizeUrl: authorizeUserLink,
		});
	} catch (e) {
		res.send(e);
	}
});

twitterRouter.get('/callback', (req, res) => {
	res.send(req.query);
});

const responseToObject = (data: string): Record<string, string> => {
	const responseList: string[] = data.split('&');

	const obj: Record<string, string> = responseList.reduce((o, item) => {
		const key = item.split('=')[0] || 'never';
		const value = item.split('=')[1];

		return { ...o, [key]: value };
	}, {});

	return obj;
};

export default twitterRouter;
