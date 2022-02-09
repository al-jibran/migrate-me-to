import { DownArrow } from '../components/svgs';
import ServiceCardLarge from '../components/ServiceCardLarge';
import { Service, services } from '../data/services';

const Homepage = () => {
	return (
		<>
			<Hero />
			<Services services={services} />
		</>
	);
};

const Hero = () => {
	return (
		<section className='flex flex-col pb-5 h-full justify-between'>
			<h1 className='flex-shrink'>Migrate to another account easily.</h1>
			<DownArrow className='h-1/4 w-8 flex-shrink animate-bounce' />
		</section>
	);
};

interface ServicesProps {
	services: Service[];
}

export const Services: React.FC<ServicesProps> = ({ services }) => {
	return (
		<section id='#'>
			<h2 className=' mt-6'>Services</h2>
			{services.map(({ name, transferrableList, LogoSvgComponent }) => (
				<ServiceCardLarge
					name={name}
					transferrableList={transferrableList}
					LogoSvgComponent={LogoSvgComponent}
					key={name}
				/>
			))}
		</section>
	);
};

export default Homepage;
