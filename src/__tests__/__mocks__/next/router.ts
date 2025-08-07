/**
 * @fileoverview Mock para o roteador legado do Next.js (next/router).
 * 
 * Este arquivo fornece mocks para o sistema de roteamento legado do Next.js (pages router).
 * Embora a aplicação use o App Router (next/navigation), alguns componentes ou bibliotecas
 * podem ainda depender do roteador legado, então este mock garante compatibilidade.
 * 
 * Funcionalidades incluídas:
 * - Mock do objeto router com todas as propriedades e métodos
 * - Mock do hook useRouter legado
 * - Mock dos eventos de roteamento
 * - Funções auxiliares para configurar cenários de teste
 */

import { EventEmitter } from 'events';

/**
 * Interface que define o tipo do roteador legado do Next.js
 */
interface NextRouter {
  route: string; // Rota atual
  pathname: string; // Pathname atual
  query: Record<string, string | string[]>; // Query parameters
  asPath: string; // Path como mostrado no browser
  basePath: string; // Base path configurado
  locale?: string; // Locale atual
  locales?: string[]; // Locales disponíveis
  defaultLocale?: string; // Locale padrão
  isReady: boolean; // Se o router está pronto
  isPreview: boolean; // Se está em modo preview
  isFallback: boolean; // Se está em fallback
  push: (url: string, as?: string, options?: any) => Promise<boolean>; // Navegar para nova página
  replace: (url: string, as?: string, options?: any) => Promise<boolean>; // Substituir página atual
  reload: () => void; // Recarregar página
  back: () => void; // Voltar na história
  prefetch: (url: string, as?: string, options?: any) => Promise<void>; // Pré-carregar página
  beforePopState: (cb: (state: any) => boolean) => void; // Callback antes de voltar
  events: {
    on: (event: string, handler: (...args: any[]) => void) => void;
    off: (event: string, handler: (...args: any[]) => void) => void;
    emit: (event: string, ...args: any[]) => void;
  };
}

/**
 * Event emitter para simular eventos de roteamento
 */
const routerEvents = new EventEmitter();

/**
 * Funções mock exportadas para controle direto nos testes
 */
export const mockPush = jest.fn<Promise<boolean>, [string, string?, any?]>();
export const mockReplace = jest.fn<Promise<boolean>, [string, string?, any?]>();
export const mockReload = jest.fn<void, []>();
export const mockBack = jest.fn<void, []>();
export const mockPrefetch = jest.fn<Promise<void>, [string, string?, any?]>();
export const mockBeforePopState = jest.fn<void, [(state: any) => boolean]>();

/**
 * Objeto router mockado com valores padrão
 */
const defaultRouter: NextRouter = {
  route: '/',
  pathname: '/',
  query: {},
  asPath: '/',
  basePath: '',
  locale: undefined,
  locales: undefined,
  defaultLocale: undefined,
  isReady: true,
  isPreview: false,
  isFallback: false,
  push: mockPush,
  replace: mockReplace,
  reload: mockReload,
  back: mockBack,
  prefetch: mockPrefetch,
  beforePopState: mockBeforePopState,
  events: {
    on: routerEvents.on.bind(routerEvents),
    off: routerEvents.off.bind(routerEvents),
    emit: routerEvents.emit.bind(routerEvents),
  },
};

/**
 * Router atual que pode ser sobrescrito nos testes
 */
let mockRouter: NextRouter = { ...defaultRouter };

/**
 * Mock do hook useRouter legado
 */
export const useRouter = jest.fn(() => mockRouter);

/**
 * Mock do objeto router exportado diretamente
 */
export const router = mockRouter;

/**
 * Função para configurar o router mockado
 */
export const setMockRouter = (overrides: Partial<NextRouter>) => {
  mockRouter = { ...defaultRouter, ...overrides };
  useRouter.mockReturnValue(mockRouter);
};

/**
 * Função para resetar todos os mocks do router
 */
export const resetRouterMocks = () => {
  mockPush.mockClear();
  mockReplace.mockClear();
  mockReload.mockClear();
  mockBack.mockClear();
  mockPrefetch.mockClear();
  mockBeforePopState.mockClear();
  useRouter.mockClear();
  routerEvents.removeAllListeners();
  mockRouter = { ...defaultRouter };
};

/**
 * Funções auxiliares para configurar cenários específicos nos testes
 */
export const mockRouterScenarios = {
  // Simular estar em uma rota específica
  setCurrentRoute: (route: string, pathname?: string, query?: Record<string, string>) => {
    setMockRouter({
      route,
      pathname: pathname || route,
      asPath: pathname || route,
      query: query || {},
    });
  },

  // Simular rota com parâmetros dinâmicos
  setDynamicRoute: (route: string, params: Record<string, string>) => {
    setMockRouter({
      route,
      pathname: route,
      query: params,
      asPath: Object.entries(params).reduce(
        (path, [key, value]) => path.replace(`[${key}]`, value),
        route
      ),
    });
  },

  // Simular estado de loading/não pronto
  setNotReady: () => {
    setMockRouter({ isReady: false });
  },

  // Simular modo preview
  setPreview: () => {
    setMockRouter({ isPreview: true });
  },

  // Simular fallback
  setFallback: () => {
    setMockRouter({ isFallback: true });
  },

  // Simular internacionalização
  setLocale: (locale: string, locales: string[], defaultLocale: string) => {
    setMockRouter({
      locale,
      locales,
      defaultLocale,
    });
  },
};

/**
 * Função para simular eventos de roteamento
 */
export const emitRouterEvent = (event: string, ...args: any[]) => {
  routerEvents.emit(event, ...args);
};

/**
 * Eventos de roteamento disponíveis para simulação
 */
export const ROUTER_EVENTS = {
  ROUTE_CHANGE_START: 'routeChangeStart',
  ROUTE_CHANGE_COMPLETE: 'routeChangeComplete',
  ROUTE_CHANGE_ERROR: 'routeChangeError',
  BEFORE_HISTORY_CHANGE: 'beforeHistoryChange',
  HASH_CHANGE_START: 'hashChangeStart',
  HASH_CHANGE_COMPLETE: 'hashChangeComplete',
} as const;