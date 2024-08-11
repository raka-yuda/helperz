import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import { useRouter } from 'next/router';

// Mock the useRouter hook
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('Home', () => {
  it('renders an image', () => {
    const mockRouter = {
      pathname: '/',
      route: '/',
      query: {},
      asPath: '/',
    };
  
    useRouter.mockImplementation(() => mockRouter);
    
    render(<Home />)
    const image = screen.getAllByRole('img')[0]
    expect(image).toBeInTheDocument()
  })
})