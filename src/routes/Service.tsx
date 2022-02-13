import { useParams } from 'react-router-dom';
import { normalizeClass } from '../utility/normalizeClass';
import { services } from '../data/services';
// import {
// 	StepFail,
// 	StepInactive,
// 	StepInProgress,
// 	StepSuccess,
// } from '../components/svgs';

type StylesProps = {
	borderBottom: Record<string, string>;
	border: Record<string, string>;
	divider: Record<string, string>;
};

const styles: StylesProps = {
	borderBottom: {
		Twitter: 'border-b-twitter',
		Reddit: 'border-b-reddit',
	},

	border: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},

	divider: {
		mobile:
			'flex justify-center items-center w-16 h-16 border-4 mx-auto rounded-full relative top-10 animate-pulse',
		after:
			'after:absolute after:w-screen after:border after:border-t-4 after:top-6 after:left-14',
		before:
			'before:absolute before:w-screen before:border before:border-t-4 before:top-6 before:right-14',
	},
};

const Service = () => {
	const { name } = useParams<string>();
	const dividerStyle = normalizeClass(styles.divider);

	const borderColor: Record<string, string> = {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	};

	const fillColor: Record<string, string> = {
		Twitter: 'fill-twitter',
		Reddit: 'fill-reddit',
	};

	const beforeDivider: Record<string, string> = {
		Twitter: 'before:border-twitter',
		Reddit: 'before:border-reddit',
	};

	const afterDivider: Record<string, string> = {
		Twitter: 'after:border-twitter',
		Reddit: 'after:border-reddit',
	};

	if (!name) {
		throw new Error('invalid argument');
	}

	const service = services.find((service) => service.name === name);

	if (!service) {
		throw new Error('This service could not be found');
	}

	const headingBorderColor = styles.borderBottom[name];

	return (
		<div className='pt-32 px-10 h-screen'>
			<h1
				className={`text-4xl uppercase pb-3 border-b-4 ${headingBorderColor} w-fit mx-auto`}>
				1<sup className='lowercase'>st</sup> Account
			</h1>
			<Steps onGoing={true} success={true} />
			<div
				className={` ${dividerStyle} ${borderColor[name]} ${beforeDivider[name]} ${afterDivider[name]}`}>
				<service.LogoSvgComponent className={`w-8 h-8 ${fillColor[name]}`} />
			</div>
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
