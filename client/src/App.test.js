import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders header with brand name', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const brandElement = screen.getByText(/Refer & Earn Program/i);
  expect(brandElement).toBeInTheDocument();
});

test('renders footer with copyright', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const currentYear = new Date().getFullYear();
  const copyrightElement = screen.getByText(new RegExp(`© ${currentYear} Refer & Earn Program`, 'i'));
  expect(copyrightElement).toBeInTheDocument();
});
