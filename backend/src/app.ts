import express from 'express';
import cors from 'cors';

import twitterRouter from './controllers/twitter';

console.log(`MODE: ${process.env.NODE_ENV}`);

const app = express();

app.use(express.json());
app.use(cors());

app.use('/twitter', twitterRouter);

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

export default app;
