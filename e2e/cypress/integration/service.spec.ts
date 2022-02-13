describe('a service page', () => {
	const serviceName = 'Twitter';

	beforeEach(() => {
		cy.visit(`/service/${serviceName}`);
	});

	it('displays a navigation bar on the top', () => {
		cy.get('nav').should('exist');
	});

	it('displays a footer at the bottom', () => {
		cy.get('footer').should('exist');
	});

	it('render with each step having inactive status', () => {
		cy.get('[aria-label="inactive"]');
	});

	it('changes the inactive item to in progress when the button is clicked', () => {
		cy.get('button').click();
		cy.scrollTo('top');
		cy.get('[aria-label="step 1"]')
			.children()
			.get('[aria-label="in progress"]');
	});
});
