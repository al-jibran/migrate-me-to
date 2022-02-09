import { DownArrow } from '../components/svgs';
import ExpandableService from '../components/ExpandableService';

const Homepage = () => {
	return (
		<>
			<Hero />
			<h2 className='text-4xl font-bold'>Services</h2>
			<ExpandableService />
		</>
	);
};

const Hero = () => {
	return (
		<section className='flex flex-col pb-5 h-full justify-between'>
			<h1 className='font-bold text-7xl sm:text-8xl '>
				Migrate to another account easily.
			</h1>
			<DownArrow className='h-1/4 w-8 animate-bounce' />
		</section>
	);
};

export default Homepage;
