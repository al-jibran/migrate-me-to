import { BrowserRouter } from 'react-router-dom';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../../App';
import { MenuContainer as Menu } from '../../components/Navigation';

describe('Navigation Menu', () => {
	let context: RenderResult;
	let state: boolean;
	let setState: jest.Mock;
	let toggle: jest.Mock;
	let handleClick: jest.Mock;

	beforeEach(() => {
		state = false;
		setState = jest.fn().mockImplementation((value) => (state = value));
		toggle = jest.fn();
		handleClick = jest.fn();
		context = render(
			<Menu
				showMenu={state}
				setShowMenu={setState}
				toggleTheme={toggle}
				handleOnClickScroll={handleClick}
			/>
		);
	});

	describe('on smaller screens', () => {
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
			it('calls the function to toggle mode', () => {
				const { getByLabelText } = context;
				const darkModeButton = getByLabelText(
					'dark mode toggle'
				) as HTMLButtonElement;
				userEvent.click(darkModeButton);
				expect(toggle).toHaveBeenCalled();
			});

			it('stores "dark" in local storage if it is empty', () => {
				expect(window.localStorage.getItem('theme')).toBeNull();
				render(
					<BrowserRouter>
						<App />
					</BrowserRouter>
				);
				expect(window.localStorage.getItem('theme')).toMatch('dark');
			});

			it('stores the choice of the user in local storage', () => {
				const { getByLabelText } = context;
				userEvent.click(getByLabelText('dark mode toggle'));
				expect(window.localStorage.getItem('theme')).toMatch('');
			});

			describe('the app component', () => {
				let appContext: RenderResult;
				let body: HTMLElement;
				let darkModeButton: HTMLElement;

				beforeEach(() => {
					appContext = render(
						<BrowserRouter>
							<App />
						</BrowserRouter>
					);
					const { getByTestId, container } = appContext;
					body = getByTestId('container');
					darkModeButton = container.querySelector(
						'[aria-label="dark mode toggle"]'
					) as HTMLElement;
				});

				it('is initially set to dark', () => {
					expect(body.classList).toContain('dark');
				});

				it('removes the dark class when toggled the first time', () => {
					userEvent.click(darkModeButton);
					expect(body.classList).not.toContain('dark');
				});
			});
		});
	});
});
