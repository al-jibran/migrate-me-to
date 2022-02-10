const checkDarkToggle = async (element: JQuery<HTMLElement>): Promise<void> => {
	const textColor = element.css('color');

	const colorToCheckFor =
		textColor === 'rgb(255, 255, 255)'
			? 'rgb(34, 34, 34)'
			: 'rgb(255, 255, 255)';

	cy.get('[aria-label="dark mode toggle"]').click();

	cy.get(element[0].localName).should('have.css', 'color', colorToCheckFor);
};

describe('tests unaffected by viewport size', () => {
	it('has a hover effect', () => {
		cy.server({ force404: true });
		cy.visit('/');
		const logo = cy.get('[aria-label=logo]');
		logo
			.trigger('mouseover')
			.then((elem) => elem.hasClass('hover:cursor-pointer'));
	});

	it('takes the user to homepage', () => {
		cy.get('[aria-label=logo]').click();
		cy.url().should('eq', `${Cypress.config().baseUrl}/`);
	});

	it('toggles the dark mode on', () => {
		cy.get('h1').then(checkDarkToggle);
		cy.get('h1').then(checkDarkToggle);
	});
});
