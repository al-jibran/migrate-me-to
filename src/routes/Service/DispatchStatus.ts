import {
	failActionCreator,
	inProgressActionCreator,
	ReducerActionType,
	successActionCreator,
} from './reducer';
import { Dispatch } from 'react';

export class DispatchStatus {
	#dispatch;

	constructor(dispatch: Dispatch<ReducerActionType>) {
		this.#dispatch = dispatch;
	}

	handleDispatchStatus = (
		type: ReducerActionType['type'],
		step: ReducerActionType['step']
	) => {
		if (type === 'FAIL') this.#dispatch(failActionCreator(step));

		if (type === 'INPROGRESS') {
			this.#dispatch(inProgressActionCreator(step));
			switch (step) {
				case 'stepFour':
					this.#dispatch(successActionCreator('stepThree'));

				case 'stepThree':
					this.#dispatch(successActionCreator('stepTwo'));

				case 'stepTwo':
					this.#dispatch(successActionCreator('stepOne'));
			}
		}
	};
}
