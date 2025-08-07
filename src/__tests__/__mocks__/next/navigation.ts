/**
 * @fileoverview Mock para os hooks de navegação do Next.js (next/navigation).
 * 
 * Este arquivo substitui as implementações reais dos hooks de navegação do Next.js que não funcionam
 * fora do ambiente Next.js durante os testes. Ele fornece "dublês" controláveis (jest.fn()) para que 
 * os testes possam simular a navegação e verificar se as funções de roteamento foram chamadas corretamente.
 * 
 * Funcionalidades incluídas:
 * - useRouter: Mock do hook de roteamento com todas as funções de navegação
 * - usePathname: Mock que retorna o pathname atual
 * - useSearchParams: Mock dos parâmetros de busca da URL
 * - useParams: Mock dos parâmetros dinâmicos da rota
 * - redirect/permanentRedirect: Mocks das funções de redirecionamento
 * - notFound: Mock da função para páginas não encontradas
 */

// Funções mock exportadas para controle direto nos testes
export const mockPush = jest.fn(); // Mock para router.push() - navegar para nova página
export const mockReplace = jest.fn(); // Mock para router.replace() - substituir página atual
export const mockBack = jest.fn(); // Mock para router.back() - voltar na história
export const mockForward = jest.fn(); // Mock para router.forward() - avançar na história
export const mockRefresh = jest.fn(); // Mock para router.refresh() - recarregar página
export const mockPrefetch = jest.fn(); // Mock para router.prefetch() - pré-carregar rota

/**
 * Mock do hook useRouter do Next.js
 * Retorna um objeto com todas as funções de navegação mockadas
 */
export const useRouter = jest.fn(() => ({
  push: mockPush,
  replace: mockReplace,
  back: mockBack,
  forward: mockForward,
  refresh: mockRefresh,
  prefetch: mockPrefetch,
}));

/**
 * Mock do hook usePathname - retorna o pathname atual da URL
 * Por padrão retorna '/', mas pode ser customizado nos testes
 */
export const usePathname = jest.fn(() => '/');

/**
 * Mock do hook useSearchParams - simula os parâmetros de busca da URL
 * Fornece todas as funções da API URLSearchParams
 */
export const useSearchParams = jest.fn(() => ({
  get: jest.fn(), // Obter valor de um parâmetro específico
  getAll: jest.fn(), // Obter todos os valores de um parâmetro
  has: jest.fn(), // Verificar se um parâmetro existe
  keys: jest.fn(), // Obter todas as chaves dos parâmetros
  values: jest.fn(), // Obter todos os valores dos parâmetros
  entries: jest.fn(), // Obter entradas [chave, valor]
  forEach: jest.fn(), // Iterar sobre os parâmetros
  toString: jest.fn(), // Converter para string
}));

/**
 * Mock do hook useParams - simula parâmetros dinâmicos da rota
 * Por exemplo: /user/[id] -> { id: 'valor' }
 */
export const useParams = jest.fn(() => ({}));

/**
 * Mocks das funções de redirecionamento do Next.js
 */
export const redirect = jest.fn(); // Redirecionamento temporário
export const permanentRedirect = jest.fn(); // Redirecionamento permanente
export const notFound = jest.fn(); // Função para páginas não encontradas

/**
 * Função utilitária para limpar todos os mocks de navegação
 * Deve ser chamada no beforeEach dos testes para garantir isolamento
 */
export const resetNavigationMocks = () => {
  mockPush.mockClear();
  mockReplace.mockClear();
  mockBack.mockClear();
  mockForward.mockClear();
  mockRefresh.mockClear();
  mockPrefetch.mockClear();
  useRouter.mockClear();
  usePathname.mockClear();
  useSearchParams.mockClear();
  useParams.mockClear();
  redirect.mockClear();
  permanentRedirect.mockClear();
  notFound.mockClear();
};

/**
 * Funções auxiliares para configurar cenários específicos nos testes
 */
export const mockNavigationScenarios = {
  // Simular estar em uma página específica
  setCurrentPath: (path: string) => {
    usePathname.mockReturnValue(path);
  },
  
  // Simular parâmetros de rota específicos
  setRouteParams: (params: Record<string, string>) => {
    useParams.mockReturnValue(params);
  },
  
  // Simular parâmetros de busca específicos
  setSearchParams: (params: Record<string, string>) => {
    const mockSearchParams = {
      get: jest.fn((key: string) => params[key] || null),
      getAll: jest.fn((key: string) => params[key] ? [params[key]] : []),
      has: jest.fn((key: string) => key in params),
      keys: jest.fn(() => Object.keys(params)),
      values: jest.fn(() => Object.values(params)),
      entries: jest.fn(() => Object.entries(params)),
      forEach: jest.fn((callback: (value: string, key: string) => void) => {
        Object.entries(params).forEach(([key, value]) => callback(value, key));
      }),
      toString: jest.fn(() => new URLSearchParams(params).toString()),
    };
    useSearchParams.mockReturnValue(mockSearchParams);
  },
};