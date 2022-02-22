import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ServiceType } from '../../../data/services';
import { ServiceContainer } from '../../../routes/Service';
import { Process, ProcessContainer } from '../../../routes/Service/Process';

describe('Service', () => {
	let serviceContext: RenderResult;
	let button: HTMLImageElement;

	const service: ServiceType = {
		name: 'Twitter',
		LogoSvgComponent: jest.fn().mockImplementation(() => null),
		transferrableList: [],
	};

	beforeEach(() => {
		serviceContext = render(
			<ServiceContainer name={service['name']} service={service} />
		);

		button = serviceContext.getByRole('link', {
			name: /log in/i,
		}) as HTMLImageElement;
	});

	it('changes the first step to in progress when clicked on log in button', () => {
		const { getByLabelText } = serviceContext;

		userEvent.click(button);

		expect(getByLabelText('step 1').children).toContain(
			getByLabelText('in progress')
		);
	});
});

describe('Process', () => {
	let processContext: RenderResult;
	const serviceName = 'Twitter';

	const renderWithProps = (loading: boolean) => {
		const props = {
			name: serviceName,
			handleLogin: jest.fn().mockName('handleLogin'),
			loading,
		};

		processContext = render(<ProcessContainer {...props} />);
	};

	it('displays a loading indicator when loading', () => {
		renderWithProps(true);

		const { queryByLabelText, queryByRole } = processContext;

		expect(queryByLabelText('loading')).not.toBeNull();
		expect(queryByRole('link', { name: /log in/i })).toBeNull();
	});

	it('does not display the loading indicator when not loading', () => {
		renderWithProps(false);
		const { queryByLabelText, queryByRole } = processContext;

		expect(queryByLabelText('loading')).toBeNull();
		expect(queryByRole('link', { name: /log in/i })).not.toBeNull();
	});

	it('changes the button to loading when the button is clicked', async () => {
		const dispatch = jest.fn();

		const { queryByRole } = render(
			<Process name={serviceName} dispatchStepsStatus={dispatch} />
		);

		const button = queryByRole('link', { name: /log in/i }) as HTMLImageElement;

		// using toBeInTheDocument instead of toBeNull because toBeNull would require a rerendering since
		// this instance of button is when the button was not null.

		expect(button).toBeInTheDocument();
		userEvent.click(button);
		expect(button).not.toBeInTheDocument();
	});
});
