import { TwitterLogo, Checkbox } from './svgs';

const leftBox = () => 'w-1/6 p-3 mr-3 border-r-2 border-r-white';
const ExpandableService = () => {
	return (
		<div className='my-6'>
			<div className='flex max-h-24 bg-twitter'>
				<TwitterLogo className={leftBox()} />
				<h3 className='self-center text-2xl font-bold text-white'>Twitter</h3>
			</div>
			<ul>
				<li className='flex'>
					<Checkbox className={leftBox()} />
					<div className='self-center text-xl'>Friends</div>
				</li>
			</ul>
		</div>
	);
};

export default ExpandableService;
