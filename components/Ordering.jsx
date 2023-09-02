import React from 'react'
import { useOrderIdContext } from '@/context/orderId/OrderIdContext';

function Ordering() {

  const {orderId} = useOrderIdContext();

  console.log(orderId);

  return (
    <div className='h-full w-full flex flex-col justify-center items-center border-2 border-blue-500 border-solid'>
         Ordering
    </div>
  )
}

export default Ordering