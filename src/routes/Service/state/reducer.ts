import { initStatus, StepStatusType } from '..';

export type StateStatusType = typeof initStatus;

interface ReducerActionBase {
	type: string;
	step: keyof StateStatusType;
}

interface InactiveAction extends ReducerActionBase {
	type: 'INACTIVE';
}

interface InProgressAction extends ReducerActionBase {
	type: 'INPROGRESS';
}

interface SuccessAction extends ReducerActionBase {
	type: 'SUCCESS';
}

interface FailAction extends ReducerActionBase {
	type: 'FAIL';
}

export type ReducerActionType =
	| InactiveAction
	| InProgressAction
	| SuccessAction
	| FailAction;

export const stepStatusReducer = (
	state: StateStatusType,
	action: ReducerActionType
): StateStatusType => {
	const stepName: keyof StateStatusType = action.step;
	const newState = { ...state };

	switch (action.type) {
		case 'INACTIVE': {
			newState[stepName] = StepStatusType.INACTIVE;
			return newState;
		}

		case 'INPROGRESS': {
			newState[stepName] = StepStatusType.INPROGRESS;
			return newState;
		}

		case 'SUCCESS': {
			newState[stepName] = StepStatusType.SUCCESS;
			return newState;
		}

		case 'FAIL': {
			newState[stepName] = StepStatusType.FAIL;
			return newState;
		}

		default:
			return state;
	}
};

export const inProgressActionCreator = (
	step: ReducerActionType['step']
): InProgressAction => {
	return {
		type: 'INPROGRESS',
		step,
	};
};

export const successActionCreator = (
	step: ReducerActionType['step']
): SuccessAction => {
	return {
		type: 'SUCCESS',
		step,
	};
};

export const failActionCreator = (
	step: ReducerActionType['step']
): FailAction => {
	return {
		type: 'FAIL',
		step,
	};
};
