import { render} from '@testing-library/react';
import { Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	describe('Smaller Screens', () => {
		it('closes the menu on pressing on x', () => {
			const handleCloseMenu = jest.fn();

			render(<Menu handleCloseMenu={handleCloseMenu} />); 
			expect(handleCloseMenu).toHaveBeenCalled();
		});
	});
});