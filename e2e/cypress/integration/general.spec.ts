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
});
