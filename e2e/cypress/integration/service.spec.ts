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

	describe('when the process starts', () => {
		beforeEach(() => {
			// eslint-disable-next-line quotes
			cy.contains(`Let's Start!`).as('start');
			cy.get('#steps li:nth-child(1)').as('first');
			cy.get('#steps li:nth-child(2)').as('second');
			cy.get('#steps li:nth-child(3)').as('third');
			cy.get('#steps li:nth-child(4)').as('fourth');
		});

		it('changes the first item to in progress when process starts', () => {
			cy.get('@start').click();
			cy.scrollTo('top');
			cy.get('#steps li:nth-child(1)').find('[aria-label="in progress"]');
		});

		it('changes the second item to be in progress and first to complete when the first one completes', () => {
			cy.get('@start').click();
			// Test for later when the backend is implemented!
			cy.intercept(
				{
					method: 'GET',
					url: 'oauth/authorize',
					headers: {
						oauth_callback: 'https%3A%2F%2Flocalhost:3000.com',
						oauth_consumer_key: 'cChZNFj6T5R0TigYB9yd1w',
					},
				},
				[
					{
						request:
							'https://yourCallbackUrl.com?oauth_token=NPcudxy0yU5T3tBzho7iCotZ3cnetKwcTIRlX0iwRl0&oauth_verifier=uw7NjWHT6OJ1MpJOXsHfNxoAhPKpgI8BlYDhxEjIBY',
					},
				]
			).as('authorize');

			// Remove it later when the backend is implemented!
			cy.wait(900);
			cy.get('@first').find('[aria-label="success"]');
			cy.get('@second').find('[aria-label="in progress"]');
		});

		it('changes the third item to in progress when the second one completes', () => {
			cy.get('@start').click();
			cy.wait(1200);
			cy.get('@first').find('[aria-label="success"]');
			cy.get('@second').find('[aria-label="success"]');
			cy.get('@third').find('[aria-label="in progress"]');
		});

		it('changes the fourth item to in progress when the third one completes', () => {
			cy.get('@start').click();
			cy.wait(1500);
			cy.get('@first').find('[aria-label="success"]');
			cy.get('@second').find('[aria-label="success"]');
			cy.get('@third').find('[aria-label="success"]');
			cy.get('@fourth').find('[aria-label="in progress"]');
		});

		it('changes the next steps to fail when one fails', () => {
			cy.get('@start').click();
			cy.wait(2000);
			cy.get('@first').find('[aria-label="fail"]');
		});
	});
});
