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







		});

		});
	});
});
