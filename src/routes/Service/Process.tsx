import serviceImage from 'images/sign-in-with-twitter.png';
import { Dispatch, useState } from 'react';
import { getAuthorizeUserLink } from '../../api';
import { DispatchStatus } from './state/DispatchStatus';
import { ReducerActionType } from './state/reducer';

type StylesProps = {
	borderBottom: Record<string, string>;
	border: Record<string, string>;
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
};

interface ProcessProps {
	name: string;
	dispatchStepsStatus: Dispatch<ReducerActionType>;
}

export const Process: React.FC<ProcessProps> = ({
	name,
	dispatchStepsStatus,
}) => {
	const [loading, setLoading] = useState(false);

	const { handleDispatchStatus } = new DispatchStatus(dispatchStepsStatus);

	const handleLogin = () => {
		handleDispatchStatus('INPROGRESS', 'stepOne');
		setLoading(true);

		getAuthorizeUserLink()
			.then((data) => {
				window.open(data.authorizeUrl, '_self');
			})
			.catch((e) => e);
	};

	return (
		<ProcessContainer name={name} loading={loading} handleLogin={handleLogin} />
	);
};

interface ProcessContainerProps {
	name: string;
	loading: boolean;
	handleLogin: () => void;
}

export const ProcessContainer: React.FC<ProcessContainerProps> = ({
	name,
	loading,
	handleLogin,
}) => {
	const headingBorderColor = styles.borderBottom[name];

	return (
		<div className='flex justify-between'>
			<h3 className={`uppercase border-b-4 ${headingBorderColor} w-fit mt-14`}>
				1<sup className='lowercase'>st</sup> Account
			</h3>
			<div className='mt-14'>
				{loading ? (
					<div
						aria-label='loading'
						className='border-twitter border-l-transparent border-r-transparent border-l-white animate-spin border-4 rounded-full w-8 h-8'></div>
				) : (
					<img
						id='login'
						className='cursor-pointer'
						src={serviceImage}
						role='link'
						alt={`Log in with ${name}`}
						onClick={handleLogin}
					/>
				)}
			</div>
		</div>
	);
};

export default Process;
