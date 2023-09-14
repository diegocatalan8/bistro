'use client'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import LoadingPage from '@/components/LoadingPage';


export default async function Home() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/sesion/login')
  }, [])


  return (
   <div>
     <LoadingPage/>
   </div>
  )
}
