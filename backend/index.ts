import app from './src/app';
import http from 'http';
import { PORT } from './src/config';

const server = http.createServer(app);

server.listen(PORT, () => {
	console.log(`Server running on PORT ${4000}`);
});
