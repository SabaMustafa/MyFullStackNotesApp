import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders navigation links', () => {
  render(<App />);

  expect(screen.getByText('Notes App')).toBeInTheDocument();
  expect(screen.getByText('Register')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
  expect(screen.getByText('Create Note')).toBeInTheDocument();
  expect(screen.getByText('View Notes')).toBeInTheDocument();
});