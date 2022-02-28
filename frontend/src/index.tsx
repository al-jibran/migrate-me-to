import { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import App from './App';
import './assets/styles/main.css';
import Homepage from './routes/Homepage';
import Service from './routes/Service';

const ScrollToTop = () => {
	const pathName = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathName]);

	return null;
};

ReactDOM.render(
	<BrowserRouter>
		<ScrollToTop />
		<Routes>
			<Route path='/' element={<App />}>
				<Route index element={<Homepage />} />
				<Route path='service/:name' element={<Service />} />
			</Route>
			<Route path='*' element={<div>Oooops... There&apos;s nothing here</div>} />
		</Routes>
	</BrowserRouter>,
	document.getElementById('app')
);
