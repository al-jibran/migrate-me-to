import app from './app';
import http from 'http';

const server = http.createServer(app);

server.listen(4000, () => {
	console.log(`Server running on PORT ${4000}`);
});
