import axios from 'axios';

const client = axios.create({
	baseURL: process.env.BACKEND_URL,
});

export const getAuthorizeUserLink = async () => {
	const { data } = await client.get('/twitter/authorize');
	return data;
};
