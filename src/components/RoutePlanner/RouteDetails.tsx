import { IRoute } from "@/interfaces/travel"
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch'
import EastIcon from '@mui/icons-material/East'

interface IRouteDetailsProps {
  route: IRoute
}

const RouteDetails = ({
  route,
}: IRouteDetailsProps) => {

  return(
    <>
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
    </>
  )
}

export default RouteDetails