import http from 'http';
import { PORT } from './config';
import app from './app';

declare module 'express-session' {
	interface SessionData {
		oauth_token: string;
		verified: boolean;
		denied: boolean;
		processing: boolean;
	}
}

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
