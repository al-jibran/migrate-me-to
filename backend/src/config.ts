import { config } from 'dotenv';
config();

export const PORT = process.env.PORT || 4000;

export const TWITTER_BASE_URL = 'https://api.twitter.com';
