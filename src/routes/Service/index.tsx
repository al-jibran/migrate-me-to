import { useParams } from 'react-router-dom';
import { ServiceType, services } from '../../data/services';
import { useReducer } from 'react';
import { stepStatusReducer } from './state/reducer';
import Divider from '../../components/Divider';
import { DispatchStatus } from './state/DispatchStatus';
import { getAuthorizeUserLink } from '../../api';
import Process from './Process';
import Steps from './Steps';


export enum StepStatusType {
	'INACTIVE',
	'INPROGRESS',
	'SUCCESS',
	'FAIL',
}

export const initStatus = {
	stepOne: StepStatusType.INACTIVE,
	stepTwo: StepStatusType.INACTIVE,
	stepThree: StepStatusType.INACTIVE,
	stepFour: StepStatusType.INACTIVE,
};

const Service = () => {
	const { name } = useParams<string>();

	if (!name) {
		throw new Error('Invalid route');
	}

	const service = services.find((service) => service.name === name);

	if (!service) {
		throw new Error('This service could not be found');
	}

	return <ServiceContainer name={name} service={service} />;
};

interface ServiceContainerProps {
	name: string;
	service: ServiceType;
}

export const ServiceContainer: React.FC<ServiceContainerProps> = ({
	name,
	service,
}) => {
	const [stepStatus, dispatch] = useReducer(stepStatusReducer, initStatus);
	const { handleDispatchStatus } = new DispatchStatus(dispatch);


	const handleLogin = () => {
		handleDispatchStatus('INPROGRESS', 'stepOne');

		getAuthorizeUserLink().then((data) => {
			window.open(data.authorizeUrl, '_self');
		});
	};

	return (
		<div className='pt-32 px-10 sm:px-14 md:px-16 lg:px-24 xl:max-w-5xl xl:mx-auto h-screen'>
			<Steps status={stepStatus} />
			<Divider service={service} />
			<Process name={name} handleLogin={handleLogin}/>
		</div>
	);
};


export default Service;
