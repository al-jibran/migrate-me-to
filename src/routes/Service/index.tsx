import { useParams } from 'react-router-dom';
import { ServiceType, services } from '../../data/services';
import {
	StepFail,
	StepInactive,
	StepInProgress,
	StepSuccess,
} from '../../components/svgs';
import { useReducer } from 'react';
import { stepStatusReducer } from './reducer';
import Divider from '../../components/Divider';
import { DispatchStatus } from './DispatchStatus';

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

export enum StepStatusType {
	'INACTIVE',
	'INPROGRESS',
	'SUCCESS',
	'FAIL',
}

export const initStatus = {
	stepOne: StepStatusType.INACTIVE,
	stepTwo: StepStatusType.INACTIVE,
	stepThree: StepStatusType.INACTIVE,
	stepFour: StepStatusType.INACTIVE,
};

const Service = () => {
	const { name } = useParams<string>();

	if (!name) {
		throw new Error('Invalid route');
	}

	const service = services.find((service) => service.name === name);

	if (!service) {
		throw new Error('This service could not be found');
	}

	return <ServiceContainer name={name} service={service} />;
};

interface ServiceContainerProps {
	name: string;
	service: ServiceType;
}

export const ServiceContainer: React.FC<ServiceContainerProps> = ({
	name,
	service,
}) => {
	const [status, dispatch] = useReducer(stepStatusReducer, initStatus);
	const { handleDispatchStatus } = new DispatchStatus(dispatch);

	const headingBorderColor = styles.borderBottom[name];

	const onClickButton = () => {
		handleDispatchStatus('INPROGRESS', 'stepOne');
	};

	return (
		<div className='pt-32 px-10 sm:px-14 md:px-16 lg:px-24 xl:max-w-5xl xl:mx-auto h-screen'>
			<Steps status={status} />
			<button
				className='py-2 px-3 rounded-md text-white bg-gray-200 dark:bg-white dark:text-gray-200'
				onClick={onClickButton}>
				Let&apos;s Start!
			</button>
			<Divider service={service} />
			<h3
				className={`uppercase border-b-4 ${headingBorderColor} w-fit mx-auto mt-14`}>
				1<sup className='lowercase'>st</sup> Account
			</h3>
		</div>
	);
};

export interface StepsProps {
	status: {
		stepOne: StepStatusType;
		stepTwo: StepStatusType;
		stepThree: StepStatusType;
		stepFour: StepStatusType;
	};
}

export const Steps: React.FC<StepsProps> = ({ status }) => {
	return (
		<>
			<h3 className='mt-10 mb-4 uppercase'>Steps</h3>
			<ul id='steps'>
				<li className='flex items-center py-1' aria-label='step 1'>
					{<RenderStatus status={status.stepOne} />}
					<p>
						Sign in to the 1<sup>st</sup> account
					</p>
				</li>
				<li className='flex items-center py-1' aria-label='step 2'>
					{<RenderStatus status={status.stepTwo} />}
					<p>Select what to migrate</p>
				</li>
				<li className='flex items-center py-1' aria-label='step 3'>
					{<RenderStatus status={status.stepThree} />}
					<p>
						Sign in to the 2<sup>nd</sup> account
					</p>
				</li>
				<li className='flex items-center py-1' aria-label='step 4'>
					{<RenderStatus status={status.stepFour} />}
					<p>Wait</p>
				</li>
			</ul>
		</>
	);
};

interface RenderStatusProps {
	status: StepStatusType;
}

const RenderStatus: React.FC<RenderStatusProps> = ({ status }) => {
	const assertNever = (value: never): never => {
		throw new Error(
			`Unhandle discriminated union member: ${JSON.stringify(value)}`
		);
	};

	switch (status) {
		case StepStatusType.INACTIVE:
			return <StepInactive aria-label='inactive' />;

		case StepStatusType.INPROGRESS:
			return <StepInProgress aria-label='in progress' />;

		case StepStatusType.SUCCESS:
			return <StepSuccess aria-label='success' />;
		case StepStatusType.FAIL:
			return <StepFail aria-label='fail' />;

		default:
			return assertNever(status);
	}
};

export default Service;
