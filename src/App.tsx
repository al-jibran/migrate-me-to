import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';
export const App = () => {
	return (
		<div className='mt-5'>
			<Navigation />
			<div className='px-6'>
				<Homepage />
			</div>
		</div>
	);
};

export default App;
