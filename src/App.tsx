import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';

// For dark mode: linear-gradient(to right, #000000, #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

export const App = () => {
	return (
		<div className='h-full overflow-x-hidden bg-gradient-to-tr from-[#ffffff] to-[#dbdbdb]'>
			<Navigation />
			<div className='text-gray-200 px-6 h-full pt-32'>
				<Homepage />
			</div>
		</div>
	);
};

export default App;
