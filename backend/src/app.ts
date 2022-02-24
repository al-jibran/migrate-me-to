import express from 'express';
import cors from 'cors';
import session from 'express-session';
import createMemoryStore from 'memorystore';

import twitterRouter from './controllers/twitter';

console.log(`MODE: ${process.env.NODE_ENV}`);

if (!process.env.SESSION_SECRET) {
	throw new Error('No session secret was provided.');
}

const app = express();

app.use(express.json());
app.use(cors());

const MemoryStore = createMemoryStore(session);

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		saveUninitialized: false,
		resave: false,
		store: new MemoryStore({
			checkPeriod: 16 * 60 * 60 * 1000,
		}),
	})
);

declare module 'express-session' {
	interface SessionData {
		view: number;
	}
}

app.use('/twitter', twitterRouter);

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

export default app;
