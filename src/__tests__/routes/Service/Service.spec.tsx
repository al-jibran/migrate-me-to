import { getByLabelText, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceType } from '../../../data/services';
import { ServiceContainer } from '../../../routes/Service';
import Process from '../../../routes/Service/Process';

describe('Service', () => {
	let serviceContext: RenderResult;
	let button: HTMLButtonElement;

	const service: ServiceType = {
		name: 'Twitter',
		LogoSvgComponent: jest.fn().mockImplementation(() => null),
		transferrableList: [],
	};

	beforeEach(() => {
		serviceContext = render(
			<ServiceContainer name={service['name']} service={service} />
		);
	});

	it('changes the first step to in progress when clicked on log in button', () => {
		const { getByRole } = serviceContext;

		button = getByRole('link', {
			name: /log in/i,
		}) as HTMLButtonElement;
		userEvent.click(button);

		const { getByLabelText } = serviceContext;

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

		processContext = render(<Process {...props} />);
	};

	it('changes the log in button to display a loading indicator', () => {
		renderWithProps(true);

		const { queryByLabelText, queryByRole } = processContext;

		expect(queryByLabelText('loading')).not.toBeNull();
		expect(queryByRole('link', { name: /log in/i })).toBeNull();
	});

	it('does not display the loading indicator when not loading', () => {
		renderWithProps(false);
		const { queryByLabelText, queryByRole, debug } = processContext;
		debug();

		expect(queryByLabelText('loading')).toBeNull();
		expect(queryByRole('link', { name: /log in/i })).not.toBeNull();
	});
});
