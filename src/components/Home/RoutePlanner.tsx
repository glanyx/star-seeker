'use client'
import { useState } from 'react'
import { calculateCheapestRoute } from './actions'
import MyLocationIcon from '@mui/icons-material/MyLocation'
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt'
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EastIcon from '@mui/icons-material/East'
import { IRoute } from '@/interfaces/travel'

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
  
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='flex flex-row w-full justify-center'>
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2'>
            <div className='flex flex-col'>
              <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
                <label className='p-3 text-white'><MyLocationIcon /></label>
                <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
                  type='test'
                  placeholder='From'
                  onChange={(event) => setLocation(event.target.value)}
                />
              </div>
              {locationRequired && <p className='text-red-600 text-right'>Required</p>}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
                <label className='p-3 text-white'><AddLocationAltIcon /></label>
                <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
                  type='test'
                  placeholder='To'
                  onChange={(event) => setDestination(event.target.value)}
                />
              </div>
              {destinationRequired && <p className='text-red-600 text-right'>Required</p>}
            </div>
          </div>
          <div className='w-0'>
            <button className='ml-6 px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              type='submit'
              disabled={loading}
            >
              <p>{loading ? 'Calculating..' : 'Calculate!'}</p>
            </button>
          </div>
        </div>
      </form>
      <>
        {route &&
          <div className='sm:w-full md:w-1/2 lg:w-1/4 text-white'>
            <div className='flex flex-col'>
              <p className='font-bold'>Your Itinerary</p>
              <div>
                <div className='flex flex-row font-bold justify-center'>
                  <p>{`${route.from.name} -`}</p>
                  <RocketLaunchIcon />
                  <p>{`- ${route.to.name}`}</p>
                </div>
                <div>
                  <p>Via:</p>
                  <div className='flex flex-row'>
                    {route.route.map((stop, index) => (
                      <div key={stop} className='flex flex-row px-2'>
                        {index !== 0 && <EastIcon />}
                        <p className='pl-3'>{stop}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <p className='font-bold py-4'>{`Total Cost: ${route.totalCost}`}</p>
              </div>
            </div>
          </div>
        }
      </>
    </>
  )
}

export default RoutePlanner