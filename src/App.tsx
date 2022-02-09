import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';
export const App = () => {
	return (
		<div className='h-full overflow-x-hidden bg-blue-300'>
			<Navigation />
			<div className='text-gray-200 px-6 h-full pt-32'>
				<Homepage />
			</div>
		</div>
	);
};

export default App;
