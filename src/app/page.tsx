'use client'
import { GateInfo } from '@/components/Home'
import { useRouter } from 'next/navigation'

export default function Home() {

  const router = useRouter()

  return (
    <>
      <GateInfo />
      <div className='flex flex-col sm:flex-row gap-6'>
        <button aria-label='planjourney' className='px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase' onClick={() => router.push('/planmyjourney')}>Plan a Journey</button>
        <button aria-label='routecalculator' className='px-4 py-3 bg-gray-700 hover:bg-gray-500 rounded-lg uppercase' onClick={() => router.push('/routecalculator')}>Find the Cheapest Route!</button>
      </div>
    </>
  );
}
