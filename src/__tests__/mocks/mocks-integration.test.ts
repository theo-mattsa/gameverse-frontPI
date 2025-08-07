/**
 * @fileoverview Teste de integração para verificar se todos os mocks estão funcionando corretamente.
 * 
 * Este arquivo testa se todos os mocks criados (API, Next.js, contextos) estão sendo aplicados
 * corretamente e funcionando como esperado. É útil para detectar problemas de configuração
 * ou quebras nos mocks após mudanças no código.
 */

import { 
  authService, 
  gameService, 
  userService,
  resetApiMocks,
  mockApiScenarios 
} from '@/__tests__/__mocks__/api/services';

import { 
  useAuth, 
  mockAuthenticatedUser, 
  mockUnauthenticatedUser,
  resetAuthMocks 
} from '@/__tests__/__mocks__/contexts/auth-context';

import * as NavigationMocks from '@/__tests__/__mocks__/next/navigation';

import { mockUser, mockGame, mockSignInResponse } from '@/__tests__/utils/mock-data';

describe('Integração dos Mocks', () => {
  beforeEach(() => {
    // Limpar todos os mocks antes de cada teste
    resetApiMocks();
    resetAuthMocks();
    // NavigationMocks.resetNavigationMocks(); // Comentado temporariamente
  });

  describe('Mocks de API', () => {
    it('deve mockar o serviço de autenticação corretamente', async () => {
      // Configurar mock de sucesso
      const mockResponse = mockSignInResponse();
      mockApiScenarios.success.signIn(mockResponse.token);

      // Testar se o mock está funcionando
      const result = await authService.signIn('test@example.com', 'password');
      
      expect(result).toEqual(mockResponse);
      expect(authService.signIn).toHaveBeenCalledWith('test@example.com', 'password');
    });

    it('deve mockar o serviço de jogos corretamente', async () => {
      // Configurar mock com dados de teste
      const mockGames = [mockGame(), mockGame({ id: '2', name: 'Game 2' })];
      mockApiScenarios.success.getAllGames(mockGames);

      // Testar se o mock está funcionando
      const result = await gameService.getAllGames();
      
      expect(result).toEqual(mockGames);
      expect(gameService.getAllGames).toHaveBeenCalled();
    });

    it('deve mockar erros de API corretamente', async () => {
      // Configurar mock de erro
      const errorMessage = 'Erro de rede';
      mockApiScenarios.error.signIn(errorMessage);

      // Testar se o erro é lançado corretamente
      await expect(authService.signIn('test@example.com', 'wrong')).rejects.toThrow(errorMessage);
    });

    it('deve limpar mocks corretamente', () => {
      // Configurar um mock
      authService.signIn.mockResolvedValue(mockSignInResponse());
      
      // Verificar se foi configurado
      expect(authService.signIn).toHaveBeenCalledTimes(0);
      
      // Limpar mocks
      resetApiMocks();
      
      // Verificar se foi limpo
      expect(authService.signIn).toHaveBeenCalledTimes(0);
    });
  });

  describe('Mock de Contexto de Autenticação', () => {
    it('deve mockar usuário autenticado corretamente', () => {
      // Configurar usuário autenticado
      const user = mockUser();
      const token = 'test-token';
      mockAuthenticatedUser(user, token);

      // Testar se o hook retorna os dados corretos
      const authContext = useAuth();
      
      expect(authContext.isAuthenticated).toBe(true);
      expect(authContext.user).toEqual(user);
      expect(authContext.token).toBe(token);
      expect(authContext.isLoading).toBe(false);
    });

    it('deve mockar usuário não autenticado corretamente', () => {
      // Configurar usuário não autenticado
      mockUnauthenticatedUser();

      // Testar se o hook retorna os dados corretos
      const authContext = useAuth();
      
      expect(authContext.isAuthenticated).toBe(false);
      expect(authContext.user).toBeNull();
      expect(authContext.token).toBeNull();
      expect(authContext.isLoading).toBe(false);
    });

    it('deve fornecer funções mock funcionais', () => {
      // Configurar usuário autenticado
      mockAuthenticatedUser(mockUser());
      
      const authContext = useAuth();
      
      // Verificar se as funções são mocks do Jest
      expect(jest.isMockFunction(authContext.login)).toBe(true);
      expect(jest.isMockFunction(authContext.logout)).toBe(true);
      expect(jest.isMockFunction(authContext.updateUser)).toBe(true);
    });
  });

  describe('Mocks de Navegação do Next.js', () => {
    it('deve mockar useRouter corretamente', () => {
      // Testar se o hook retorna um objeto router mockado
      const router = NavigationMocks.useRouter();
      
      expect(router).toBeDefined();
      expect(jest.isMockFunction(router.push)).toBe(true);
      expect(jest.isMockFunction(router.replace)).toBe(true);
      expect(jest.isMockFunction(router.back)).toBe(true);
    });
  });

  describe('Integração entre Mocks', () => {
    it('deve permitir usar múltiplos mocks simultaneamente', async () => {
      // Configurar múltiplos mocks
      const user = mockUser();
      const games = [mockGame()];
      
      mockAuthenticatedUser(user);
      mockApiScenarios.success.getAllGames(games);

      // Testar se ambos funcionam
      const authContext = useAuth();
      const gamesResult = await gameService.getAllGames();
      const router = NavigationMocks.useRouter();

      expect(authContext.isAuthenticated).toBe(true);
      expect(authContext.user).toEqual(user);
      expect(gamesResult).toEqual(games);
      expect(router.push).toBeDefined();
    });

    it('deve manter isolamento entre testes', () => {
      // Este teste verifica se o beforeEach está limpando corretamente
      // Se os mocks não foram limpos, este teste falhará
      
      const authContext = useAuth();
      expect(authContext.isAuthenticated).toBe(false);
      expect(authContext.user).toBeNull();
      
      // Verificar se as funções de API não têm chamadas anteriores
      expect(authService.signIn).toHaveBeenCalledTimes(0);
      expect(gameService.getAllGames).toHaveBeenCalledTimes(0);
      
      // Verificar se o router está disponível
      const router = NavigationMocks.useRouter();
      expect(router).toBeDefined();
    });
  });

  describe('Cenários Complexos', () => {
    it('deve simular fluxo completo de login', async () => {
      // 1. Usuário não autenticado inicialmente
      mockUnauthenticatedUser();
      let authContext = useAuth();
      expect(authContext.isAuthenticated).toBe(false);

      // 2. Configurar API para retornar sucesso no login
      const token = 'login-token';
      mockApiScenarios.success.signIn(token);

      // 3. Simular login
      const loginResult = await authService.signIn('user@example.com', 'password');
      expect(loginResult.token).toBe(token);

      // 4. Configurar usuário como autenticado após login
      const user = mockUser();
      mockAuthenticatedUser(user, token);
      authContext = useAuth();
      expect(authContext.isAuthenticated).toBe(true);

      // 5. Verificar se o router está disponível para redirecionamento
      const router = NavigationMocks.useRouter();
      expect(router.push).toBeDefined();
    });

    it('deve simular fluxo de erro com recuperação', async () => {
      // 1. Configurar erro inicial
      mockApiScenarios.error.getAllGames('Erro de rede');

      // 2. Tentar carregar jogos (deve falhar)
      await expect(gameService.getAllGames()).rejects.toThrow('Erro de rede');

      // 3. Configurar sucesso para retry
      const games = [mockGame()];
      mockApiScenarios.success.getAllGames(games);

      // 4. Tentar novamente (deve funcionar)
      const result = await gameService.getAllGames();
      expect(result).toEqual(games);
    });
  });
});