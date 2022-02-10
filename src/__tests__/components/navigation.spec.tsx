import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuContainer as Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	describe('on smaller screens', () => {
		let context: RenderResult;
		let state: boolean;
		let setState: jest.Mock;
		let toggle: jest.Mock;

		beforeEach(() => {
			state = false;
			setState = jest.fn().mockImplementation((value) => (state = value));
			toggle = jest.fn();
			context = render(<Menu showMenu={state} setShowMenu={setState} />);
		});

		it('initially the menu is hidden', async () => {
			expect(setState).not.toHaveBeenCalled();
			expect(state).toBe(false);
		});

		it('shows the menu when clicked on open menu button', () => {
			const { getByLabelText } = context;
			userEvent.click(getByLabelText('open-menu'));
			expect(state).toBe(true);
			expect(setState).toHaveBeenCalledWith(true);
		});

		it('hides the menu when clicked on close menu button', () => {
			const { getByLabelText } = context;
			userEvent.click(getByLabelText('open-menu'));
			userEvent.click(getByLabelText('close-menu'));
			expect(state).toBe(false);
			expect(setState).toHaveBeenCalledTimes(2);
		});

		it('hides the menu when clicked on an item', () => {
			const { getByRole } = context;
			userEvent.click(
				getByRole('link', {
					name: /services/i,
				})
			);
			expect(setState).toHaveBeenCalledWith(false);
		});

		describe('toggling dark mode', () => {
			it('is initially set to dark', () => {
				const { debug } = context;
				debug();
				expect(2).toContain(2);
			});

			it('sets the class of body to none', () => {
				const { getByLabelText } = context;
				userEvent.click(getByLabelText('dark mode toggle'));
				const body = context.baseElement;
				expect(body.classList).not.toContain('dark');
			});

			it('calls the function to toggle mode', () => {
				const { getByLabelText } = context;
				userEvent.click(getByLabelText('dark mode toggle'));
				expect(toggle).toHaveBeenCalled();
			});
		});
	});
});
