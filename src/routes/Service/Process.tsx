import serviceImage from 'images/sign-in-with-twitter.png';
import { Dispatch, useState } from 'react';
import { getAuthorizeUserLink } from '../../api';
import Loading from '../../components/Loading';
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
	const [error, setError] = useState<AppError | null>(null);

	const { handleDispatchStatus } = new DispatchStatus(dispatchStepsStatus);

	const handleLogin = () => {
		let isMounted = true;
		handleDispatchStatus('INPROGRESS', 'stepOne');
		setLoading(true);

		getAuthorizeUserLink()
			.then((data) => {
				window.open(data.authorizeUrl, '_self');
			})
			.catch((e: AppError) => {
				if (isMounted) setError(e);
			});

		isMounted = false;
	};

	return (
		<ProcessContainer
			name={name}
			loading={loading}
			error={error}
			handleLogin={handleLogin}
		/>
	);
};

interface AppError {
	code: number;
	message: string;
}

interface ProcessContainerProps {
	name: string;
	loading: boolean;
	error: AppError | null;
	handleLogin: () => void;
}

const ProcessContainer: React.FC<ProcessContainerProps> = ({
	name,
	loading,
	error,
	handleLogin,
}) => {
	const headingBorderColor = styles.borderBottom[name] || 'teal-300';
	const loadingIconColor = styles.border[name] || 'teal-300';

	return (
		<div className='mt-14'>
			<div className='flex justify-between mt-5'>
				<h3 className={`uppercase border-b-4 ${headingBorderColor} w-fit`}>
					1<sup className='lowercase'>st</sup> Account
				</h3>
				<div>
					{loading ? (
						<Loading color={loadingIconColor} />
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
		</div>
	);
};

export default Process;
