const isInViewport = (_chai, utils) => {
	function assertIsInViewport(options) {
		const subject = this._obj;

		const bottom = Cypress.$(cy.state('window')).height();
		const rect = subject[0].getBoundingClientRect();

		this.assert(
			rect.top < bottom && rect.bottom < bottom,
			'expected #{this} to be in viewport',
			'expected #{this} to not be in viewport',
			this._obj
		);
	}

	_chai.Assertion.addMethod('inViewport', assertIsInViewport);
};

const isSlidingFromRight = (_chai, utils) => {
	function assertIsInViewport(options) {
		const subject = this._obj;

		const right = Cypress.$(cy.state('window')).height();
		const rect = subject[0].getBoundingClientRect();

		this.assert(
			rect.right < right && rect.left < right,
			'expected #{this} to be in viewport',
			'expected #{this} to not be in viewport',
			this._obj
		);
	}

	_chai.Assertion.addMethod('slidingFromRight', assertIsInViewport);
};

chai.use(isInViewport);
chai.use(isSlidingFromRight);
