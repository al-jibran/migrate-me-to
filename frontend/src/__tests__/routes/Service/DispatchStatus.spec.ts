import { DispatchStatus } from '../../../routes/Service/state//DispatchStatus';
import {
	failActionCreator,
	inProgressActionCreator,
	ReducerActionType,
	successActionCreator,
} from '../../../routes/Service/state/reducer';

describe('DispatchStatus', () => {
	let dispatch: jest.Mock;
	let handleDispatchStatus: (
		type: ReducerActionType['type'],
		step: ReducerActionType['step']
	) => void;

	beforeEach(() => {
		dispatch = jest.fn();
		handleDispatchStatus = new DispatchStatus(dispatch).handleDispatchStatus;
	});

	it('calls the dispatch function to change the status', () => {
		handleDispatchStatus('INPROGRESS', 'stepOne');
		expect(dispatch).toHaveBeenCalled();
	});

	it('calls the failActionCreator to dispatch fail status', () => {
		handleDispatchStatus('FAIL', 'stepOne');
		expect(dispatch).toHaveBeenCalledWith(failActionCreator('stepOne'));
	});

	it('changes the previous step status to success when a new one becomes in progress', () => {
		handleDispatchStatus('INPROGRESS', 'stepTwo');
		expect(dispatch).toHaveBeenCalledTimes(2);
		expect(dispatch).toHaveBeenCalledWith(inProgressActionCreator('stepTwo'));
		expect(dispatch).toHaveBeenCalledWith(successActionCreator('stepOne'));
	});
});
