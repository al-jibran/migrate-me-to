import express, { Express, NextFunction } from 'express';
import supertest from 'supertest';

/**
 *	This method is used to create a stubbed api since
 *  there is no (easy) way to provide the real one with stub session data for tests.
 *
 *  @param route: route to inject the value in.
 *
 */
export const stubApiForRoute = (app: Express, route: string) => {
	// creating a fake express app.
	let stubApp: Express;

	stubApp = express();

	return {
		withSession: (session: any) => {
			// stubbing our session middleware
			stubApp.use((req: any, _res, next: NextFunction) => {
				req.session = {};
				next();
			});

			// providing the session value to the route
			stubApp.get(route, (req, _, next) => {
				req.session = session;
				next();
			});

			// using everything else of our app
			stubApp.use(app);
			return supertest(stubApp);
		},
	};
};
