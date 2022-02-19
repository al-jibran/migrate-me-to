import express from 'express';

import { config } from 'dotenv';
import OAuthHeader from './utility/OAuthHeader';
import { METHOD, Request } from './utility/OAuthHeader/types';
import axios from 'axios';
import cors from 'cors';
import { uriPercentEncode } from './utility';

config();

const PORT = 4000;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

app.get('/authorize/twitter', async (_req, res) => {
	const apiKey: string = process.env.CONSUMER_API_KEY || '';
	const secret: string = process.env.CONSUMER_API_KEY_SECRET || '';

	const header = new OAuthHeader(apiKey, secret);

	const encodedCallback = uriPercentEncode(
		'http://127.0.0.1:4000/callback/twitter'
	);

	const request: Request = {
		method: METHOD.POST,
		uri: `https://api.twitter.com/oauth/request_token?oauth_callback=${encodedCallback}`,
	};

	try {
		const { data } = await axios.post(request.uri, undefined, {
			headers: {
				Authorization: header.getHeaderString(request),
			},
		});

		const responseList: string[] = data.split('&');

		const obj: Record<string, string> = responseList.reduce((o, item) => {
			const key = item.split('=')[0] || 'never';
			const value = item.split('=')[1];

			return { ...o, [key]: value };
		}, {});

		if (!obj.oauth_callback_confirmed) {
			throw new Error('Could not confirm callback for oauth.');
		}

		const authorizeUserLink = `https://api.twitter.com/oauth/authorize?oauth_token=${obj.oauth_token}`;

		res.redirect(authorizeUserLink);
	} catch (e) {
		res.send(e);
	}
});

app.get('/callback/twitter', (req, res) => {
	res.send(req.query);
});

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
