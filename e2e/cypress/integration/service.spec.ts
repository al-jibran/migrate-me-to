describe('a service page', () => {
	beforeEach(() => {
		cy.visit('/');
		cy.get('#services').find('div').children().first().click();
	});

	it('displays a navigation bar on the top', () => {
		cy.get('nav').should('exist');
	});

	it('displays a footer at the bottom', () => {
		cy.get('footer').should('exist');
	});
});
