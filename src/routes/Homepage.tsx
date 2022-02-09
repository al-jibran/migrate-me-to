import { DownArrow } from '../components/svgs';
import ServiceCardLarge from '../components/ServiceCardLarge';
import { Service, services } from '../data/services';

const Homepage = () => {
	return (
		<>
			<Hero />
			<div className='px-10'>
				<Services services={services} />
				<About />
			</div>
		</>
	);
};

const Hero = () => {
	return (
		<section className='flex flex-col px-10 pb-5 h-screen justify-between text-gray-200 overscroll-none pt-32 bg-gradient-to-r from-[#e1fad4] to-[#72b39f]'>
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
			<h2 className='my-6'>Services</h2>
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

const About = () => {
	return (
		<section>
			<h2 className='my-6'>About</h2>
			<p className='leading-loose w-full p-8 shadow-xl text-lg bg-[#d9f5d0]'>
				Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum quaerat
				itaque ipsa temporibus? Sed, exercitationem dignissimos, veniam eius
				natus quam amet optio voluptas molestias nemo ipsa magnam, voluptates
				obcaecati iure. Commodi, quam dolorum perspiciatis architecto sunt
				tempore nesciunt ad voluptatum tenetur iste eaque similique dolore iusto
				repellendus in sit. Reprehenderit et nam animi modi vitae. Dolor magnam
				ad et animi.
			</p>
		</section>
	);
};

export default Homepage;
