import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders Title', () => {
	render(<App />);
	const linkElement = screen.getByText(/Quick Notes/i);
	expect(linkElement).toBeInTheDocument();
});
