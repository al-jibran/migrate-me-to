import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	describe('Smaller Screens', () => {
		it('closes the menu on pressing on x', () => {
			const handleCloseMenu = jest.fn();

			const { getByTestId } = render(
				<Menu handleCloseMenu={handleCloseMenu} />
			);
			userEvent.click(getByTestId('close-menu'));
			expect(handleCloseMenu).toHaveBeenCalled();
		});
	});
});
