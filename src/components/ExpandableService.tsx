import { TwitterLogo } from './svgs';

const ExpandableService = () => {
	return (
		<div>
			<div className='flex max-h-24 bg-twitter'>
				<TwitterLogo className='w-1/6 p-3 mr-3 border-r-2 border-r-white' />
				<h3 className='self-center text-3xl font-bold text-white'>Twitter</h3>
			</div>
			<ul>
				<li className="before:content-['*']">Friends</li>
				<li>Liked</li>
				<li>Followers</li>
			</ul>
		</div>
	);
};

export default ExpandableService;
