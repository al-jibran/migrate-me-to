import { useParams } from 'react-router-dom';
import { normalizeClass } from '../utility/normalizeClass';
import { ServiceType, services } from '../data/services';
import {
	StepFail,
	StepInactive,
	StepInProgress,
	StepSuccess,
} from '../components/svgs';
import { useReducer } from 'react';

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

export enum StepStatusType {
	'INACTIVE',
	'INPROGRESS',
	'SUCCESS',
	'FAIL',
}

const initStatus = {
	stepOne: StepStatusType.INACTIVE,
	stepTwo: StepStatusType.INACTIVE,
	stepThree: StepStatusType.INACTIVE,
	stepFour: StepStatusType.INACTIVE,
};

type StateStatusType = typeof initStatus;

interface ReducerActionBase {
	type: string;
	step: keyof StateStatusType;
}

interface InactiveAction extends ReducerActionBase {
	type: 'INACTIVE';
}

interface InProgressAction extends ReducerActionBase {
	type: 'INPROGRESS';
}

interface SuccessAction extends ReducerActionBase {
	type: 'SUCCESS';
}

interface FailAction extends ReducerActionBase {
	type: 'FAIL';
}

type ReducerActionType =
	| InactiveAction
	| InProgressAction
	| SuccessAction
	| FailAction;

const stepStatusReducer = (
	state: StateStatusType,
	action: ReducerActionType
): StateStatusType => {
	const stepName: keyof StateStatusType = action.step;
	const newState = { ...state };
	switch (action.type) {
		case 'INACTIVE': {
			newState[stepName] = StepStatusType.INACTIVE;
			return newState;
		}

		case 'INPROGRESS': {
			newState[stepName] = StepStatusType.INPROGRESS;
			return newState;
		}
	}
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
	const headingBorderColor = styles.borderBottom[name];

	return (
		<div className='pt-32 px-10 h-screen'>
			<Steps status={status} />
			<button
				className='py-2 px-3 rounded-md bg-white text-gray-200'
				onClick={() => dispatch({ type: 'INPROGRESS', step: 'stepOne' })}>
				Let&apos;s Start!
			</button>
			<Divider service={service} />
			<h1
				className={`text-4xl uppercase pb-3 border-b-4 ${headingBorderColor} w-fit mx-auto`}>
				1<sup className='lowercase'>st</sup> Account
			</h1>
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
			<h2 className='mt-10 mb-4 uppercase'>Steps</h2>
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

interface DividerProps {
	service: ServiceType;
}

interface DividerStylesProps {
	borderColor: Record<string, string>;
	fillColor: Record<string, string>;
	beforeDivider: Record<string, string>;
	afterDivider: Record<string, string>;
}

const DividerStyles: DividerStylesProps = {
	borderColor: {
		Twitter: 'border-twitter',
		Reddit: 'border-reddit',
	},

	fillColor: {
		Twitter: 'fill-twitter',
		Reddit: 'fill-reddit',
	},

	beforeDivider: {
		Twitter: 'before:border-twitter',
		Reddit: 'before:border-reddit',
	},

	afterDivider: {
		Twitter: 'after:border-twitter',
		Reddit: 'after:border-reddit',
	},
};
const Divider: React.FC<DividerProps> = ({ service }) => {
	const dividerStyle = normalizeClass(styles.divider);
	const name = service.name;
	return (
		<div
			className={` ${dividerStyle} ${DividerStyles.borderColor[name]} ${DividerStyles.beforeDivider[name]} ${DividerStyles.afterDivider[name]}`}>
			<service.LogoSvgComponent
				className={`w-8 h-8 ${DividerStyles.fillColor[name]}`}
			/>
		</div>
	);
};
export default Service;
