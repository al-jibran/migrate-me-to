describe('when the component render', () => {
	it('navigates to home page', () => {
		cy.visit('/');
		cy.contains('Migrate Me To');
	});
});
