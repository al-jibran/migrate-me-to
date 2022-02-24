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
		(getAuthorizeUserLink as jest.Mock).mockResolvedValue('resolved');

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
	let context: RenderResult;
	const serviceName = 'Twitter';
	const error = {
		code: 503,
		message: 'There was a problem connecting to the server. Try again later.',
	};

	beforeEach(() => {
		context = render(
			<Process name={serviceName} dispatchStepsStatus={jest.fn()} />
		);
	});

	describe('when the log in button is clicked', () => {
		let button: HTMLImageElement;

		const clickButton = () => {
			button = context.queryByRole('link', {
				name: /log in/i,
			}) as HTMLImageElement;

			expect(button).toBeInTheDocument();

			userEvent.click(button);

			return act(flushPromises); // clicking a button triggers an asynchronous task in handleLogin. This waits for it to fulfill.
		};

		describe('loading', () => {
			beforeEach(() => {
				(getAuthorizeUserLink as jest.Mock).mockResolvedValue('resolved');
				return clickButton();
			});

			it('displays the loading indicator', () => {
				const { queryByLabelText } = context;
				expect(queryByLabelText('loading')).not.toBeNull();
			});

			it('does not display the error', () => {
				const { queryByText } = context;
				expect(queryByText(error.message)).toBeNull();
			});

			it('does not display the button', () => {
				expect(button).not.toBeInTheDocument();
			});
		});

		describe('an error', () => {
			beforeEach(async () => {
				(getAuthorizeUserLink as jest.Mock).mockRejectedValue(error);
				return clickButton();
			});

			it('displays the error message', async () => {
				const { queryByText } = context;
				expect(queryByText(error.message)).not.toBeNull();
			});

			it('does not display the loading indicator', async () => {
				const { queryByLabelText } = context;
				expect(queryByLabelText('loading')).toBeNull();
			});

			it('displays the log in button again', async () => {
				const { queryByRole } = context;
				expect(queryByRole('link', { name: /log in/i })).toBeInTheDocument();
			});

			describe('trying again after the error', () => {
				// beforeEach of the parents will run before this.

				/* 
				Order of beforeEach called:
				
				1. Process (render the component)
				2. an error (mocks an error response)
				3. this - trying again after the error (loading)
				*/

				beforeEach(() => {
					const { queryByText } = context;
					expect(queryByText(error.message)).not.toBeNull();

					(getAuthorizeUserLink as jest.Mock).mockResolvedValue('resolved');

					return clickButton();
				});

				it('removes the error', () => {
					const { queryByText } = context;
					expect(queryByText(error.message)).toBeNull();
				});

				it('displays the loading indicator', () => {
					const { queryByLabelText } = context;
					expect(queryByLabelText('loading')).not.toBeNull();
				});
			});
		});
	});
});
