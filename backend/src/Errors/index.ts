import { NextFunction, Request, Response } from 'express';
import axios from 'axios';

export class ProxyError extends Error {
	code: number;
	constructor(message: string, code: number) {
		super(message);
		this.code = code;
	}
}

