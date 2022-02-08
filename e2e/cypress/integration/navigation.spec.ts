describe('navigation', () => {
	describe('on mobile and tablets', () => {
		it('shows the hamburger menu', () => {
			cy.visit('/');
			cy.viewport(500, 404);
			cy.get('svg').should('exist');
		});

		it('hides the menu on tapping x', () => {
			cy.visit('/');
			cy.viewport(500, 404);
			cy.get('#close-menu').should('not.be.visible');
		});
	});
});
