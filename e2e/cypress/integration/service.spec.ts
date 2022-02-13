describe('service', () => {
	const serviceName = 'Twitter';

	beforeEach(() => {
		cy.server({ force404: true });
		cy.visit('/');

		cy.get('#services')
			.scrollIntoView({ easing: 'linear' })
			.find(`[data-testid=${serviceName}-service]`)
			.as('service-item');
	});
	it('contains the service name', () => {
		cy.get('@service-item').contains(serviceName);
	});

	it('has a hover effect on the service', () => {
		cy.get('@service-item').realHover().should('have.css', 'cursor', 'pointer');
		cy.get('@service-item')
			.realHover()
			.should('have.css', 'transform', 'matrix(1.1, 0, 0, 1.1, 0, 0)');
	});

	it('navigates to service page when clicked on a service', () => {
		const serviceName = 'Twitter';
		cy.get('@service-item').click();
		cy.url().should('eq', `${Cypress.config().baseUrl}/service/${serviceName}`);
		cy.contains(serviceName);
	});
});
