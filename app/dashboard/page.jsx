'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';


function Dashboard() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/dashboard/order')
  }, [])

  
  return (
    <div className='w-screen'>
      <LoadingPage/>
    </div>
  )
}

export default Dashboard