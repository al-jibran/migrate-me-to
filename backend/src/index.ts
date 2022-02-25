import http from 'http';
import { PORT } from './config';
import app from './app';

declare module 'express-session' {
	interface SessionData {
		oauth_token: string;
	}
}

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on PORT ${PORT}`);
});
