import { DownArrow } from '../components/svgs';

const Homepage = () => {
	return <Hero />;
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
