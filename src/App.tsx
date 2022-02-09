import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';
export const App = () => {
	return (
		<div className='bg-gradient-to-r h-full from-[#002f36] to-[#298fa1] overflow-x-hidden'>
			<Navigation />
			<div className='text-white px-6 h-full pt-32'>
				<Homepage />
			</div>
		</div>
	);
};

export default App;
