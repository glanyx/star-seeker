import { ITransportCost } from "@/interfaces/travel"

interface ITransportCardProps {
  transportData: ITransportCost
}

const TransportCard = ({
  transportData,
}: ITransportCardProps) => {

  return(
    <div className='w-full flex flex-row justify-center p-8 gap-4'>
      <p className='font-bold content-center'>Cheapest!</p>
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
            <p className='text-grey-400 text-md'>{`${transportData.recommendedTransport.ratePerAu} ${transportData.currency}/AU`}</p>
          </div>
        </div>
        <div className='border-t-2 border-gray-600 pt-3'>
          <p className='font-bold'>{`Total: ${(transportData.journeyCost + transportData.parkingFee).toFixed(2)} ${transportData.currency}`}</p>
        </div>
      </div>
    </div>
  )
}

export default TransportCard