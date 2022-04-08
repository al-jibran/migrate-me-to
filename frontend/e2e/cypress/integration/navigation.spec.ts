const checkDarkToggle = async (element: JQuery<HTMLElement>): Promise<void> => {
	const textColor = element.css('color');

	const colorToCheckFor =
		textColor === 'rgb(255, 255, 255)'
			? 'rgb(34, 34, 34)'
			: 'rgb(255, 255, 255)';

	cy.get('[aria-label="dark mode toggle"]').click();

	cy.get(element[0].localName).should('have.css', 'color', colorToCheckFor);
};

describe('navigation', () => {
	beforeEach(() => {
		cy.server({ force404: true });
		cy.visit('/');
		const navigationBar = cy.get('nav');
		navigationBar.should('be.visible');
		cy.get('[aria-label=logo]').as('logo');
	});

	describe('navigation bar', () => {
		it('takes the user to homepage when clicked on logo', () => {
			cy.get('@logo').click();
			cy.url().should('eq', `${Cypress.config().baseUrl}/`);
		});

		it('toggles the dark mode', () => {
			cy.get('h1').then(checkDarkToggle);
			cy.get('h1').then(checkDarkToggle);
		});

		it('initially has dark mode on', () => {
			cy.get('h1').should('have.css', 'color', 'rgb(255, 255, 255)');
			cy.get('[aria-label="dark mode toggle"]').click();
		});
	});

	describe('clicking menu items', () => {
		it('scrolls to services when clicked on services menu item', () => {
			cy.get('nav').contains('Services').click();
			cy.get('#services').should('be.inViewport');
		});

		it('scrolls to about when clicked on about item', () => {
			cy.get('nav').contains('About').click();
			cy.get('#about').should('be.inViewport');
		});
	});
});
