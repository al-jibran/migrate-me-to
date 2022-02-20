import express, { Request, Response } from 'express';

const app = express();

const twitterRequestToken =
	'oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&oauth_token_secret=veNRnAWe6inFuo8o2u8SLLZLjolYDmDP7SzL0YfYI&oauth_callback_confirmed=true';

app.get('/oauth/request_token', (_req: Request, res: Response) => {
	res.send(twitterRequestToken);
});

app.post('/oauth/request_token', (_req: Request, res: Response) => {
	res.send(twitterRequestToken);
});

app.listen(4100, () => {
	console.log(`Mock server running on PORT ${4100}`);
});
