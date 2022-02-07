describe('a smoke test', () => {
	it('displays the home page', () => {
		cy.visit('/');
		cy.contains('Hello World');
	});
});