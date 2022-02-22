import axios from 'axios';

const baseURL = process.env.BACKEND_URL || 'http://localhost:4000';

const client = axios.create({
	baseURL
});

export const getAuthorizeUserLink = async () => {
	const { data } = await client.get('/twitter/authorize');
	return data;
};
