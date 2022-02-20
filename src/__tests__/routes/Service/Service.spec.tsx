import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceType } from '../../../data/services';
import { ServiceContainer } from '../../../routes/Service';

describe('Service', () => {
	let context: RenderResult;

	const service: ServiceType = {
		name: 'Twitter',
		LogoSvgComponent: jest.fn().mockImplementation(() => null),
		transferrableList: [],
	};

	beforeEach(() => {
		context = render(
			<ServiceContainer name={service['name']} service={service} />
		);
	});

	describe('when the process starts', () => {
		let button: HTMLButtonElement;

		beforeEach(() => {
			const { getByRole } = context;
			button = getByRole('link', {
				name: /log in/i,
			}) as HTMLButtonElement;
			userEvent.click(button);
		});

		it('changes the first item to in progress', () => {
			const { getByLabelText } = context;

			expect(getByLabelText('step 1').children).toContain(
				getByLabelText('in progress')
			);
		});
	});
});
