import { DownArrow } from '../components/svgs';
import ServiceCardLarge from '../components/ServiceCardLarge';
import services from '../data/services';

const Homepage = () => {
	return (
		<>
			<Hero />
			<Services />
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

const Services = () => {
	return (
		<>
			<h2 className='text-3xl font-bold mt-6'>Services</h2>
			{services.map(({ name, transferrableList, LogoSvgComponent }) => (
				<ServiceCardLarge
					name={name}
					transferrableList={transferrableList}
					LogoSvgComponent={LogoSvgComponent}
					key={name}
				/>
			))}
		</>
	);
};
export default Homepage;
