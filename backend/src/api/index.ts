import axios, { AxiosRequestHeaders } from 'axios';

export const postWithHeader = async (
	uri: string,
	headers?: AxiosRequestHeaders
): Promise<string> => {
	const { data }: { data: string } = await axios.post(uri, undefined, {
		headers,
	});

	return data;
};

