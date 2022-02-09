import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';

// For dark mode: linear-gradient(to right, #000000, #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

export const App = () => {
	return (
		<div className='h-full overflow-x-hidden'>
			<Navigation />
			<div className='text-gray-200 overscroll-none px-6 h-full pt-32 z-0 bg-gradient-to-r from-[#e1fad4] to-[#72b39f]'>
				<Homepage />
			</div>
		</div>
	);
};

export default App;
