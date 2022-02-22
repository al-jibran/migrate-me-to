import { StepStatusType } from '.';
import {
	StepFail,
	StepInactive,
	StepInProgress,
	StepSuccess,
} from '../../components/svgs';

interface StepsProps {
	status: {
		stepOne: StepStatusType;
		stepTwo: StepStatusType;
		stepThree: StepStatusType;
		stepFour: StepStatusType;
	};
}

const Steps: React.FC<StepsProps> = ({ status }) => {
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

export default Steps;