import { render, screen } from '@testing-library/react'
import { JourneyPlanner } from '@/components/Home'

describe('Journey Planner', () => {

  beforeEach(() => {
    render(<JourneyPlanner />)
  })

  it('renders buttons on journey page', () => {

    const journeyButton = screen.getByRole('button', {
      name: /search$/i,
    })

    const distanceInput = screen.getByRole('spinbutton', {
      name: /distance/i
    })
    const passengerInput = screen.getByRole('spinbutton', {
      name: /passenger/i
    })
    const parkingInput = screen.getByRole('spinbutton', {
      name: /parking/i
    })

    expect(journeyButton).toHaveTextContent('Plan!')
    expect(distanceInput).toBeVisible()
    expect(passengerInput).toBeVisible()
    expect(parkingInput).toBeVisible()
  })

})
