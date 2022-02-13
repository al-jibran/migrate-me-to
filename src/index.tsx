import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import App from './App';
import './assets/styles/main.css';
import Homepage from './routes/Homepage';
import Service from './routes/Service';

ReactDOM.render(
	<BrowserRouter>
		<Routes>
			<Route path='/' element={<App />}>
				<Route index element={<Homepage />} />
				<Route path='service/:id' element={<Service />} />
			</Route>
			<Route
				path='*'
				element={<div>Oooops... There&apos;s nothing here</div>}
			/>
		</Routes>
	</BrowserRouter>,
	document.getElementById('app')
);
