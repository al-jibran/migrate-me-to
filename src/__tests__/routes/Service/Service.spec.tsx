import { act, render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import flushPromises from 'flush-promises';

import { ServiceType } from '../../../data/services';
import { ServiceContainer } from '../../../routes/Service';
import { Process } from '../../../routes/Service/Process';
import { getAuthorizeUserLink } from '../../../api';

jest.mock('../../../api');
window.open = jest.fn();

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
	const error = {
		code: 503,
		message: 'There is a problem connecting to the server. Try again later.',
	};

	const renderWithProps = (propsOverride = {}) => {
		const props = {
			name: serviceName,
			handleLogin: jest.fn().mockName('handleLogin'),
			loading: false,
			error: null,
			...propsOverride,
		};

		processContext = render(<ProcessContainer {...props} />);
	};

	describe('while loading', () => {
		beforeEach(() => {
			renderWithProps({ loading: true });
		});

		it('displays a loading indicator', () => {
			const { queryByLabelText } = processContext;
			expect(queryByLabelText('loading')).not.toBeNull();
		});

		it('does not display the error message', () => {
			const { queryByText } = processContext;
			expect(queryByText(error.message)).toBeNull();
		});

		it('does not display the log in button', () => {
			const { queryByRole } = processContext;
			expect(queryByRole('link', { name: /log in/i })).toBeNull();
		});
	});

	describe('error', () => {
		beforeEach(() => {
			renderWithProps({ error });
			return act(flushPromises);
		});

		it('displays the appropriate message if cannot connect to the backend', () => {
			const { queryByText } = processContext;
			expect(queryByText(error.message)).not.toBeNull();
		});

		it('does not display the loading indicator', () => {
			const { queryByLabelText } = processContext;
			expect(queryByLabelText('loading')).toBeNull();
		});

		it('displays the button to log in again', () => {
			const { queryByRole } = processContext;
			expect(queryByRole('link', { name: /log in/i })).not.toBeNull();
		});
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
