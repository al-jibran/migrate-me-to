import express from 'express';

import { config } from 'dotenv';
import OAuthHeader from './utility/OAuthHeader';
import { METHOD, Request } from './utility/OAuthHeader/types';

config();

const PORT = 4000;

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

app.get('/api/authorize', (_req, res) => {
	const apiKey: string = process.env.CONSUMER_API_KEY || '';
	const secret: string = process.env.CONSUMER_API_KEY_SECRET || '';

	const header = new OAuthHeader(apiKey, secret);

	const request: Request = {
		method: METHOD.POST,
		uri: 'https://www.twitter.com/oauth/request_token?oauth_callback=http://localhost:4000',
	};

	res.send(header.getHeaderString(request));
});

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
