import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;

export const CALLBACK_URL = 'http://127.0.0.1:4000/twitter/callback';

export const TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
export const TWITTER_CONSUMER_KEY_SECRET = process.env.TWITTER_CONSUMER_KEY_SECRET;
