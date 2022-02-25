import supertest from 'supertest';
import { stubApiForRoute } from './__utils__/stub-api';
import { getOAuthToken } from '../api';
import app from '../app';

jest.mock('../api');

const mockToken = 'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0';

const api = supertest(app);

describe('Service', () => {
	it('returns a link to login to the service', async () => {
		(getOAuthToken as jest.Mock).mockResolvedValue({
			oauth_token: 'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0',
			oauth_callback_confirmed: true,
		});

		const response = await api.get('/twitter/authorize').expect(200);
		expect(getOAuthToken).toHaveBeenCalled();

		expect(response.body).toEqual({
			authorizeUrl: `https://api.twitter.com/oauth/authorize?oauth_token=${mockToken}`,
		});
	});

	describe('/verify', () => {
		const fromRoute = (route: string, session: Record<string, any>) => {
			return stubApiForRoute(app, route)
				.withSession(session)
				.get(`/twitter/verify`);
		};

		it('returns 204 when authorization is successful', async () => {
			await fromRoute('/twitter/verify', { verified: true }).expect(204);
		});
	});
});
