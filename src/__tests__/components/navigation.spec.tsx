import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	describe('Smaller Screens', () => {
		let handleCloseMenu: jest.Mock;
		let handleOpenMenu: jest.Mock;
		let context: RenderResult;

		beforeEach(() => {
			handleCloseMenu = jest.fn();
			handleOpenMenu = jest.fn();

			context = render(<Menu />);
		});

		it('calls the handling function on pressing x', () => {
			const { getByTestId } = context;
			userEvent.click(getByTestId('close-menu'));
			expect(handleCloseMenu).toHaveBeenCalled();
		});

		it('calls the handling function on pressing the hamburger icon', () => {
			const { getByTestId } = context;
			userEvent.click(getByTestId('open-menu'));
			expect(handleOpenMenu).toHaveBeenCalled();
		});
	});
});
