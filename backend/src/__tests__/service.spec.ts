import express, { Express, NextFunction } from 'express';
import supertest, { SuperTest } from 'supertest';
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

	it('return a successful status on acquiring a oauth_token', async () => {
		await api
			.get('/twitter/callback')
			.expect(204)
			.expect('Content-Type', /application\/json/);
	});
});
