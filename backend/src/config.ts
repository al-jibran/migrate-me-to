import { config } from 'dotenv';
config();

export const PORT = process.env.PORT;

export const TWITTER_BASE_URL = 'https://api.twitter.com';
