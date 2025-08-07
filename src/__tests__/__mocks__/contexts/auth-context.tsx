/**
 * @fileoverview Mock para o contexto de autenticação (AuthContext).
 * 
 * Este arquivo simula o hook `useAuth` e o `AuthProvider` para permitir que os testes controlem 
 * o estado de autenticação sem depender da implementação real do contexto. Isso é essencial para
 * testar componentes que dependem do estado de autenticação de forma isolada e previsível.
 * 
 * Funcionalidades incluídas:
 * - Mock do hook useAuth com todos os métodos de autenticação
 * - Mock do AuthProvider para renderização em testes
 * - Funções auxiliares para configurar diferentes cenários de autenticação
 * - Controle completo sobre o estado de autenticação nos testes
 */

import React from 'react';
import { User } from '@/lib/api/types';

/**
 * Interface que define o tipo do contexto de autenticação
 * Deve corresponder exatamente à interface do contexto real
 */
interface AuthContextType {
  isAuthenticated: boolean; // Se o usuário está autenticado
  isLoading: boolean; // Se está carregando dados de autenticação
  login: (token: string) => Promise<void>; // Função para fazer login
  logout: () => void; // Função para fazer logout
  token: string | null; // Token JWT do usuário
  user: User | null; // Dados do usuário autenticado
  updateUser: (newUser: User) => void; // Função para atualizar dados do usuário
}

/**
 * Funções mock exportadas para controle direto nos testes
 * Permitem verificar se as funções foram chamadas e com quais parâmetros
 */
export const mockLogin = jest.fn<Promise<void>, [string]>(); // Mock da função de login
export const mockLogout = jest.fn<void, []>(); // Mock da função de logout
export const mockUpdateUser = jest.fn<void, [User]>(); // Mock da função de atualizar usuário

/**
 * Valores padrão do contexto de autenticação mockado
 * Representa um usuário não autenticado em estado inicial
 */
const defaultAuthContext: AuthContextType = {
  isAuthenticated: false,
  isLoading: false,
  login: mockLogin,
  logout: mockLogout,
  token: null,
  user: null,
  updateUser: mockUpdateUser,
};

/**
 * Valor atual do contexto mockado que pode ser sobrescrito nos testes
 * Permite configurar diferentes estados de autenticação
 */
let mockAuthContextValue: AuthContextType = { ...defaultAuthContext };

/**
 * Mock do hook useAuth
 * Retorna o valor atual do contexto mockado
 */
export const useAuth = jest.fn(() => mockAuthContextValue);

/**
 * Mock do componente AuthProvider
 * Renderiza os children sem lógica de contexto real, apenas para testes
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div data-testid="auth-provider">{children}</div>;
};

/**
 * Funções auxiliares para configurar o contexto de autenticação nos testes
 */

/**
 * Define o valor do contexto de autenticação mockado
 * Permite sobrescrever propriedades específicas mantendo as outras
 */
export const setMockAuthContext = (overrides: Partial<AuthContextType>) => {
  mockAuthContextValue = { ...defaultAuthContext, ...overrides };
};

/**
 * Reseta todos os mocks de autenticação para o estado inicial
 * Deve ser chamado no beforeEach dos testes para garantir isolamento
 */
export const resetAuthMocks = () => {
  mockLogin.mockClear();
  mockLogout.mockClear();
  mockUpdateUser.mockClear();
  useAuth.mockClear();
  mockAuthContextValue = { ...defaultAuthContext };
};

/**
 * Cenários comuns de autenticação para facilitar os testes
 */

/**
 * Configura um usuário autenticado
 * @param user - Dados do usuário logado
 * @param token - Token JWT (opcional, padrão: 'mock-token')
 */
export const mockAuthenticatedUser = (user: User, token: string = 'mock-token') => {
  setMockAuthContext({
    isAuthenticated: true,
    isLoading: false,
    token,
    user,
  });
};

/**
 * Configura um usuário não autenticado
 */
export const mockUnauthenticatedUser = () => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: false,
    token: null,
    user: null,
  });
};

/**
 * Configura estado de carregamento da autenticação
 * Útil para testar loading states
 */
export const mockLoadingAuth = () => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: true,
    token: null,
    user: null,
  });
};

/**
 * Configura erro de autenticação
 * Simula quando há problemas com o token ou sessão
 */
export const mockAuthError = () => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: false,
    token: null,
    user: null,
  });
  // Configurar as funções para rejeitar
  mockLogin.mockRejectedValue(new Error('Erro de autenticação'));
};

/**
 * Configura cenário de token expirado
 * Simula quando o usuário precisa fazer login novamente
 */
export const mockExpiredToken = (user: User) => {
  setMockAuthContext({
    isAuthenticated: false,
    isLoading: false,
    token: null,
    user: null,
  });
};