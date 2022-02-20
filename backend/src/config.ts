import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;
export const MOCK_SERVER_PORT = process.env.MOCK_SERVER_PORT || 5000;

export let TWITTER_BASE_URL = 'https://api.twitter.com';

if (process.env.NODE_ENV === 'testing') {
	TWITTER_BASE_URL = process.env.MOCK_SERVER || '';
}
