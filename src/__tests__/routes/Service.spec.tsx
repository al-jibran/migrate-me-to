import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Steps } from '../../routes/Service';

describe('Service', () => {
	let context: RenderResult;
	let inProgress = false;
	let handleChangeStatus: jest.Mock;
	beforeEach(() => {
		handleChangeStatus = jest
			.fn()
			.mockImplementation(() => (inProgress = true));
		context = render(
			<Steps inProgress={inProgress} setInProgress={handleChangeStatus} />
		);
	});
	describe('initially', () => {
		it('renders each step with inactive lists', () => {
			const { getAllByLabelText, container } = context;

			const inactiveIcon = getAllByLabelText('inactive');
			const listItems = container.querySelectorAll('li');

			expect(inactiveIcon).toHaveLength(listItems.length);
			expect(inProgress).toBe(false);
		});
	});

	describe('when the state changes', () => {
		it('changes the first icon to active the first time', () => {
			const { getByText } = context;
			userEvent.click(getByText('Change Status'));
			expect(handleChangeStatus).toHaveBeenCalled();
			expect(inProgress).toBe(true);
		});
	});
});
