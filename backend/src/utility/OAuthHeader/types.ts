export interface AdditionalOauth {
	oauth_token?: string;
	oauth_token_secret?: string;
	oauth_verifier?: string;
	oauth_callback?: string;
}

export interface Request {
	method: METHOD;
	uri: string;
}

export interface HeaderType extends Record<string, string> {
	oauth_consumer_key: string;
	oauth_nonce: string;
	oauth_signature_method: string;
	oauth_timestamp: string;
	oauth_version: string;
}

export enum METHOD {
	POST = 'POST',
	GET = 'GET',
}
