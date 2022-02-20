describe('a service page', () => {
	const serviceName = 'Twitter';
	const serviceAuthorizeUrl =
		/https:\/\/api\.twitter\.com\/oauth\/authorize\?oauth_token=\w+/g;

	beforeEach(() => {
		cy.visit(`/service/${serviceName}`);
	});

	it('displays a navigation bar on the top', () => {
		cy.get('nav').should('exist');
	});

	it('displays a footer at the bottom', () => {
		cy.get('footer').should('exist');
	});

	it('has all the steps as inactive', () => {
		cy.get('#steps li:nth-child(1)').as('first');
		cy.get('#steps li:nth-child(2)').as('second');
		cy.get('#steps li:nth-child(3)').as('third');
		cy.get('#steps li:nth-child(4)').as('fourth');

		cy.scrollTo('top');

		cy.get('#steps li:nth-child(1)').find('[aria-label="inactive"]');
		cy.get('#steps li:nth-child(2)').find('[aria-label="inactive"]');
		cy.get('#steps li:nth-child(3)').find('[aria-label="inactive"]');
		cy.get('#steps li:nth-child(4)').find('[aria-label="inactive"]');
	});

	it('open the page to login when clicked on log in to service button', () => {
		cy.get('#login').click();
		cy.url().should('match', serviceAuthorizeUrl);
	});
});
