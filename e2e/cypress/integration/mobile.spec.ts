describe('navigation', () => {
	describe('on mobile and tablets', () => {
		beforeEach(() => {
			cy.visit('/');
			cy.viewport(500, 600);
		});

		it('shows the hamburger menu', () => {
			cy.get('[aria-label=logo]').should('exist');
		});

		it('hides the menu on tapping x', () => {
			cy.get('[aria-label=open-menu]')
				.click()
				.then(() => {
					cy.get('[aria-label=close-menu]').click();
					cy.get('[aria-label=menu]').should('not.be.inViewport');
				});
		});

		it('shows the menu on pressing on the hamburger icon', () => {
			cy.get('[aria-label=open-menu]').click();
			cy.get('[aria-label=menu]').should('be.slidingFromRight');
		});

		it('hides the menu when clicked on an item', () => {
			cy.viewport(500, 600); // to be removed when desktop site is completed
			cy.server({ force404: true });
			cy.get('[aria-label=open-menu]').click();
			cy.contains('Services').click().should('not.be.slidingFromRight');
		});
	});
});
