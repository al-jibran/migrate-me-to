import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from '../App';

it('render Hello World', () => {
	const { queryByText } = render(<App />);
	expect(queryByText('Hello World')).toHaveTextContent('Hello World');
});
