import { render, RenderResult } from '@testing-library/react';
import { Service } from '../../data/services';
import { Services } from '../../routes/Homepage';

describe('Services', () => {
	const services: Service[] = [
		{
			name: 'Twitter',
			LogoSvgComponent: jest.fn().mockImplementation(() => 'Twitter logo'),
			transferrableList: ['friends', 'family'],
		},
		{
			name: 'Reddit',
			LogoSvgComponent: jest.fn().mockImplementation(() => null),
			transferrableList: ['followers', 'liked'],
		},
	];

	let context: RenderResult;

	beforeEach(() => {
		context = render(<Services services={services} />);
	});

	it('calls the Logo Component', () => {
		const service = services[0];
		const { queryByText } = context;
		expect(service?.LogoSvgComponent).toHaveBeenCalled();
		expect(queryByText('Twitter logo')).toBeInTheDocument();
	});

	it('renders all the items in the array', async () => {
		const { findAllByTestId } = context;
		const elements = await findAllByTestId('service');

		expect(elements).toHaveLength(services.length);
	});
});
