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
	describe('initially', () => {
		it('renders each step with inactive lists', () => {
			const { getAllByLabelText, container } = context;

			const inactiveIcon = getAllByLabelText('inactive');
			const listItems = container.querySelectorAll('li');

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
			userEvent.click(button);
		});
	});
});
