'use client'

import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import CardOrder from '@/components/CardOrder';
import CreateOrderForm from '@/components/CreateOrderForm';
import { useRouter } from 'next/navigation';


function Order() {

  const router = useRouter();

  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] =  useState(false);

  const openModal = () =>{
      setIsModalOpen(true);
  }

  const closeModal = () =>{
    setIsModalOpen(false);
}
  
  const getOrders = async () => {
    try {
      const orderList = await APIUtility.fetchData(`http://localhost:3000/api/order`);
      setOrders(orderList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const onClickOrder = (id) =>{
    router.push(`/dashboard/order/${id}`)
  } 

  useEffect(()=>{
    getOrders();
  }, [])

  
  return (
    <div className='border-2 border-solid border-red-500 h-full w-full justify-center md:justify-start flex-wrap  flex flex-row  px-6 py-6 overflow-y-scroll'>

         <div onClick={openModal} className='mr-5 lg:mb-5   cursor-pointer mt-10 md:mt-5 lg:mt-0 border-2 border-black  border-dotted shadow-sm flex flex-col text-center justify-center  items-center bg-white w-[60%] md:w-[45%] lg:w-[30%] xl:w-[18%] h-[30%] lg:h-[35%] rounded-xl '>
            <p className='text-[40px]'>+</p>        
            <h2 className='text-[20px] w-full'>Nueva orden</h2> 
         </div>

         {
          orders.map((item)=>(
                <CardOrder customClick={()=>{onClickOrder(item.id)}} key={item.id} item={item}/>
          ))
         }

          
         <CreateOrderForm  closeModal={closeModal} isModalOpen={isModalOpen}/>


    </div>
  )
}

export default Order