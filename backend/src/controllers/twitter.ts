import express from 'express';
import Twitter from '../services/Twitter';

const twitterRouter = express.Router();

const twitter = new Twitter();

twitterRouter.get('/authorize', async (req, res) => {
	// The OAuth process has started!
	req.session.processing = true;

	// Connect to twitter and get token
	const oAuthAuthorize = await twitter.getAuthorizeToken(
		'http://127.0.0.1:4000/twitter/callback'
	);

	req.session.oauth_token = oAuthAuthorize.oauth_token;

	// send the client uri for authorization
	const authorizeUserLink = `https://api.twitter.com/oauth/authorize?oauth_token=${oAuthAuthorize.oauth_token}`;

	res.json({
		authorizeUrl: authorizeUserLink,
	});
});

twitterRouter.get('/callback', async (req, res) => {
	const sessionOauthToken = req.session.oauth_token;
	let statusCode = 200;

	if (
		req.query.oauth_token &&
		req.query.oauth_verifier &&
		sessionOauthToken &&
		req.query.oauth_token === sessionOauthToken
	) {
		req.session.verified = true;
		req.session.denied = false;

		const oauth_verifier = req.query.oauth_verifier as string;

		const accessTokens = await twitter.getAccessToken(
			sessionOauthToken,
			oauth_verifier
		);

		req.session.oauth_token = accessTokens.oauth_token;
		req.session.oauth_token_secret = accessTokens.oauth_token_secret;
	} else if (req.query.denied) {
		req.session.denied = true;
		req.session.verified = false;
	} else {
		statusCode = 511;
	}

	req.session.processing = false;
	res.status(statusCode).send();
});

twitterRouter.get('/verify', (req, res) => {
	if (req.session.processing) {
		res.status(202).send();
	} else if (req.session.verified) {
		res.status(204).send();
	} else if (req.session.denied) {
		res.status(401).send();
	} else {
		res.status(502).send();
	}
});

export default twitterRouter;
