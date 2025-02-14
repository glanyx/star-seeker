'use client'
import { useRouter } from 'next/navigation'

const Footer = () => {

  const router = useRouter()

  return(
    <>
      <button
        onClick={() => router.push('/')}
      >
        To Homepage
      </button>
    </>
  )
}

export default Footer