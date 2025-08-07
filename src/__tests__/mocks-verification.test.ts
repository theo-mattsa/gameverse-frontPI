/**
 * @fileoverview Teste de verificação para todos os mocks da aplicação.
 * Este arquivo garante que os "dublês" (mocks) para serviços de API, hooks do Next.js e contextos do React
 * estão sendo carregados e funcionam como esperado. Serve como um ponto central para validar a infraestrutura de mocking.
 */

/**
 * Test to verify that all mocks are working correctly
 */

import React from 'react';
import { render } from '@testing-library/react';

describe('Mock Verification', () => {

    describe('Next.js Navigation Mocks', () => {
        it('should provide useRouter mock', async () => {
            const { useRouter } = await import('./__mocks__/next/navigation');
            const router = useRouter();

            expect(router.push).toBeDefined();
            expect(router.replace).toBeDefined();
            expect(router.back).toBeDefined();
            expect(router.forward).toBeDefined();
            expect(router.refresh).toBeDefined();
            expect(router.prefetch).toBeDefined();
        });

        it('should provide usePathname mock', async () => {
            const { usePathname } = await import('./__mocks__/next/navigation');
            const pathname = usePathname();

            expect(pathname).toBe('/');
        });

        it('should provide useSearchParams mock', async () => {
            const { useSearchParams } = await import('./__mocks__/next/navigation');
            const searchParams = useSearchParams();

            expect(searchParams.get).toBeDefined();
            expect(searchParams.has).toBeDefined();
        });
    });

    describe('Next.js Image Mock', () => {
        it('should provide Image component mock', async () => {
            const { default: Image } = await import('./__mocks__/next/image');

            expect(Image).toBeDefined();
            expect(typeof Image).toBe('function');

            // Test that it returns the expected structure
            const result = Image({
                src: '/test.jpg',
                alt: 'Test image',
                width: 100,
                height: 100
            });

            expect(result).toHaveProperty('type', 'img');
            expect(result).toHaveProperty('props');
            expect(result.props).toHaveProperty('src', '/test.jpg');
            expect(result.props).toHaveProperty('alt', 'Test image');
        });
    });

    describe('API Services Mocks', () => {
        it('should provide gameService mock', async () => {
            const { gameService } = await import('./__mocks__/api/services');

            expect(gameService.getAllGames).toBeDefined();
            expect(gameService.getGameById).toBeDefined();
            expect(gameService.getGameBySubstring).toBeDefined();
            expect(gameService.createGame).toBeDefined();
            expect(jest.isMockFunction(gameService.getAllGames)).toBe(true);
        });

        it('should provide authService mock', async () => {
            const { authService } = await import('./__mocks__/api/services');

            expect(authService.signIn).toBeDefined();
            expect(authService.signUp).toBeDefined();
            expect(authService.getUserData).toBeDefined();
            expect(jest.isMockFunction(authService.signIn)).toBe(true);
        });

        it('should provide userService mock', async () => {
            const { userService } = await import('./__mocks__/api/services');

            expect(userService.getUserByUsername).toBeDefined();
            expect(userService.updateUserProfile).toBeDefined();
            expect(userService.getAllUsers).toBeDefined();
            expect(jest.isMockFunction(userService.getUserByUsername)).toBe(true);
        });
    });

    describe('Auth Context Mock', () => {
        it('should provide useAuth mock', async () => {
            const { useAuth } = await import('./__mocks__/contexts/auth-context');
            const authContext = useAuth();

            expect(authContext.isAuthenticated).toBeDefined();
            expect(authContext.isLoading).toBeDefined();
            expect(authContext.login).toBeDefined();
            expect(authContext.logout).toBeDefined();
            expect(authContext.token).toBeDefined();
            expect(authContext.user).toBeDefined();
            expect(authContext.updateUser).toBeDefined();
        });

        it('should provide helper functions', async () => {
            const {
                setMockAuthContext,
                mockAuthenticatedUser,
                mockUnauthenticatedUser,
                mockLoadingAuth
            } = await import('./__mocks__/contexts/auth-context');

            expect(setMockAuthContext).toBeDefined();
            expect(mockAuthenticatedUser).toBeDefined();
            expect(mockUnauthenticatedUser).toBeDefined();
            expect(mockLoadingAuth).toBeDefined();
        });
    });
});