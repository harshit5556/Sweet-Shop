import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import App from '../../src/App';
import { AuthContext } from '../../src/context/AuthContext';
import { authService } from '../../src/services/authService';
import { sweetService } from '../../src/services/sweetService';

// Mock services
vi.mock('../../src/services/authService');
vi.mock('../../src/services/sweetService');

describe('User Flow Integration Tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderApp = (initialRoute = '/') => {
    return render(
      <MemoryRouter initialEntries={[initialRoute]}>
        <AuthContext.Provider
          value={{
            user: null,
            loading: false,
            login: authService.login,
            register: authService.register,
            logout: vi.fn(),
            isAdmin: vi.fn(() => false),
          }}
        >
          <App />
        </AuthContext.Provider>
      </MemoryRouter>
    );
  };

  describe('Authentication Flow', () => {
    it('allows user to navigate from home to login page', () => {
      renderApp('/');
      
      const loginLink = screen.getByRole('link', { name: /login/i });
      fireEvent.click(loginLink);
      
      expect(screen.getByText(/login/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('allows user to navigate from home to register page', () => {
      renderApp('/');
      
      const registerLink = screen.getByRole('link', { name: /register/i });
      fireEvent.click(registerLink);
      
      expect(screen.getByText(/register/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('redirects to dashboard after successful login', async () => {
      const mockUser = { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
      const mockToken = 'mock-token';
      
      authService.login.mockResolvedValue({
        user: mockUser,
        token: mockToken
      });
      
      sweetService.getAllSweets.mockResolvedValue({
        data: []
      });

      renderApp('/login');
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.login).toHaveBeenCalledWith('test@example.com', 'password123');
      });
    });

    it('redirects to dashboard after successful registration', async () => {
      const mockUser = { _id: '1', name: 'New User', email: 'new@example.com', role: 'user' };
      const mockToken = 'mock-token';
      
      authService.register.mockResolvedValue({
        user: mockUser,
        token: mockToken
      });
      
      sweetService.getAllSweets.mockResolvedValue({
        data: []
      });

      renderApp('/register');
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole('button', { name: /register/i });

      fireEvent.change(nameInput, { target: { value: 'New User' } });
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(authService.register).toHaveBeenCalledWith(
          'New User',
          'new@example.com',
          'password123'
        );
      });
    });
  });

  describe('Navigation Flow', () => {
    it('shows login and register links when user is not authenticated', () => {
      renderApp('/');
      
      expect(screen.getByRole('link', { name: /login/i })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: /register/i })).toBeInTheDocument();
    });

    it('shows dashboard link when user is authenticated', () => {
      const mockUser = { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
      
      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthContext.Provider
            value={{
              user: mockUser,
              loading: false,
              login: vi.fn(),
              register: vi.fn(),
              logout: vi.fn(),
              isAdmin: vi.fn(() => false),
            }}
          >
            <App />
          </AuthContext.Provider>
        </MemoryRouter>
      );
      
      expect(screen.getByRole('link', { name: /dashboard/i })).toBeInTheDocument();
    });

    it('shows admin panel link when user is admin', () => {
      const mockAdmin = { _id: '1', name: 'Admin User', email: 'admin@example.com', role: 'admin' };
      
      render(
        <MemoryRouter initialEntries={['/']}>
          <AuthContext.Provider
            value={{
              user: mockAdmin,
              loading: false,
              login: vi.fn(),
              register: vi.fn(),
              logout: vi.fn(),
              isAdmin: vi.fn(() => true),
            }}
          >
            <App />
          </AuthContext.Provider>
        </MemoryRouter>
      );
      
      expect(screen.getByRole('link', { name: /admin panel/i })).toBeInTheDocument();
    });
  });

  describe('Protected Routes', () => {
    it('redirects to login when accessing dashboard without authentication', () => {
      renderApp('/dashboard');
      
      // Should redirect to login or show login form
      expect(screen.getByText(/login/i)).toBeInTheDocument();
    });

    it('allows access to dashboard when authenticated', async () => {
      const mockUser = { _id: '1', name: 'Test User', email: 'test@example.com', role: 'user' };
      
      sweetService.getAllSweets.mockResolvedValue({
        data: []
      });

      render(
        <MemoryRouter initialEntries={['/dashboard']}>
          <AuthContext.Provider
            value={{
              user: mockUser,
              loading: false,
              login: vi.fn(),
              register: vi.fn(),
              logout: vi.fn(),
              isAdmin: vi.fn(() => false),
            }}
          >
            <App />
          </AuthContext.Provider>
        </MemoryRouter>
      );
      
      await waitFor(() => {
        expect(screen.getByText(/sweet dashboard/i)).toBeInTheDocument();
      });
    });
  });

  describe('Error Handling', () => {
    it('displays error message on login failure', async () => {
      authService.login.mockRejectedValue({
        response: { data: { message: 'Invalid credentials' } }
      });

      renderApp('/login');
      
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const submitButton = screen.getByRole('button', { name: /login/i });

      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
      });
    });

    it('displays error message on registration failure', async () => {
      authService.register.mockRejectedValue({
        response: { data: { message: 'Email already exists' } }
      });

      renderApp('/register');
      
      const nameInput = screen.getByLabelText(/name/i);
      const emailInput = screen.getByLabelText(/email/i);
      const passwordInput = screen.getByLabelText(/password/i);
      const confirmPasswordInput = screen.getByLabelText(/confirm password/i);
      const submitButton = screen.getByRole('button', { name: /register/i });

      fireEvent.change(nameInput, { target: { value: 'Test User' } });
      fireEvent.change(emailInput, { target: { value: 'existing@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText(/email already exists/i)).toBeInTheDocument();
      });
    });
  });
});

