import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MenuContainer as Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	describe('on smaller screens', () => {
		let context: RenderResult;
		let showMenu: boolean;
		let setShowState: jest.Mock;

		beforeEach(() => {
			showMenu = false;
			setShowState = jest.fn().mockImplementation(() => (showMenu = !showMenu));
			context = render(<Menu showMenu={showMenu} setShowMenu={setShowState} />);
		});

		it('initially the menu is hidden', async () => {
			expect(setShowState).not.toHaveBeenCalled();
			expect(showMenu).toBe(false);
		});

		it('shows the menu when clicked on open menu button', () => {
			const { getByLabelText } = context;
			userEvent.click(getByLabelText('open-menu'));
			expect(showMenu).toBe(true);
			expect(setShowState).toHaveBeenCalled();
		});

		it('hides the menu when clicked on close menu button', () => {
			const { getByLabelText } = context;
			userEvent.click(getByLabelText('open-menu'));
			userEvent.click(getByLabelText('close-menu'));
			expect(showMenu).toBe(false);
			expect(setShowState).toHaveBeenCalledTimes(2);
		});
	});
});
