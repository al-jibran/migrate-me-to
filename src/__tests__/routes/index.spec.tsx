import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ServiceCardLarge } from '../../components/ServiceCardLarge';

describe('routes', () => {
	it('calls the function to change routes', () => {
		const serviceName = 'Twitter';
		const LogoSvGComponent = jest.fn().mockImplementation(() => null);
		const transferrableList: string[] = [];
		const handleOnClick = jest.fn();
		const { getByTestId } = render(
			<ServiceCardLarge
				name={serviceName}
				LogoSvgComponent={LogoSvGComponent}
				transferrableList={transferrableList}
				handleOnClick={handleOnClick}
			/>
		);
		const serviceToTest = getByTestId('service');
		userEvent.click(serviceToTest);
		expect(handleOnClick).toHaveBeenCalled();
	});
});
