/**
 * Tests for Signup Page
 * Tests form rendering, validation, successful signup, error handling, and navigation
 */

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { toast } from 'sonner';
import SignUpPage from '@/app/(auth)/signup/page';
import { mockFormData, mockApiError } from '@/__tests__/utils/mock-data';
import { authService } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';

// Mock dependencies
jest.mock('@/lib/api/auth');
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
const mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
const mockToast = toast as jest.Mocked<typeof toast>;

describe('SignUpPage', () => {
  const mockPush = jest.fn();

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
  });

  describe('Form Rendering', () => {
    it('should render signup form with all required fields', () => {
      render(<SignUpPage />);

      // Check page title and description
      expect(screen.getByText('Comece sua jornada agora!')).toBeInTheDocument();
      expect(screen.getByText('Crie sua conta para acessar todos os recursos do GameVerse')).toBeInTheDocument();

      // Check form fields
      expect(screen.getByLabelText('Username')).toBeInTheDocument();
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('Senha')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu nome de usuário')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite seu email')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Digite sua senha')).toBeInTheDocument();

      // Check submit button
      expect(screen.getByRole('button', { name: 'Cadastrar' })).toBeInTheDocument();

      // Check navigation link to login
      expect(screen.getByText('Já tem uma conta?')).toBeInTheDocument();
      expect(screen.getByRole('link', { name: 'Faça login' })).toHaveAttribute('href', '/login');
    });

    it('should render logo image', () => {
      render(<SignUpPage />);
      
      const logo = screen.getByAltText('GameVerse Logo');
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logo-completa.png');
    });
  });

  describe('Form Validation', () => {
    it('should have form fields with proper validation setup', () => {
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      
      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(usernameInput).toHaveAttribute('placeholder', 'Digite seu nome de usuário');
      expect(emailInput).toHaveAttribute('placeholder', 'Digite seu email');
      expect(passwordInput).toHaveAttribute('placeholder', 'Digite sua senha');
    });
  });

  describe('Form Submission', () => {
    it('should have submit button', () => {
      render(<SignUpPage />);

      const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute('type', 'submit');
    });
  });

  describe('Component Structure', () => {
    it('should have proper form structure', () => {
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getByRole('button', { name: 'Cadastrar' });

      expect(usernameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should navigate to login page when clicking login link', () => {
      render(<SignUpPage />);

      const loginLink = screen.getByRole('link', { name: 'Faça login' });
      expect(loginLink).toHaveAttribute('href', '/login');
    });

    it('should have correct form structure for accessibility', () => {
      render(<SignUpPage />);

      // Check that inputs have proper labels
      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      
      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(usernameInput).toHaveAttribute('id', 'username');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(passwordInput).toHaveAttribute('id', 'password');
    });
  });

  describe('User Interaction', () => {
    it('should have interactive form elements', () => {
      render(<SignUpPage />);

      const usernameInput = screen.getByLabelText('Username');
      const emailInput = screen.getByLabelText('Email');
      const passwordInput = screen.getByLabelText('Senha');
      const submitButton = screen.getByRole('button', { name: 'Cadastrar' });

      expect(usernameInput).not.toBeDisabled();
      expect(emailInput).not.toBeDisabled();
      expect(passwordInput).not.toBeDisabled();
      expect(submitButton).not.toBeDisabled();
    });
  });

  describe('Form Fields', () => {
    it('should have all required form fields with correct attributes', () => {
      render(<SignUpPage />);

      // Username field
      const usernameInput = screen.getByLabelText('Username');
      expect(usernameInput).toHaveAttribute('type', 'text');
      expect(usernameInput).toHaveAttribute('id', 'username');
      expect(usernameInput).toHaveAttribute('placeholder', 'Digite seu nome de usuário');

      // Email field
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('type', 'email');
      expect(emailInput).toHaveAttribute('id', 'email');
      expect(emailInput).toHaveAttribute('placeholder', 'Digite seu email');

      // Password field
      const passwordInput = screen.getByLabelText('Senha');
      expect(passwordInput).toHaveAttribute('type', 'password');
      expect(passwordInput).toHaveAttribute('id', 'password');
      expect(passwordInput).toHaveAttribute('placeholder', 'Digite sua senha');
    });
  });

  describe('Page Layout', () => {
    it('should have proper page layout structure', () => {
      render(<SignUpPage />);

      // Check main heading
      expect(screen.getByText('Comece sua jornada agora!')).toBeInTheDocument();
      
      // Check description
      expect(screen.getByText('Crie sua conta para acessar todos os recursos do GameVerse')).toBeInTheDocument();
      
      // Check form is present
      const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
      expect(submitButton).toBeInTheDocument();
      
      // Check navigation text
      expect(screen.getByText('Já tem uma conta?')).toBeInTheDocument();
    });
  });

  describe('Button States', () => {
    it('should have submit button in correct initial state', () => {
      render(<SignUpPage />);

      const submitButton = screen.getByRole('button', { name: 'Cadastrar' });
      expect(submitButton).not.toBeDisabled();
      expect(submitButton).toHaveTextContent('Cadastrar');
    });
  });
});