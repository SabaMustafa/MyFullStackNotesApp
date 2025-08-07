import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Login from './components/LoginForm'; // ✅ use correct path to your component
import axios from 'axios';

jest.mock('axios'); // ✅ mock axios

// ✅ mock localStorage and alert
beforeAll(() => {
  Storage.prototype.setItem = jest.fn();
  window.alert = jest.fn();
});

describe('Login Component', () => {
  it('renders login form inputs', () => {
    render(<Login />);

    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  it('logs in user successfully', async () => {
    const fakeToken = 'mocked_token';
    axios.post.mockResolvedValueOnce({ data: { token: fakeToken } });

    render(<Login />);

    // ✅ simulate typing
    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'testuser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: '123' },
    });

    // ✅ simulate click
    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    // ✅ wait for the mock request to finish
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://127.0.0.1:8000/login/',
        {
          username: 'testuser',
          password: '123',
        }
      );

      expect(localStorage.setItem).toHaveBeenCalledWith('token', fakeToken);
      expect(window.alert).toHaveBeenCalledWith('Login successful');
    });
  });

  it('shows error alert on failed login', async () => {
    axios.post.mockRejectedValueOnce(new Error('Invalid credentials'));

    render(<Login />);

    fireEvent.change(screen.getByPlaceholderText('Username'), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText('Password'), {
      target: { value: 'wrongpass' },
    });

    fireEvent.click(screen.getByRole('button', { name: /login/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Login failed');
    });
  });
});
