import supertest from 'supertest';
import { stubApiForRoute } from './__utils__/stub-api';
import app from '../app';
import Twitter from '../services/Twitter';
import { CALLBACK_URL } from '../config';

const mockToken = 'NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0';

const api = supertest(app);

describe('Service', () => {
	let mockGetAuthorizeToken: jest.SpyInstance;

	beforeEach(() => {
		mockGetAuthorizeToken = jest.spyOn(Twitter.prototype, 'getAuthorizeToken');
	});

	it('returns a link to login to the service', async () => {
		mockGetAuthorizeToken.mockImplementation(() =>
			Promise.resolve({
				oauth_token: mockToken,
				oauth_callback_confirmed: true,
				oauth_token_secret: 'secret',
			})
		);

		const response = await api.get('/twitter/authorize').expect(200);

		expect(mockGetAuthorizeToken).toHaveBeenCalledWith(CALLBACK_URL);

		expect(response.body).toEqual({
			authorizeUrl: `https://api.twitter.com/oauth/authorize?oauth_token=${mockToken}`,
		});
	});

	describe('/verify', () => {
		const fromRoute = (route: string, session: Record<string, any>) => {
			return stubApiForRoute(app, route).withSession(session).get(`/twitter/verify`);
		};

		const routeToTest = '/twitter/verify';
		it('returns 202 when the request is being processed', async () => {
			await fromRoute(routeToTest, { processing: true }).expect(202);
		});

		it('returns 204 when authorization is successful', async () => {
			await fromRoute(routeToTest, { verified: true }).expect(204);
		});

		it('fails with 401 if the user does not authorize', async () => {
			await fromRoute(routeToTest, { denied: true }).expect(401);
		});

		it('fails with 500 if the status of authorization could not be confirmed', async () => {
			await fromRoute(routeToTest, {}).expect(502);
		});
	});
});
