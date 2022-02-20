import axios from 'axios';

const client = axios.create({
	baseURL: 'http://localhost:4000',
});

export const getAuthorizeUserLink = async () => {
	const { data } = await client.get('/twitter/authorize');
	return data;
};
