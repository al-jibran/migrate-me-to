import { useState } from 'react';
import { useParams } from 'react-router-dom';

const styles: Record<string, Record<string, string>> = {
	border: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},

	marker: {
		inActive: 'marker:content-[}]',
	},
};

const Service = () => {
	const { name } = useParams<string>();
	const [status] = useState('hello there');

	if (!name) {
		throw new Error('invalid argument');
	}

	if (!styles) {
		throw new Error('No style was defined for this page');
	} else if (!styles.border || !styles.marker) {
		styles.border = {};
		styles.border[name] = '#000';
		styles.marker = {};
	}

	const borderColor = styles.border[name];

	return (
		<div className='pt-32 px-10 h-screen'>
			<h1
				className={`text-4xl ${borderColor} pb-3 border-b-4 border-white w-fit mx-auto`}>
				1<sup>st</sup> Account
			</h1>
			<h2 className='mt-10 mb-4 uppercase'>Steps</h2>
			<ul
				className={`marker:text-white ${styles.marker.inActive} list-inside ${status}`}>
				<li className='flex items-center'>
					<svg
						className='h-4 w-4 mr-2'
						viewBox='0 0 32 32'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='16' cy='16' r='14.5' stroke='white' strokeWidth='3' />
					</svg>
					<p>
						Sign in to the 1<sup>st</sup> account
					</p>
				</li>
				<li className='flex items-center'>
					<svg
						className='h-4 w-4 mr-2'
						viewBox='0 0 32 32'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='16' cy='16' r='14.5' stroke='white' strokeWidth='3' />
					</svg>
					<p>Select what to migrate</p>
				</li>
				<li className='flex items-center'>
					<svg
						className='h-4 w-4 mr-2'
						viewBox='0 0 32 32'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='16' cy='16' r='14.5' stroke='white' strokeWidth='3' />
					</svg>
					<p>
						Sign in to the 2<sup>nd</sup> account
					</p>
				</li>
				<li className='flex items-center'>
					<svg
						className='h-4 w-4 mr-2'
						viewBox='0 0 32 32'
						xmlns='http://www.w3.org/2000/svg'>
						<circle cx='16' cy='16' r='14.5' stroke='white' strokeWidth='3' />
					</svg>
					<p>Wait</p>
				</li>
			</ul>
		</div>
	);
};

export default Service;
