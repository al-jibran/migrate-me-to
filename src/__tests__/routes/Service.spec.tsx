import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceType } from '../../data/services';
import {
	ServiceContainer,
	StepStatusType,
	StepsProps,
} from '../../routes/Service';

// Give a callback function to Steps componet that will take the name for in progress, complete, processes and update their state
// check whether the Steps components calls it
describe('Service', () => {
	let context: RenderResult;
	let status: StepsProps['status'];
	const service: ServiceType = {
		name: 'Twitter',
		LogoSvgComponent: jest.fn().mockImplementation(() => null),
		transferrableList: [],
	};
	let dispatch: jest.Mock;

	beforeEach(() => {
		status = {
			stepOne: StepStatusType.INACTIVE,
			stepTwo: StepStatusType.INACTIVE,
			stepThree: StepStatusType.INACTIVE,
			stepFour: StepStatusType.INACTIVE,
		};

		dispatch = jest.fn();

		context = render(
			<ServiceContainer
				name={service['name']}
				status={status}
				dispatch={dispatch}
				service={service}
			/>
		);
	});
	describe('initially', () => {
		it('renders each step with inactive lists', () => {
			const { getAllByLabelText, container } = context;

			const inactiveIcon = getAllByLabelText('inactive');
			const listItems = container.querySelectorAll('li');

			expect(status.stepOne).toBe(StepStatusType.INACTIVE);
			expect(status.stepTwo).toBe(StepStatusType.INACTIVE);
			expect(status.stepThree).toBe(StepStatusType.INACTIVE);
			expect(status.stepFour).toBe(StepStatusType.INACTIVE);
			expect(inactiveIcon).toHaveLength(listItems.length);
		});
	});

	describe('when the state changes', () => {
		let button: HTMLButtonElement;

		beforeEach(() => {
			const { getByRole } = context;
			button = getByRole('button', {
				name: /let's start!/i,
			}) as HTMLButtonElement;
		});

		it('changes the first icon to be in progress the first time', () => {
			const { getByLabelText } = context;

			userEvent.click(button);

			expect(dispatch).toHaveBeenCalled();
			expect(getByLabelText('in progress')).not.toBeNull();
		});
	});
});
