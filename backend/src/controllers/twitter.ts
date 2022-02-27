import express from 'express';
import Twitter from '../services/Twitter';

const twitterRouter = express.Router();

const twitter = new Twitter();

twitterRouter.get('/authorize', async (req, res) => {
	// The OAuth process has started!
	req.session.processing = true;
	try {
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

twitterRouter.get('/verify', (req, res) => {
	console.log(req.session);
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
