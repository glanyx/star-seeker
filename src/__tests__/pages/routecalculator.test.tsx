import { render, screen } from '@testing-library/react'
import { RoutePlanner } from '@/components/Home'

describe('Route Calculator', () => {

  beforeEach(() => {
    render(<RoutePlanner />)
  })

  it('renders buttons on route page', () => {

    const calculateButton = screen.getByRole('button', {
      name: /search$/i,
    })

    const fromInput = screen.getByRole('textbox', {
      name: /from/i
    })
    const toInput = screen.getByRole('textbox', {
      name: /to/i
    })

    expect(calculateButton).toHaveTextContent('Calculate!')
    expect(fromInput).toBeVisible()
    expect(toInput).toBeVisible()
  })

})
