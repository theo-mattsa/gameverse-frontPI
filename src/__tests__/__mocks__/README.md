# Guia de Mocks para Testes

Este diretório contém todos os mocks necessários para testar a aplicação GameVerse de forma isolada e confiável. Os mocks substituem dependências externas (APIs, Next.js, contextos) por implementações controladas que facilitam os testes.

## 📁 Estrutura dos Mocks

```
__mocks__/
├── api/
│   └── services.ts          # Mocks de todos os serviços de API
├── contexts/
│   └── auth-context.tsx     # Mock do contexto de autenticação
├── next/
│   ├── navigation.ts        # Mocks dos hooks de navegação (App Router)
│   ├── router.ts           # Mocks do roteador legado (Pages Router)
│   ├── image.tsx           # Mock do componente Image
│   ├── link.tsx            # Mock do componente Link
│   └── head.tsx            # Mock do componente Head
└── README.md               # Este arquivo
```

## 🚀 Como Usar os Mocks

### 1. Mocks de API (`api/services.ts`)

Os mocks de API permitem simular respostas do backend sem fazer chamadas reais de rede.

```typescript
import { authService, mockApiScenarios, setupMockScenario } from '@/__tests__/__mocks__/api/services';

describe('LoginComponent', () => {
  beforeEach(() => {
    // Limpar mocks antes de cada teste
    resetApiMocks();
  });

  it('should handle successful login', async () => {
    // Configurar resposta de sucesso
    mockApiScenarios.success.signIn('mock-token');
    
    // Ou usar a função de configuração completa
    setupMockScenario({
      auth: 'success',
      mockData: { token: 'custom-token' }
    });
    
    // Seu teste aqui...
  });

  it('should handle login error', async () => {
    // Configurar resposta de erro
    mockApiScenarios.error.signIn('Credenciais inválidas');
    
    // Seu teste aqui...
  });
});
```

### 2. Mock de Autenticação (`contexts/auth-context.tsx`)

O mock de autenticação permite controlar o estado de login do usuário.

```typescript
import { 
  mockAuthenticatedUser, 
  mockUnauthenticatedUser, 
  mockLoadingAuth,
  resetAuthMocks 
} from '@/__tests__/__mocks__/contexts/auth-context';
import { mockUser } from '@/__tests__/utils/mock-data';

describe('ProtectedComponent', () => {
  beforeEach(() => {
    resetAuthMocks();
  });

  it('should render for authenticated user', () => {
    // Configurar usuário logado
    mockAuthenticatedUser(mockUser(), 'token-123');
    
    // Seu teste aqui...
  });

  it('should redirect unauthenticated user', () => {
    // Configurar usuário não logado
    mockUnauthenticatedUser();
    
    // Seu teste aqui...
  });

  it('should show loading state', () => {
    // Configurar estado de carregamento
    mockLoadingAuth();
    
    // Seu teste aqui...
  });
});
```

### 3. Mocks de Navegação (`next/navigation.ts`)

Os mocks de navegação permitem testar redirecionamentos e navegação.

```typescript
import { 
  mockPush, 
  mockNavigationScenarios, 
  resetNavigationMocks 
} from '@/__tests__/__mocks__/next/navigation';

describe('NavigationComponent', () => {
  beforeEach(() => {
    resetNavigationMocks();
  });

  it('should navigate to profile page', async () => {
    // Configurar página atual
    mockNavigationScenarios.setCurrentPath('/dashboard');
    
    // Simular clique que deveria navegar
    fireEvent.click(screen.getByText('Ver Perfil'));
    
    // Verificar se a navegação foi chamada
    expect(mockPush).toHaveBeenCalledWith('/profile/username');
  });

  it('should handle route parameters', () => {
    // Configurar parâmetros da rota
    mockNavigationScenarios.setRouteParams({ id: '123' });
    
    // Seu teste aqui...
  });
});
```

### 4. Mocks de Componentes Next.js

Os componentes do Next.js são automaticamente mockados quando importados.

```typescript
// O componente Image será automaticamente mockado
import Image from 'next/image';
import Link from 'next/link';

describe('ImageComponent', () => {
  it('should render image with correct props', () => {
    render(
      <Image 
        src="/logo.png" 
        alt="Logo" 
        width={100} 
        height={50} 
        priority 
      />
    );
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('src', '/logo.png');
    expect(image).toHaveAttribute('alt', 'Logo');
    expect(image).toHaveAttribute('data-priority', 'true');
  });

  it('should render link with correct href', () => {
    render(
      <Link href="/about">
        Sobre nós
      </Link>
    );
    
    const link = screen.getByTestId('next-link');
    expect(link).toHaveAttribute('href', '/about');
    expect(link).toHaveTextContent('Sobre nós');
  });
});
```

## 🛠️ Configuração Automática

Para usar os mocks automaticamente em todos os testes, adicione ao seu `jest.config.js`:

```javascript
module.exports = {
  // ... outras configurações
  moduleNameMapping: {
    '^next/navigation$': '<rootDir>/src/__tests__/__mocks__/next/navigation.ts',
    '^next/image$': '<rootDir>/src/__tests__/__mocks__/next/image.tsx',
    '^next/link$': '<rootDir>/src/__tests__/__mocks__/next/link.tsx',
    '^next/head$': '<rootDir>/src/__tests__/__mocks__/next/head.tsx',
    '^next/router$': '<rootDir>/src/__tests__/__mocks__/next/router.ts',
  },
};
```

## 📋 Cenários Comuns de Teste

### Teste de Componente com Autenticação

```typescript
import { render, screen } from '@testing-library/react';
import { mockAuthenticatedUser, resetAuthMocks } from '@/__tests__/__mocks__/contexts/auth-context';
import { mockUser } from '@/__tests__/utils/mock-data';
import ProfilePage from '@/pages/profile';

describe('ProfilePage', () => {
  beforeEach(() => {
    resetAuthMocks();
  });

  it('should display user profile when authenticated', () => {
    const user = mockUser({ username: 'johndoe' });
    mockAuthenticatedUser(user);
    
    render(<ProfilePage />);
    
    expect(screen.getByText('johndoe')).toBeInTheDocument();
  });
});
```

### Teste de Componente com API

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { setupMockScenario, resetApiMocks } from '@/__tests__/__mocks__/api/services';
import { mockGames } from '@/__tests__/utils/mock-data';
import GamesList from '@/components/GamesList';

describe('GamesList', () => {
  beforeEach(() => {
    resetApiMocks();
  });

  it('should display games when API returns data', async () => {
    const games = mockGames(3);
    setupMockScenario({
      games: 'success',
      mockData: { games }
    });
    
    render(<GamesList />);
    
    await waitFor(() => {
      expect(screen.getByText(games[0].name)).toBeInTheDocument();
    });
  });

  it('should display error when API fails', async () => {
    setupMockScenario({ games: 'error' });
    
    render(<GamesList />);
    
    await waitFor(() => {
      expect(screen.getByText(/erro ao carregar/i)).toBeInTheDocument();
    });
  });
});
```

## 🔧 Dicas e Boas Práticas

1. **Sempre limpe os mocks**: Use `resetApiMocks()`, `resetAuthMocks()`, etc. no `beforeEach`
2. **Use cenários específicos**: Prefira `mockApiScenarios.success.signIn()` ao invés de configurar manualmente
3. **Teste estados de loading**: Use `mockApiScenarios.loading` para testar indicadores de carregamento
4. **Verifique chamadas de API**: Use `expect(mockService.method).toHaveBeenCalledWith(...)` para verificar parâmetros
5. **Simule erros realistas**: Use mensagens de erro que correspondem ao que a API real retornaria

## 🚨 Troubleshooting

### Mock não está sendo aplicado
- Verifique se o caminho no `moduleNameMapping` está correto
- Certifique-se de que está importando do caminho correto
- Limpe o cache do Jest: `npm test -- --clearCache`

### Testes falhando após mudanças
- Verifique se os mocks foram limpos no `beforeEach`
- Confirme se a interface do mock corresponde à implementação real
- Verifique se não há conflitos entre diferentes mocks

### Performance lenta dos testes
- Use `setupMockScenario` para configurar múltiplos mocks de uma vez
- Evite configurações desnecessárias de mocks em testes que não os usam
- Considere usar `jest.fn().mockImplementation()` para lógica complexa