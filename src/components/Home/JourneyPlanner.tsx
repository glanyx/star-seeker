'use client'
import { useState } from 'react'
import { calculateTransport } from './actions'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StraightenIcon from '@mui/icons-material/Straighten'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import { ITransport, ITransportCost } from '@/interfaces/travel'

const JourneyPlanner = ({

}) => {

  const [loading, setLoading] = useState<boolean>(false)

  // request
  const [distance, setDistance] = useState<number>()
  const [distanceRequired, setDistanceRequired] = useState<boolean>()
  const [passengers, setPassengers] = useState<number>()
  const [passengersRequired, setPassengersRequired] = useState<boolean>()
  const [parkingDays, setParkingDays] = useState<number>()
  const [parkingRequired, setParkingRequired] = useState<boolean>()

  // response
  const [transportData, setTransportData] = useState<ITransportCost>()

  const validateForm = () => {
    
    if (!distance) setDistanceRequired(true)
    if (!passengers) setPassengersRequired(true)
    if (!parkingDays) setParkingRequired(true)

    if (!distance || !passengers || !parkingDays) return false
    return true

  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()
    if (!validateForm()) return

    setDistanceRequired(false)
    setPassengersRequired(false)
    setParkingRequired(false)
    setLoading(true)
    calculateTransport({
      distance: distance ?? 1,
      passengers: passengers ?? 1,
      parkingDays: parkingDays ?? 1,
    }).then(data => {
      setTransportData(data)
      setLoading(false)
    })

  }
  
  return (
    <>
      <form onSubmit={e => handleSubmit(e)}>
        <div className='flex flex-row w-full justify-center'>
          <div className='grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <div className='flex flex-col'>
              <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
                <label className='p-3 text-white'><StraightenIcon /></label>
                <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
                  type='number'
                  placeholder='Distance (in AU)'
                  onChange={(event) => setDistance(parseInt(event.target.value))}
                />
              </div>
              {distanceRequired && <p className='text-red-600 text-right'>Required</p>}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
                <label className='p-3 text-white'><PeopleAltIcon /></label>
                <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
                  type='number'
                  placeholder='Passengers'
                  onChange={(event) => setPassengers(parseInt(event.target.value))}
                />
              </div>
              {passengersRequired && <p className='text-red-600 text-right'>Required</p>}
            </div>
            <div className='flex flex-col'>
              <div className='flex flex-row bg-gray-600 rounded-lg align-items-center'>
                <label className='p-3 text-white'><LocalParkingIcon /></label>
                <input className='pl-2 text-xl outline-none rounded-r-lg text-black'
                  type='number'
                  placeholder='Parking Days'
                  onChange={(event) => setParkingDays(parseInt(event.target.value))}
                />
              </div>
              {parkingRequired && <p className='text-red-600 text-right'>Required</p>}
            </div>
          </div>
          <div className='w-0'>
            <button className='ml-6 px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              type='submit'
            >
              <p>{loading ? 'Planning..' : 'Plan!'}</p>
            </button>
          </div>
        </div>
      </form>
      <>
        {transportData &&
          <div className='w-full flex flex-row justify-center'>
            <p className='font-bold content-center px-8'>Cheapest!</p>
            <div className='sm:w-full md:w-1/2 lg:w-1/4 text-white flex flex-col'>
              <div className='w-full flex flex-row pb-2'>
                <div className='w-3/4 flex flex-col'>
                  <div>
                    <p>{`Journey Cost: ${transportData.journeyCost.toFixed(2)} ${transportData.currency}`}</p>
                    <p>{`Parking Fee: ${transportData.parkingFee.toFixed(2)} ${transportData.currency}`}</p>
                  </div>
                </div>
                <div className='w-2/4 text-right'>
                  <p className='font-bold'>Vehicle:</p>
                  <p>{`${transportData.recommendedTransport.name}`}</p>
                  <p>{`${transportData.recommendedTransport.capacity} seats`}</p>
                </div>
              </div>
              <div className='border-t-2 border-gray-600 pt-3'>
                <p className='font-bold'>{`Total: ${(transportData.journeyCost + transportData.parkingFee).toFixed(2)} ${transportData.currency}`}</p>
              </div>
            </div>
          </div>
        }
      </>
    </>
  )
}

export default JourneyPlanner