const isInViewport = (_chai, utils) => {
	function assertIsInViewport(options) {
		const subject = this._obj;

		const right = Cypress.$(cy.state('window')).height();
		const rect = subject[0].getBoundingClientRect();

		this.assert(
			rect.left < right && rect.right < right,
			'expected #{this} to be in viewport',
			'expected #{this} to not be in viewport',
			this._obj
		);
	}

	_chai.Assertion.addMethod('inViewport', assertIsInViewport);
};

chai.use(isInViewport);
