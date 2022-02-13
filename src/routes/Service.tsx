import { useParams } from 'react-router-dom';

const styles: Record<string, Record<string, string>> = {
	border: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},

	fill: {
		Twitter: 'fill-twitter',
		Reddit: 'fill-reddit',
	},

	marker: {
		inActive: 'marker:content-[}]',
	},
};

const Service = () => {
	const { name } = useParams<string>();

	if (!name) {
		throw new Error('invalid argument');
	}

	if (!styles) {
		throw new Error('No style was defined for this page');
	} else if (!styles.border || !styles.fill) {
		styles.border = {};
		styles.border[name] = '#000';
		styles.fill = {};
	}

	const borderColor = styles.border[name];

	return (
		<div className='pt-32 px-10 h-screen'>
			<h1
				className={`text-4xl ${borderColor} uppercase pb-3 border-b-4 border-white w-fit mx-auto`}>
				1<sup className='lowercase'>st</sup> Account
			</h1>
			<h2 className='mt-10 mb-4 uppercase'>Steps</h2>
			<ul>
				<li className='flex items-center py-1'>
					<svg
						className='fill-green stroke-green-400 stroke-[0.3em] h-4 w-4 mr-2'
						viewBox='0 0 36 37'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M2 23.8182L14.5217 34L34 2' />
					</svg>

					<p>
						Sign in to the 1<sup>st</sup> account
					</p>
				</li>
				<li className='flex items-center py-1'>
					<svg
						className='fill-red stroke-red-900 h-4 w-4 mr-2 stroke-[0.5em]'
						viewBox='0 0 41 38'
						xmlns='http://www.w3.org/2000/svg'>
						<line
							y1='-1.5'
							x2='48.1512'
							y2='-1.5'
							transform='matrix(0.729554 0.683924 -0.910961 0.412492 2.68457 3.21631)'
						/>
						<line
							y1='-1.5'
							x2='49.1134'
							y2='-1.5'
							transform='matrix(-0.697597 0.71649 -0.933759 -0.357903 36.001 0.193359)'
						/>
					</svg>
					<p>Select what to migrate</p>
				</li>
				<li className='flex items-center py-1'>
					<svg
						className={'h-4 w-4 mr-2 fill-cyan-500'}
						viewBox='0 0 34 24'
						xmlns='http://www.w3.org/2000/svg'>
						<path d='M33.0607 13.0607C33.6464 12.4749 33.6464 11.5251 33.0607 10.9393L23.5147 1.3934C22.9289 0.807611 21.9792 0.807611 21.3934 1.3934C20.8076 1.97919 20.8076 2.92893 21.3934 3.51472L29.8787 12L21.3934 20.4853C20.8076 21.0711 20.8076 22.0208 21.3934 22.6066C21.9792 23.1924 22.9289 23.1924 23.5147 22.6066L33.0607 13.0607ZM0 13.5H32V10.5H0V13.5Z' />
					</svg>
					<p>
						Sign in to the 2<sup>nd</sup> account
					</p>
				</li>
				<li className='flex items-center py-1'>
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
