/**
 * @fileoverview Testes simples para a página de jogos.
 * 
 * Testa a renderização básica e funcionalidades principais da página de jogos.
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GamesPage from '@/app/(app)/games/page';

// Mock do serviço de jogos
jest.mock('@/lib/api/game-service', () => ({
  gameService: {
    getAllGames: jest.fn(),
  },
}));

// Mock dos componentes filhos
jest.mock('@/components/games/games-grid', () => ({
  GamesGrid: ({ games, isLoading }: any) => (
    <div data-testid="games-grid">
      {isLoading ? 'Loading...' : `${games.length} jogos`}
    </div>
  ),
}));

jest.mock('@/components/games/genre-filter-sidebar', () => ({
  GenreFilterSidebar: ({ onApply }: any) => (
    <button data-testid="filter-button" onClick={() => onApply(['Action'])}>
      Filtrar
    </button>
  ),
}));

jest.mock('@/components/games/game-search-bar', () => ({
  GameSearchBar: ({ onSearchChange }: any) => (
    <input
      data-testid="search-input"
      onChange={(e) => onSearchChange(e.target.value)}
    />
  ),
}));

// Importar após os mocks
import { gameService } from '@/lib/api/game-service';
const mockGameService = gameService as jest.Mocked<typeof gameService>;

describe('GamesPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('deve renderizar a página corretamente', async () => {
    // Configurar mock para retornar jogos
    const mockGames = [
      { id: '1', name: 'Game 1', genres: ['Action'] },
      { id: '2', name: 'Game 2', genres: ['RPG'] },
    ];
    mockGameService.getAllGames.mockResolvedValue(mockGames);

    render(<GamesPage />);

    // Verificar se os componentes estão presentes
    expect(screen.getByTestId('search-input')).toBeInTheDocument();
    expect(screen.getByTestId('filter-button')).toBeInTheDocument();
    expect(screen.getByTestId('games-grid')).toBeInTheDocument();
  });

  it('deve mostrar loading inicialmente', () => {
    // Mock que nunca resolve
    mockGameService.getAllGames.mockReturnValue(new Promise(() => { }));

    render(<GamesPage />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('deve carregar jogos da API', async () => {
    const mockGames = [
      { id: '1', name: 'Game 1' },
      { id: '2', name: 'Game 2' },
    ];
    mockGameService.getAllGames.mockResolvedValue(mockGames);

    render(<GamesPage />);

    // Verificar se a API foi chamada
    expect(mockGameService.getAllGames).toHaveBeenCalled();

    // Aguardar os jogos carregarem
    await waitFor(() => {
      expect(screen.getByText('2 jogos')).toBeInTheDocument();
    });
  });

  it('deve lidar com erro na API', async () => {
    mockGameService.getAllGames.mockRejectedValue(new Error('API Error'));

    render(<GamesPage />);

    await waitFor(() => {
      expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    });
  });

  it('deve ter componente de busca', () => {
    const mockGames = [{ id: '1', name: 'Super Mario' }];
    mockGameService.getAllGames.mockResolvedValue(mockGames);

    render(<GamesPage />);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('deve ter componente de filtro', () => {
    const mockGames = [{ id: '1', name: 'Game 1', genres: ['Action'] }];
    mockGameService.getAllGames.mockResolvedValue(mockGames);

    render(<GamesPage />);

    const filterButton = screen.getByTestId('filter-button');
    expect(filterButton).toBeInTheDocument();
  });
});