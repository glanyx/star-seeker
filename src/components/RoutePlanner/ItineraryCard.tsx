import { IRoute } from "@/interfaces/travel"
import RouteDetails from "./RouteDetails"

interface IItineraryCardProps {
  route: IRoute
  onSave: () => void
}

const ItineraryCard = ({
  route,
  onSave,
}: IItineraryCardProps) => {

  return(
    <div className='sm:w-full md:w-1/2 lg:w-1/4 text-white'>
      <div className='flex flex-row w-full justify-center'>
        <div className='flex flex-col w-full'>
          <p className='font-bold'>Your Itinerary</p>
          <div>
            <RouteDetails
              route={route}
            />
          </div>
        </div>
        <div className='w-0 content-center'>
          <button
            onClick={onSave}
            className='w-32 ml-6 px-6 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase'
          >
            Save Trip
          </button>
        </div>
      </div>
    </div>
  )
}

export default ItineraryCard