'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

function Dashboard() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/dashboard/order')
  }, [])

  
  return (
    <div className='w-screen'>
      
    </div>
  )
}

export default Dashboard