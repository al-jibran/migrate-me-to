import { useParams } from 'react-router-dom';

const Service = ({}: { name?: string }) => {
	const { name } = useParams();
	return <div className='mt-32 px-10'>Welcome to {name} Service</div>;
};

export default Service;
