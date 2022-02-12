import { DownArrow } from '../components/svgs';
import ServiceCardLarge from '../components/ServiceCardLarge';
import { Service, services } from '../data/services';
import { normalizeClass } from '../utility/normalizeClass';

const Homepage = () => {
	return (
		<>
			<Hero />
			<div className='px-10 md:px-16 lg:px-24 xl:max-w-5xl bg-grade xl:mx-auto'>
				<Services services={services} />
				<About />
			</div>
		</>
	);
};

const styles = {
	hero: {
		mobile: ' bg-gradient-to-r from-gradientLightStart to-gradientLightStop',
		dark: 'dark:bg-gradient-to-r dark:from-black dark:to-gray-400 ',
	},
	heroContainer: {
		mobile:
			'flex flex-col pb-5 h-screen justify-between text-gray-200 overscroll-none px-10 pt-32 w-full',
		sm: 'sm:px-14',
		md: 'md:px-16',
		lg: 'lg:px-24',
		xl: 'xl:max-w-5xl xl:mx-auto',
	},
};

const heroStyles = {
	downArrow: {
		mobile:
			'h-1/4 w-8 flex-shrink animate-bounce stroke-gray-200 fill-gray-200',
		dark: 'dark:stroke-white dark:fill-white',
	},
};

const Hero = () => {
	const className = normalizeClass(styles.hero);
	const downArrowClass = normalizeClass(heroStyles.downArrow);
	const heroContainer = normalizeClass(styles.heroContainer);

	return (
		<section id='hero' className={className}>
			<div className={heroContainer}>
				<h1 className='flex-shrink dark:text-white'>
					Migrate to another account easily.
				</h1>
				<DownArrow className={downArrowClass} />
			</div>
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
			<div className='md:grid md:grid-cols-2 gap-10'>
				{services.map(({ name, transferrableList, LogoSvgComponent }) => (
					<ServiceCardLarge
						name={name}
						transferrableList={transferrableList}
						LogoSvgComponent={LogoSvgComponent}
						key={name}
					/>
				))}
			</div>
		</section>
	);
};

const About = () => {
	return (
		<section>
			<h2 className='my-6'>About</h2>
			<p className='leading-loose w-full p-8 shadow-xl text-lg bg-gradientLightStart dark:bg-gray-400'>
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
