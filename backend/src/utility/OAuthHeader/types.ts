export interface Token {
	oauth_token: string;
	tokenSecret: string;
}

export interface Request {
	method: METHOD;
	uri: string;
	data?: Record<string, string>;
}

export interface HeaderType extends Record<string, string> {
	oauth_consumer_key: string;
	oauth_signature_method: string;
	oauth_timestamp: string;
	oauth_version: string;
}

export enum METHOD {
	POST = 'POST',
	GET = 'GET',
}
