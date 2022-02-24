import app from '../app';
import supertest from 'supertest';

const api = supertest(app);

describe('Service', () => {
	it('returns a link to login to the service', async () => {
		const response = await api
			.get('/twitter/authorize')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(response.body).toEqual({
			authorizeUrl:
				'https://api.twitter.com/oauth/authorize?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
		});
	});

	it('return a successful status on acquiring a oauth_token', async () => {
		await api
			.get('/twitter/callback')
			.expect(204)
			.expect('Content-Type', /application\/json/);
	});
});
