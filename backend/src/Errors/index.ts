import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export class ProxyError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

export const errorHandleMiddleware = (
	err: Error,
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	console.log(err.message);

	if (axios.isAxiosError(err)) {
		const errorCode = err.response?.status || parseInt(err.code || '500');
		res.status(errorCode).json({ message: err.message });
	} else if (err instanceof ProxyError) {
		console.log('gets in proxy error');
		res.status(err.code).json({ message: err.message });
	}

	next(err);
};
