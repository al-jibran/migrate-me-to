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
			cy.get('#open-menu')
				.click()
				.then(() => {
					cy.get('#close-menu').click();
					cy.get('#menu').should('not.be.inViewport');
				});
		});

		it('shows the menu on pressing on the hamburger icon', () => {
			cy.get('#open-menu').click();
			cy.get('#menu').should('be.inViewport');
		});
	});
});
