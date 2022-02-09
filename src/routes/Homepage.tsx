import { DownArrow } from '../components/svgs';

const Homepage = () => {
	return (
		<section className='flex flex-col pb-5 h-full justify-between'>
			<h1 className='font-bold text-7xl sm:text-8xl '>
				Migrate to another account easily.
			</h1>
			{/* <a
				href='#'
				className='py-4 px-4
				bg-gray-200 w-fit
				text-white rounded-md
				border-2
				hover:bg-white
				hover:text-black'>
				See all offered services Todo
			</a> */}
			<DownArrow className='h-1/4 w-8 animate-bounce' />
		</section>
	);
};

export default Homepage;
