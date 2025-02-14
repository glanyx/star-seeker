'use client'
import { useState } from 'react'
import { calculateTransport } from '../Home/actions'
import PeopleAltIcon from '@mui/icons-material/PeopleAlt'
import StraightenIcon from '@mui/icons-material/Straighten'
import LocalParkingIcon from '@mui/icons-material/LocalParking'
import { ITransportCost } from '@/interfaces/travel'
import InputField from '../Layout/InputField'
import TransportCard from './TransportCard'

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
    
    setDistanceRequired(distance ? false : true)
    setPassengersRequired(passengers ? false : true)
    setParkingRequired(parkingDays ? false : true)

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
        <div className='flex flex-col md:flex-row w-full justify-center'>
          <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
            <InputField
              name='distance'
              inputType='number'
              placeholderText='Distance in AU'
              icon={<StraightenIcon />}
              onChange={(event) => setDistance(parseInt(event.target.value))}
              isValidated={distanceRequired || false}
            />
            <InputField
              name='passengers'
              inputType='number'
              placeholderText='Passengers'
              icon={<PeopleAltIcon />}
              onChange={(event) => setPassengers(parseInt(event.target.value))}
              isValidated={passengersRequired || false}
            />
            <InputField
              name='parking'
              inputType='number'
              placeholderText='Parking Days'
              icon={<LocalParkingIcon />}
              onChange={(event) => setParkingDays(parseInt(event.target.value))}
              isValidated={parkingRequired || false}
            />
          </div>
          <div className='w-0'>
            <button aria-label='search' className='mt-6 ml-0 md:mt-0 md:ml-6 px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50'
              type='submit'
            >
              <p>{loading ? 'Planning..' : 'Plan!'}</p>
            </button>
          </div>
        </div>
      </form>
      <>
        {transportData &&
          <TransportCard
            transportData={transportData}
          />
        }
      </>
    </>
  )
}

export default JourneyPlanner