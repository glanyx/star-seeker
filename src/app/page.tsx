'use client'
import { GateInfo } from '@/components/Home'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  const navigate = () => {
    
  }

  return (
    <>
      <GateInfo />
      <div className='flex flex-row'>
        <button className='ml-6 px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase' onClick={() => router.push('/planmyjourney')}>Plan a Journey!</button>
        <button className='ml-6 px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase' onClick={() => router.push('/routecalculator')}>Find the Cheapest Route!</button>
      </div>
    </>
  );
}
