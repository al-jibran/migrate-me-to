import express from 'express';

import OAuthHeader from '../utility/OAuthHeader';
import { METHOD, Request } from '../utility/OAuthHeader/types';
import { uriPercentEncode } from '../utility';
import { TWITTER_BASE_URL } from '../config';
import { getOAuthToken } from '../api';

const twitterRouter = express.Router();

const encodedCallback = uriPercentEncode(
	'http://127.0.0.1:4000/twitter/callback'
);

twitterRouter.get('/authorize', async (req, res) => {
	const apiKey = process.env.TWITTER_CONSUMER_KEY;
	const secret = process.env.TWITTER_CONSUMER_KEY_SECRET;

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
		req.session.processing = true;
		// Make a request to twitter
		const oAuthHeader = new OAuthHeader(apiKey, secret);
		const headers = {
			Authorization: oAuthHeader.getHeaderString(request),
		};
		const oAuthAuthorize = await getOAuthToken(request.uri, headers);

		// confirm callback
		if (!oAuthAuthorize.oauth_callback_confirmed) {
			throw new Error('Could not confirm callback for oauth.');
		}

		// set the token received in session
		req.session.oauth_token = oAuthAuthorize.oauth_token;
		const authorizeUserLink = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthAuthorize.oauth_token}`;
		req.session.save();

		// send the client uri for authorization
		res.json({
			authorizeUrl: authorizeUserLink,
		});
	} catch (e) {
		res.send(e);
	}
});

twitterRouter.get('/callback', (req, res) => {
	if (req.query.oauth_token === req.session.oauth_token) {
		req.session.verified = true;
		req.session.denied = false;
	} else if (req.query.denied) {
		req.session.denied = true;
		req.session.verified = false;
	}

	req.session.processing = false;
	res.end();
});
});

export default twitterRouter;
