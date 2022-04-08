import { render, RenderResult } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ServiceType } from '../../data/services';
import { Services } from '../../routes/Homepage';

describe('Services', () => {
	const services: ServiceType[] = [
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
		context = render(
			<BrowserRouter>
				<Services services={services} />
			</BrowserRouter>
		);
	});

	it('calls the Logo Component', () => {
		const service = services[0];
		const { queryByText } = context;
		expect(service?.LogoSvgComponent).toHaveBeenCalled();
		expect(queryByText('Twitter logo')).toBeInTheDocument();
	});

	it('renders all the items in the array', async () => {
		const { container } = context;
		const elements = container.querySelector('#services div')?.children;

		expect(elements).toHaveLength(services.length);
	});
});
