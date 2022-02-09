import Navigation from './components/Navigation';
import Homepage from './routes/Homepage';

// For dark mode: linear-gradient(to right, #000000, #434343); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

const footerStyles = {
	mobile: 'mt-8 h-80 bg-gradient-to-r from-[#e1fad4] to-[#72b39f] p-10 w-full',
	sm: 'sm:text-black',
};

export const App = () => {
	return (
		<>
			<div>
				<Navigation />
				<Homepage />
				<Footer />
			</div>
		</>
	);
};

const Footer = () => {
	const styles: string[] = Object.values(footerStyles);
	const className = styles.join(' ');
	console.log(className);

	return (
		<div className={className}>
			<h3>Created by Al Jibran</h3>

			<p className='underline my-5'>While you&apos;re here check out my:</p>
			<ul>
				<li>Portfolio</li>
				<li>LinkedIn</li>
				<li>Github</li>
				<li>Twitter</li>
			</ul>
		</div>
	);
};

export default App;
