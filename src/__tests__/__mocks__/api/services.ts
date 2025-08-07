/**
 * @fileoverview Mock para todos os serviços de API da aplicação.
 * 
 * Este arquivo substitui as chamadas de rede reais (feitas com Axios) por funções "espiãs" do Jest (jest.fn()).
 * Isso permite que os testes simulem respostas de sucesso, erro ou vazias da API de forma instantânea e previsível,
 * isolando os componentes da dependência do backend.
 * 
 * Serviços mockados incluem:
 * - gameService: Operações relacionadas a jogos (buscar, criar, listar)
 * - authService: Autenticação (login, registro, dados do usuário)
 * - userService: Operações de usuário (perfil, atualização)
 * - feedService: Feed de atividades
 * - followService: Sistema de seguir usuários
 * - gameStatusService: Status dos jogos do usuário
 * - gameListService: Listas de jogos personalizadas
 * - ratingService: Avaliações e reviews de jogos
 * - userStatisticsService: Estatísticas do usuário
 */

import { 
  Game, 
  User, 
  SignInResponse, 
  Activity, 
  Follower, 
  GameStatus, 
  GameList, 
  Rating, 
  RatingByUserId 
} from '@/lib/api/types';
import { SignUpSchema } from '@/lib/schemas/signup-schema';

/**
 * Mock do serviço de jogos - gerencia operações relacionadas a jogos
 */
export const gameService = {
  getGameBySubstring: jest.fn<Promise<Game[]>, [string]>(), // Buscar jogos por substring no nome
  getGameById: jest.fn<Promise<Game>, [string]>(), // Obter jogo específico por ID
  getAllGames: jest.fn<Promise<Game[]>, []>(), // Listar todos os jogos
  createGame: jest.fn<Promise<void>, [string, string, string]>(), // Criar novo jogo (admin)
};

/**
 * Mock do serviço de autenticação - gerencia login, registro e dados do usuário
 */
export const authService = {
  signUp: jest.fn<Promise<void>, [SignUpSchema]>(), // Registrar novo usuário
  signIn: jest.fn<Promise<SignInResponse>, [string, string]>(), // Fazer login (email, senha)
  getUserData: jest.fn<Promise<User>, []>(), // Obter dados do usuário autenticado
};

/**
 * Mock do serviço de usuários - gerencia perfis e operações de usuário
 */
export const userService = {
  getUserByUsername: jest.fn<Promise<User>, [string]>(), // Obter usuário por username
  updateUserProfile: jest.fn<Promise<void>, [string | null, string | null]>(), // Atualizar perfil (bio, foto)
  getAllUsers: jest.fn<Promise<User[]>, []>(), // Listar todos os usuários
};

/**
 * Mock do serviço de feed - gerencia o feed de atividades
 */
export const FeedService = {
  getActivities: jest.fn<Promise<Activity[]>, []>(), // Obter atividades do feed
};

/**
 * Mock do serviço de seguir usuários - gerencia relacionamentos entre usuários
 */
export const followService = {
  followUser: jest.fn<Promise<void>, [string]>(), // Seguir um usuário
  unfollowUser: jest.fn<Promise<void>, [string]>(), // Deixar de seguir um usuário
  getFollowers: jest.fn<Promise<Follower[]>, []>(), // Obter seguidores do usuário
  getFollowing: jest.fn<Promise<Follower[]>, []>(), // Obter usuários que o usuário segue
  checkIfFollowing: jest.fn<Promise<boolean>, [string]>(), // Verificar se segue um usuário
};

/**
 * Mock do serviço de status de jogos - gerencia o status dos jogos do usuário
 */
export const gameStatusService = {
  updateGameStatus: jest.fn<Promise<void>, [string, GameStatus]>(), // Atualizar status de um jogo
  getGameStatus: jest.fn<Promise<GameStatus>, [string]>(), // Obter status de um jogo
};

/**
 * Mock do serviço de listas de jogos - gerencia listas personalizadas de jogos
 */
export const gameListService = {
  createGameList: jest.fn<Promise<void>, [string, boolean, string[]]>(), // Criar nova lista
  getGameListByUsername: jest.fn<Promise<GameList[]>, [string]>(), // Obter listas de um usuário
  getGameListById: jest.fn<Promise<GameList | null>, [string]>(), // Obter lista específica por ID
};

/**
 * Mock do serviço de avaliações - gerencia reviews e ratings de jogos
 */
export const ratingService = {
  getRatingsByGameId: jest.fn<Promise<Rating[]>, [string]>(), // Obter avaliações de um jogo
  getRatingsByUserId: jest.fn<Promise<RatingByUserId[]>, [string]>(), // Obter avaliações de um usuário
  createRating: jest.fn<Promise<Rating>, [string, number, string, string]>(), // Criar nova avaliação
};

/**
 * Mock do serviço de estatísticas do usuário - gerencia dados estatísticos
 */
export const userStatisticsService = {
  getFavoriteGenreByUserUsername: jest.fn<Promise<{ favoriteGenre: string | null, message?: string }>, [string]>(), // Obter gênero favorito
};

/**
 * Função utilitária para limpar todos os mocks de API
 * Deve ser chamada no beforeEach dos testes para garantir isolamento entre testes
 */
export const resetApiMocks = () => {
  // Limpar mocks do serviço de jogos
  gameService.getGameBySubstring.mockClear();
  gameService.getGameById.mockClear();
  gameService.getAllGames.mockClear();
  gameService.createGame.mockClear();

  // Limpar mocks do serviço de autenticação
  authService.signUp.mockClear();
  authService.signIn.mockClear();
  authService.getUserData.mockClear();

  // Limpar mocks do serviço de usuários
  userService.getUserByUsername.mockClear();
  userService.updateUserProfile.mockClear();
  userService.getAllUsers.mockClear();

  // Limpar mocks do serviço de feed
  FeedService.getActivities.mockClear();

  // Limpar mocks do serviço de seguir usuários
  followService.followUser.mockClear();
  followService.unfollowUser.mockClear();
  followService.getFollowers.mockClear();
  followService.getFollowing.mockClear();
  followService.checkIfFollowing.mockClear();

  // Limpar mocks do serviço de status de jogos
  gameStatusService.updateGameStatus.mockClear();
  gameStatusService.getGameStatus.mockClear();

  // Limpar mocks do serviço de listas de jogos
  gameListService.createGameList.mockClear();
  gameListService.getGameListByUsername.mockClear();
  gameListService.getGameListById.mockClear();

  // Limpar mocks do serviço de avaliações
  ratingService.getRatingsByGameId.mockClear();
  ratingService.getRatingsByUserId.mockClear();
  ratingService.createRating.mockClear();

  // Limpar mocks do serviço de estatísticas
  userStatisticsService.getFavoriteGenreByUserUsername.mockClear();
};
/**

 * Funções auxiliares para configurar cenários comuns de teste
 * Facilitam a configuração de respostas mockadas para diferentes situações
 */
export const mockApiScenarios = {
  /**
   * Configura cenários de sucesso para os serviços de API
   */
  success: {
    // Configurar login bem-sucedido
    signIn: (token: string = 'mock-token') => {
      authService.signIn.mockResolvedValue({ token });
    },
    
    // Configurar busca de jogos bem-sucedida
    getAllGames: (games: Game[]) => {
      gameService.getAllGames.mockResolvedValue(games);
    },
    
    // Configurar busca de usuário bem-sucedida
    getUserByUsername: (user: User) => {
      userService.getUserByUsername.mockResolvedValue(user);
    },
    
    // Configurar feed de atividades bem-sucedido
    getActivities: (activities: Activity[]) => {
      FeedService.getActivities.mockResolvedValue(activities);
    },
  },

  /**
   * Configura cenários de erro para os serviços de API
   */
  error: {
    // Configurar erro de autenticação
    signIn: (message: string = 'Credenciais inválidas') => {
      authService.signIn.mockRejectedValue(new Error(message));
    },
    
    // Configurar erro na busca de jogos
    getAllGames: (message: string = 'Erro ao carregar jogos') => {
      gameService.getAllGames.mockRejectedValue(new Error(message));
    },
    
    // Configurar erro de usuário não encontrado
    getUserByUsername: (message: string = 'Usuário não encontrado') => {
      userService.getUserByUsername.mockRejectedValue(new Error(message));
    },
    
    // Configurar erro no feed
    getActivities: (message: string = 'Erro ao carregar feed') => {
      FeedService.getActivities.mockRejectedValue(new Error(message));
    },
  },

  /**
   * Configura cenários de loading (promessas que nunca resolvem)
   * Útil para testar estados de carregamento
   */
  loading: {
    signIn: () => {
      authService.signIn.mockReturnValue(new Promise(() => {}));
    },
    
    getAllGames: () => {
      gameService.getAllGames.mockReturnValue(new Promise(() => {}));
    },
    
    getUserByUsername: () => {
      userService.getUserByUsername.mockReturnValue(new Promise(() => {}));
    },
  },

  /**
   * Configura cenários de dados vazios
   */
  empty: {
    getAllGames: () => {
      gameService.getAllGames.mockResolvedValue([]);
    },
    
    getActivities: () => {
      FeedService.getActivities.mockResolvedValue([]);
    },
    
    getFollowers: () => {
      followService.getFollowers.mockResolvedValue([]);
    },
  },
};

/**
 * Função para configurar múltiplos mocks de uma vez
 * Útil para configurar cenários complexos de teste
 */
export const setupMockScenario = (scenario: {
  auth?: 'success' | 'error' | 'loading';
  games?: 'success' | 'error' | 'loading' | 'empty';
  user?: 'success' | 'error' | 'loading';
  feed?: 'success' | 'error' | 'loading' | 'empty';
  mockData?: {
    user?: User;
    games?: Game[];
    activities?: Activity[];
    token?: string;
  };
}) => {
  const { auth, games, user, feed, mockData = {} } = scenario;

  // Configurar cenários de autenticação
  if (auth === 'success') mockApiScenarios.success.signIn(mockData.token);
  if (auth === 'error') mockApiScenarios.error.signIn();
  if (auth === 'loading') mockApiScenarios.loading.signIn();

  // Configurar cenários de jogos
  if (games === 'success') mockApiScenarios.success.getAllGames(mockData.games || []);
  if (games === 'error') mockApiScenarios.error.getAllGames();
  if (games === 'loading') mockApiScenarios.loading.getAllGames();
  if (games === 'empty') mockApiScenarios.empty.getAllGames();

  // Configurar cenários de usuário
  if (user === 'success' && mockData.user) mockApiScenarios.success.getUserByUsername(mockData.user);
  if (user === 'error') mockApiScenarios.error.getUserByUsername();
  if (user === 'loading') mockApiScenarios.loading.getUserByUsername();

  // Configurar cenários de feed
  if (feed === 'success') mockApiScenarios.success.getActivities(mockData.activities || []);
  if (feed === 'error') mockApiScenarios.error.getActivities();
  if (feed === 'empty') mockApiScenarios.empty.getActivities();
};