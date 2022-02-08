describe('navigation', () => {
	describe('on mobile and tablets', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.viewport(500, 600);
		});

		it('shows the hamburger menu', () => {
			cy.get('svg').should('exist');
		});

		it('hides the menu on tapping x', () => {
			cy.get('#close-menu').click().should('not.be.inViewport');
		});
	});
});
