import React, { act } from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from '@/app/page'
import { IGate } from '@/interfaces/travel'
import { fetchGateDetails } from '@/components/Home/actions'
import { useRouter } from 'next/navigation'

const testData: IGate = {
  uuid: '1234-1234-abcd',
  name: 'Solaris',
  code: 'SOL',
  createdAt: Date.now(),
  updatedAt: undefined,
  links: [{
    code: 'ALD',
    hu: '200',
  }]
}

jest.mock('next/navigation', () => ({
  useRouter() {
    return {
      prefetch: () => null,
      push: jest.fn(),
    }
  }
}))

jest.mock('../../components/Home/actions', () => ({
  fetchGateDetails: jest.fn(() => Promise.resolve(testData))
}))

describe('Home', () => {

  beforeEach(() => {
    render(<Home />)
  })

  it('renders buttons on home page', () => {

    const planbutton = screen.getByRole('button', {
      name: /planjourney$/i,
    })

    const routebutton = screen.getByRole('button', {
      name: /routecalculator$/i,
    })

    expect(planbutton).toHaveTextContent('Plan a Journey')
    expect(routebutton).toHaveTextContent('Find the Cheapest Route')
  })

  it('lists api response', async () => {

    await act(async () => { fetchGateDetails })

    setTimeout(async () => {
      const row = await screen.findByText(/SOL$/i)
      expect(row).toBeVisible()
    }, 2000)

  })

  it('navigate to route calculator', () => {
    
    const routebutton = screen.getByRole('button', {
      name: /routecalculator$/i,
    })

    fireEvent.click(routebutton)
    setTimeout(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/routecalculator')
      expect(global.window.location.href).toContain('/routecalculator')
    }, 2000)
  })

  it('navigate to journey planner', () => {
    
    const planbutton = screen.getByRole('button', {
      name: /planjourney$/i,
    })

    fireEvent.click(planbutton)
    setTimeout(() => {
      expect(useRouter().push).toHaveBeenCalledWith('/journeyplanner')
      expect(global.window.location.href).toContain('/journeyplanner')
    }, 2000)
  })

})
