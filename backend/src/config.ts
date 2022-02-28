import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;

if (!process.env.CALLBACK_URL) {
	throw new Error('No Callback url was provided.');
}

export const CALLBACK_URL =
	process.env.NODE_ENV === 'production'
		? process.env.CALLBACK_URL
		: 'http://127.0.0.1:4000/twitter/callback';

export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
export const TWITTER_CONSUMER_KEY_SECRET = process.env.TWITTER_CONSUMER_KEY_SECRET;
