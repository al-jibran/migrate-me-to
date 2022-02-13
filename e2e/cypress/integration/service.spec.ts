describe('a service page', () => {
	const serviceName = 'Twitter';

	beforeEach(() => {
		cy.visit(`/service/${serviceName}`);
	});

	it('displays a navigation bar on the top', () => {
		cy.get('nav').should('exist');
	});

	it('displays the service name on screen', () => {
		cy.get('@service')
			.find('h3')
			.its('text')
			.then((text) => {
				cy.contains(text());
			});
	});

	it('displays a footer at the bottom', () => {
		cy.get('footer').should('exist');
	});
});
