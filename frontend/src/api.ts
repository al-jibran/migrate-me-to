import axios, { AxiosError } from 'axios';

const baseURL = process.env.BACKEND_URL || 'http://localhost:4000';

const client = axios.create({
	baseURL,
});

export const getAuthorizeUserLink = async () => {
	try {
		const { data } = await client.get('/twitter/authorize');
		return data;
	} catch (error) {
		const err = error as AxiosError;
		if (!err.response) {
			throw {
				code: 503,
				message:
					'There was a problem connecting to the server. Try again later.',
			};
		} else throw error;
	}
};
