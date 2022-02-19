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

app.get('/api/authorize', async (_req, res) => {
	const apiKey: string = process.env.CONSUMER_API_KEY || '';
	const secret: string = process.env.CONSUMER_API_KEY_SECRET || '';

	const header = new OAuthHeader(apiKey, secret);

	const encodedCallback = uriPercentEncode('http://127.0.0.1');

	const request: Request = {
		method: METHOD.POST,
		uri: `https://api.twitter.com/oauth/request_token?oauth_callback=${encodedCallback}`,
	};

	const client = axios.create({
		baseURL: request.uri,
		headers: {
			Authorization: header.getHeaderString(request),
		},
	});

	const result = await client.post('/', null, { timeout: 5000 });
	res.send(result);
});

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
