import { render, screen, fireEvent } from '@testing-library/react';
import Home from '@/app/page';

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null
    }
  }
}))

describe('Home', () => {

  it('renders buttons on home page', () => {

    render(<Home />)

    const basketButton = screen.getByRole('button', {
      name: /planjourney$/i,
    });

    expect(basketButton).toHaveTextContent('Plan a Journey');
  });

});
