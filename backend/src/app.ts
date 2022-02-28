import express from 'express';
import cors from 'cors';
import session from 'express-session';
import createMemoryStore from 'memorystore';

import twitterRouter from './controllers/twitter';
import { errorHandleMiddleware } from './Errors';

console.log(`MODE: ${process.env.NODE_ENV}`);

if (!process.env.SESSION_SECRET) {
	throw new Error('No session secret was provided.');
}

const app = express();

const whitelist =
	process.env.NODE_ENV === 'production'
		? 'https://migratemeto.netlify.app'
		: 'http://127.0.0.1:3000';

app.use(express.json());

app.use(
	cors({
		origin: whitelist,
		credentials: true,
	})
);

const MemoryStore = createMemoryStore(session);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: true,
		resave: false,
		store: new MemoryStore({
			checkPeriod: 6 * 60 * 60 * 1000,
		}),
		cookie: {
			secure: process.env.NODE_ENV === 'production',
		},
	})
);

app.use('/twitter', twitterRouter);

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

app.use(errorHandleMiddleware);

export default app;
