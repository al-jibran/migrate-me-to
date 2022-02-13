import { useParams } from 'react-router-dom';
// import {
// 	StepFail,
// 	StepInactive,
// 	StepInProgress,
// 	StepSuccess,
// } from '../components/svgs';

const styles: Record<string, Record<string, string>> = {
	border: {
		Twitter: 'border-b-twitter',
		Reddit: 'border-b-reddit',
	},
};

const Service = () => {
	const { name } = useParams<string>();

	if (!name) {
		throw new Error('invalid argument');
	}

	if (!styles) {
		throw new Error('No style was defined for this page');
	} else if (!styles.border) {
		styles.border = {};
		styles.border[name] = '#000';
	}

	const borderColor = styles.border[name];

	return (
		<div className='pt-32 px-10 h-screen'>
			<h1
				className={`text-4xl uppercase pb-3 border-b-4 ${borderColor} w-fit mx-auto`}>
				1<sup className='lowercase'>st</sup> Account
			</h1>
			<Steps onGoing={true} success={true} />
		</div>
	);
};

interface StepsProps {
	onGoing: boolean;
	success: boolean;
}

const Steps: React.FC<StepsProps> = ({ onGoing, success }) => {
	onGoing && success;
	return (
		<>
			<h2 className='mt-10 mb-4 uppercase'>Steps</h2>
			<ul>
				<li className='flex items-center py-1'>
					<p>
						Sign in to the 1<sup>st</sup> account
					</p>
				</li>
				<li className='flex items-center py-1'>
					<p>Select what to migrate</p>
				</li>
				<li className='flex items-center py-1'>
					<p>
						Sign in to the 2<sup>nd</sup> account
					</p>
				</li>
				<li className='flex items-center py-1'>
					<p>Wait</p>
				</li>
			</ul>
		</>
	);
};

export default Service;
