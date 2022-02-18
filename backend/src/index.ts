import express from 'express';

const PORT = 4000;

const app = express();

app.use(express.json());

app.get('/ping', (_req, res) => {
	console.log('Someone pinged here');
	res.send('pong');
});

app.listen(PORT, () => {
	console.log(`Server running on Port ${PORT}`);
});
