describe('a smoke test', () => {
	it('displays the home page', () => {
		cy.visit('/');
		cy.contains('Migrate Me To');
	});
});