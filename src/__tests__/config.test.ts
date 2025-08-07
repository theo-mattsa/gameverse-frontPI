// Simple test to verify Jest configuration and path mapping
import { cn } from '@/lib/utils'

describe('Jest Configuration', () => {
  it('should be able to import from @/ alias', () => {
    // This test verifies that the path mapping is working
    // We'll import a utility function to test the alias
    expect(cn).toBeDefined()
    expect(typeof cn).toBe('function')

    // Test the function works
    const result = cn('class1', 'class2')
    expect(typeof result).toBe('string')
  })

  it('should have access to jest-dom matchers', () => {
    // This test verifies that @testing-library/jest-dom is properly configured
    const element = document.createElement('div')
    element.textContent = 'Hello World'
    document.body.appendChild(element)
    expect(element).toBeInTheDocument()
    document.body.removeChild(element)
  })
})