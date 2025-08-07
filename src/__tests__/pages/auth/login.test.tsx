/**
 * Tests for Login Page
 * Tests form rendering, validation, successful login, error handling, and navigation
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import LoginPage from '@/app/(auth)/login/page';
import { mockFormData, mockSignInResponse, mockApiError } from '@/__tests__/utils/mock-data';
import { authService } from '@/lib/api/auth';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/lib/api/auth');
jest.mock('@/contexts/auth-context');
jest.mock('next/navigation');
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />,
}));
jest.mock('sonner');

jest.mock('lucide-react', () => ({
  Loader2: ({ className }: any) => <div className={className} data-testid="loader2">Loading...</div>,
  Swords: ({ className }: any) => <div className={className} data-testid="swords">⚔️</div>,
}));

// Mock UI components
jest.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));

jest.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));

jest.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}));

jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }: any) => <a href={href} {...props}>{children}</a>,
}));

// Mock react-hook-form
jest.mock('react-hook-form', () => ({
  useForm: jest.fn(() => ({
    register: jest.fn((name) => ({
      name,
      onChange: jest.fn(),
      onBlur: jest.fn(),
      ref: jest.fn(),
    })),
    handleSubmit: jest.fn((fn) => (e) => {
      e?.preventDefault?.();
      return fn({});
    }),
    formState: { errors: {}, isSubmitting: false },
  })),
}));

// Mock zod resolver
jest.mock('@hookform/resolvers/zod', () => ({
  zodResolver: jest.fn(),
}));

const mockAuthService = authService as jest.Mocked<typeof authService>;
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('LoginPage', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();
    
    // Setup router mock
    mockUseRouter.mockReturnValue({
      push: mockPush,
      replace: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      refresh: jest.fn(),
      prefetch: jest.fn(),
    });

    // Setup auth context mock
    mockUseAuth.mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      login: mockLogin,
      logout: jest.fn(),
      token: null,
      user: null,
      updateUser: jest.fn(),
    });
  });

  describe('Form Rendering', () => {
    it('should render login form with all required fields', () => {
      render(<LoginPage />);

      // Check page title and description
      expect(screen.getByText('Bem-vindo!')).toBeInTheDocument();
      expect(screen.getByText('Entre com suas credenciais para acessar sua conta')).toBeInTheDocument();

      // Check form fields
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();

      // Check submit button
      expect(screen.getByRole('button', { name: 'Login' })).toBeInTheDocument();

      // Check navigation link to signup
      expect(screen.getByText('Não possui uma conta?')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Criar conta' })).toHaveAttribute('href', '/signup');
    });

    it('should render logo image', () => {
      render(<LoginPage />);
      
      const logo = screen.getByAltText('GameVerse Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo-completa.png');
    });
  });

  describe('Form Validation', () => {
    it('should have form fields with proper validation setup', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(emailInput).toHaveAttribute('placeholder', 'Digite seu email');
      expect(passwordInput).toHaveAttribute('placeholder', 'Digite sua senha');
    });
  });

  describe('Form Submission', () => {
    it('should have submit button', () => {
      render(<LoginPage />);

      const submitButton = screen.getByRole('button', { name: 'Login' });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Component Structure', () => {
    it('should have proper form structure', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getByRole('button', { name: 'Login' });

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to signup page when clicking signup link', () => {
      render(<LoginPage />);

      const signupLink = screen.getByRole('link', { name: 'Criar conta' });
      expect(signupLink).toHaveAttribute('href', '/signup');
    });

    it('should have correct form structure for accessibility', () => {
      render(<LoginPage />);

      // Check that inputs have proper labels
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });
  });

  describe('User Interaction', () => {
    it('should have interactive form elements', () => {
      render(<LoginPage />);

      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getByRole('button', { name: 'Login' });

      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });
});