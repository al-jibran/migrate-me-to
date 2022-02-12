describe('routes', () => {
	beforeEach(() => {
		cy.server({ force404: true });
		cy.visit('/');
	});

	it('navigates to service page when clicked on a service', () => {
		const serviceName = 'twitter';

		cy.get('#services')
			.scrollIntoView({ easing: 'swing' })
			.find(`.bg-${serviceName}`)
			.click();

		cy.url().should('eq', `${Cypress.config().baseUrl}/service/${serviceName}`);
	});
});
