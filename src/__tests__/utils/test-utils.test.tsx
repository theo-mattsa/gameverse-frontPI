import React from 'react'
import { screen } from '@testing-library/react'
import { render, renderWithoutAuth, renderUnauthenticated, renderWithLoading } from './test-utils'
import { mockUser, mockGames, mockApiResponses } from './mock-data'

// Simple test component to verify our utilities
const TestComponent = () => {
  return (
    <div>
      <h1>Test Component</h1>
      <p>This is a test component</p>
    </div>
  )
}

describe('Test Utils', () => {
  describe('render function', () => {
    it('should render component with default providers', () => {
      render(<TestComponent />)
      
      expect(screen.getByText('Test Component')).toBeInTheDocument()
      expect(screen.getByText('This is a test component')).toBeInTheDocument()
    })
  })

  describe('renderWithoutAuth', () => {
    it('should render component without auth provider', () => {
      renderWithoutAuth(<TestComponent />)
      
      expect(screen.getByText('Test Component')).toBeInTheDocument()
    })
  })

  describe('renderUnauthenticated', () => {
    it('should render component with unauthenticated state', () => {
      renderUnauthenticated(<TestComponent />)
      
      expect(screen.getByText('Test Component')).toBeInTheDocument()
    })
  })

  describe('renderWithLoading', () => {
    it('should render component with loading state', () => {
      renderWithLoading(<TestComponent />)
      
      expect(screen.getByText('Test Component')).toBeInTheDocument()
    })
  })
})

describe('Mock Data', () => {
  describe('mockUser', () => {
    it('should generate a mock user with default values', () => {
      const user = mockUser()
      
      expect(user).toHaveProperty('id')
      expect(user).toHaveProperty('username')
      expect(user).toHaveProperty('foto')
      expect(user).toHaveProperty('bio')
    })

    it('should allow overriding default values', () => {
      const user = mockUser({ username: 'customuser', bio: 'Custom bio' })
      
      expect(user.username).toBe('customuser')
      expect(user.bio).toBe('Custom bio')
    })
  })

  describe('mockGames', () => {
    it('should generate an array of mock games', () => {
      const games = mockGames(3)
      
      expect(games).toHaveLength(3)
      expect(games[0]).toHaveProperty('id')
      expect(games[0]).toHaveProperty('name')
      expect(games[0]).toHaveProperty('slug')
    })
  })

  describe('mockApiResponses', () => {
    it('should provide success responses', () => {
      expect(mockApiResponses.success.games).toBeDefined()
      expect(mockApiResponses.success.user).toBeDefined()
      expect(Array.isArray(mockApiResponses.success.games)).toBe(true)
    })

    it('should provide error responses', () => {
      expect(mockApiResponses.error.notFound).toBeDefined()
      expect(mockApiResponses.error.unauthorized).toBeDefined()
      expect(mockApiResponses.error.notFound.status).toBe(404)
      expect(mockApiResponses.error.unauthorized.status).toBe(401)
    })

    it('should provide empty responses', () => {
      expect(Array.isArray(mockApiResponses.empty.games)).toBe(true)
      expect(mockApiResponses.empty.games).toHaveLength(0)
    })
  })
})