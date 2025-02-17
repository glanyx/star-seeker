'use client'
import { useEffect, useState } from 'react'
import { calculateCheapestRoute } from '../Home/actions'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import EastIcon from '@mui/icons-material/East'
import { IRoute } from '@/interfaces/travel'
import ItineraryCard from './ItineraryCard'
import InputField from '../Layout/InputField'
import RouteDetails from './RouteDetails'

interface ILocalTripsStore {
  trips: Array<IRoute & { timestamp: number }>
}

const RoutePlanner = ({

}) => {

  const [loading, setLoading] = useState<boolean>(false)

  // request
  const [location, setLocation] = useState<string>()
  const [locationRequired, setLocationRequired] = useState<boolean>()
  const [destination, setDestination] = useState<string>()
  const [destinationRequired, setDestinationRequired] = useState<boolean>()

  // response
  const [route, setRoute] = useState<IRoute>()

  // history
  const [historicRoutes, setHistoricRoutes] = useState<ILocalTripsStore>({ trips: [] })
  const [expandedHistory, setExpandedHistory] = useState<number>()

  const validateForm = () => {
    
    if (!location) setLocationRequired(true)
    if (!destination) setDestinationRequired(true)

    if (!destination || !location) return false
    return true

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    if (!validateForm()) return

    setLocationRequired(false)
    setDestinationRequired(false)
    setLoading(true)
    calculateCheapestRoute({
      from: location ?? '',
      to: destination ?? '',
    }).then(data => {
      setRoute(data)
      setLoading(false)
      setLocationRequired(false)
      setDestinationRequired(false)
    })

  }

  const handleExpandedState = (code: number) => {
    if (code === expandedHistory) {
      setExpandedHistory(0) 
    } else {
      setExpandedHistory(code)
    }
  }

  const saveToLocalStore = () => {
    const currentStore: ILocalTripsStore = JSON.parse(localStorage.getItem('trips') || '{ "trips": [] }')
    if (route) currentStore.trips.push({
      timestamp: Date.now(),
      ...route
    })
    localStorage.setItem('trips', JSON.stringify(currentStore))
    setHistoricRoutes(currentStore)
  }

  const getLocalTrips = (): ILocalTripsStore => {
    return JSON.parse(localStorage.getItem('trips') || '{ "trips": [] }')
  }

  useEffect(() => {
    setHistoricRoutes(getLocalTrips())
  }, [])

  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='flex flex-col md:flex-row w-full justify-center gap-6'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2'>
            <InputField
              name='from'
              inputType='string'
              placeholderText='From'
              icon={<MyLocationIcon />}
              onChange={(event) => setLocation(event.target.value)}
              isValidated={locationRequired || false}
            />
            <InputField
              name='to'
              inputType='string'
              placeholderText='To'
              icon={<AddLocationAltIcon />}
              onChange={(event) => setDestination(event.target.value)}
              isValidated={destinationRequired || false}
            />
          </div>
          <div className='w-0'>
            <button aria-label='search' className='px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              type='submit'
              disabled={loading}
            >
              <p>{loading ? 'Calculating..' : 'Calculate!'}</p>
            </button>
          </div>
        </div>
      </form>
      <>
        {(!loading && route) &&
          <ItineraryCard
            route={route}
            onSave={saveToLocalStore}
          />
        }
      </>
      <div className='w-full md:w-1/2 sm:rounded-lg bg-gray-700 mt-20'>
        <div className='w-full bg-stone-800 p-4 rounded-t-lg'>
          <p className='font-bold'>History</p>
        </div>
        {historicRoutes.trips.length === 0 && (
          <p className='text-center py-4'>There is nothing to see here!</p>
        )}
        {historicRoutes.trips.sort((a, b) => b.timestamp - a.timestamp).map(route => (
          <div key={route.timestamp} className='flex flex-col'>
            <div className='flex flex-row py-3 px-4 border-t-[1px] border-solid border-gray-900'>
              <div className='w-full flex flex-row align-center'>
                <div>{route.from.name}</div>
                <EastIcon />
                <div>{route.to.name}</div>
              </div>
              <button onClick={() => handleExpandedState(route.timestamp)}>{`${expandedHistory === route.timestamp ? 'Hide' : 'Show'} details`}</button>
            </div>
            {expandedHistory === route.timestamp && (
              <div className='bg-gray-600 p-4'>
                <RouteDetails
                  route={route}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default RoutePlanner