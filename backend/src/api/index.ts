import axios, { AxiosRequestHeaders } from 'axios';

export const getOAuthToken = async (
	uri: string,
	headers?: AxiosRequestHeaders
): Promise<Record<string, string>> => {
	const { data }: { data: string } = await axios.post(uri, undefined, {
		headers,
	});

	return responseToObject(data);
};

const responseToObject = (data: string): Record<string, string> => {
	const responseList: string[] = data.split('&');

	const obj: Record<string, string> = responseList.reduce((o, item) => {
		const key = item.split('=')[0] || 'never';
		const value = item.split('=')[1];

		return { ...o, [key]: value };
	}, {});

	return obj;
};
