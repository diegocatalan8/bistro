'use client'
import { MdDownload } from 'react-icons/md';
import React, { useState, useEffect } from 'react';
import APIUtility from '@/services/ApiUtility';
import Modal from '@/components/Modal';
import ModalOrderDetails from '@/components/ModalOrderDetails';
//import { useRouter } from 'next/navigation'

function Kitchen({userId=1}) {

  //UPDATE COMPONENT
  const [update, setUpdate] = useState(true);
  const updateComponent = () =>{
    setUpdate(!update);
  }

  //GET ORDER ID
  const [orderId, setOrderId] = useState(null);

  //GET DATA
  const [orders, setOrders] = useState([]); //This is for get all the actives orders
  const getOrders = async () => {
    try {
      const orderList = await APIUtility.fetchData(`/api/order`);
      setOrders(orderList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const[orderDetails, setOrderDetails] = useState([]);//this is for get the data and update the state
  const getOrderDetails = async (orderId) => {
    try {
      const ordersList = await APIUtility.fetchData(`/api/order/${orderId}`);
      setOrderDetails(ordersList.response);
      console.log(ordersList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [products, setProducts] = useState([]);//This is for get all the products in the cart of a specific order
  const getProducts = async (orderId) => {
    try {
      const productsList = await APIUtility.fetchData(`/api/cart/${orderId}`);
      setProducts(productsList.response);
      console.log(productsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //FILTER ORDERS BY STATE
  let ordersToAccept = orders.filter((order)=>{
        return order.state === 'toaccept';
  });
  let ordersInProcess = orders.filter((order)=>{
        return order.state === 'inprocess'
  });
  let ordersCompleted = orders.filter((order)=>{
        return order.state === 'completed'
  });

  //UPDATE STATE OF ORDERS
  const updateStateOfOrder = async (state) => {
    try {
      const obj = {
        payment_state : orderDetails.payment_state, 
        state: state, 
        discount_id : null, 
        modified_by: userId, 
        status: orderDetails.status
    }
      const url = `/api/order/${orderId}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  //MODAL FOR UPDATE TO ORDER IN PROCESS
  const modalTextOrderInProcess ={
    title:`Poner orden #${orderId} en proceso`,
    description:'¿Esta seguro que desea continuar?',
    buttonConfirmText:'Si, continuar'
  }

  const [isModalOpenOrderInProcess, setIsModalOpenOrderInProcess] = useState(false);

  const customClickConfirmModalOrderInProcess = async ()=>{
    setIsModalOpenOrderInProcess(false);
    updateStateOfOrder('inprocess');
    updateComponent();
  }

  const customClickCancelModalOrderInProcess =()=>{
    setIsModalOpenOrderInProcess(false);
  }

   //MODAL FOR VIEW DETAILS ON ORDERS IN PROCESS
   const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);

   const closeModalOrderDetails = () =>{
     setIsModalDetailsOpen(false);
   }

   const confirmModalOrderDetails = () =>{
        setIsModalDetailsOpen(false);
        updateStateOfOrder('completed');
        updateComponent();
   }


   let componentToRender = (
    <div className='flex flex-col justify-start w-screen h-screen p-6'>
    <h2 className='w-full text-[36px] font-semibold '>Ordenes</h2>
    <div className='w-full'>
          <MdDownload onClick={updateComponent} className='text-black cursor-pointer w-[40px] h-[40px] border-2 border-solid border-black rounded-xl'/>
    </div>
    <div className='flex flex-row flex-grow justify-between items-center'>
          {/**First Column */}
          <div className='bg-white flex flex-col overflow-hidden rounded-xl h-[90%] w-[30%] '>
              <div className='rounded-t-xl bg-[#E6F0FF] px-3  w-full h-[10%] flex flex-row justify-center items-center'>
                  <h3 className='text-[#015BD9]  h-fit w-[50%] font-semibold text-[25px]'>Por Aceptar</h3>
                  <p className=' h-fit w-[50%] font-semibold text-[25px] text-right'> {ordersToAccept.length} </p>
              </div>
              <div className='flex flex-col justify-start items-center overflow-y-scroll flex-grow'>
                  {
                      ordersToAccept.map((item)=>(
                              <div onClick={()=>{
                                  setOrderId(item.id);
                                  getOrderDetails(item.id);
                                  setTimeout(()=>{
                                     setIsModalOpenOrderInProcess(true);
                                  }, 300);
                              }} key={item.id} className='cursor-pointer text-white font-semibold text-[20px] rounded-xl flex flex-col justify-start items-center mt-4 bg-[#4CDC4C] px-4 py-3 w-[90%] h-[80px] bordr-2 border-solid border-red-500'>
                                     <p className='w-full text-right'>Nueva</p>
                                     <p className='w-full'>#{item.id}</p>
                              </div>
                      ))
                  }
              </div>
          </div>
          {/**Second Column */}
          <div className='bg-white flex flex-col rounded-xl  h-[90%] w-[30%] overflow-hidden'>
              <div className='rounded-t-xl bg-[#E6F0FF] px-3  w-full h-[10%] flex flex-row justify-center items-center'>
                  <h3 className='text-[#015BD9]  h-fit w-[50%] font-semibold text-[25px]'>En Proceso</h3>
                  <p className=' h-fit w-[50%] font-semibold text-[25px] text-right'> {ordersInProcess.length} </p>
              </div>
              <div className='flex flex-col justify-start items-center overflow-y-scroll flex-grow'>
                  {
                      ordersInProcess.map((item)=>(
                              <div  onClick={()=>{
                                  setOrderId(item.id);
                                  getProducts(item.id);
                                  getOrderDetails(item.id);
                                  setTimeout(()=>{
                                     setIsModalDetailsOpen(true);
                                  }, 300);
                              }} key={item.id} className='cursor-pointer  font-semibold text-[20px] rounded-xl flex flex-col justify-start items-center mt-4  px-4 py-3 w-[90%] h-[80px] border-2 border-solid border-black'>
                                     <p className='w-full text-right'>Ver Orden</p>
                                     <p className='w-full'>#{item.id}</p>
                              </div>
                      ))
                  }
              </div>
          </div>
          {/**Third Column */}
          <div className='bg-white rounded-xl flex flex-col  h-[90%] w-[30%] overflow-hidden'>
              <div className='rounded-t-xl bg-[#E6F0FF] px-3  w-full h-[10%] flex flex-row justify-center items-center'>
                  <h3 className='text-[#015BD9]  h-fit w-[50%] font-semibold text-[25px]'>Listas</h3>
                  <p className=' h-fit w-[50%] font-semibold text-[25px] text-right'> {ordersCompleted.length} </p>
              </div>
              <div className='flex flex-col justify-start items-center overflow-y-scroll flex-grow'>
                  {
                      ordersCompleted.map((item)=>(
                              <div  key={item.id} className='cursor-pointer  font-semibold text-[20px] rounded-xl flex flex-col justify-start items-center mt-4  px-4 py-3 w-[90%] h-[80px] border-2 border-solid border-black'>
                                     <p className='w-full text-right'>Orden Lista</p>
                                     <p className='w-full'>#{item.id}</p>
                              </div>
                      ))
                  }
              </div>

          </div>
    </div>
          {
              isModalOpenOrderInProcess && 
              <Modal
              title={modalTextOrderInProcess.title}
              description={modalTextOrderInProcess.description}
              buttonConfirmText={modalTextOrderInProcess.buttonConfirmText}
              isModalOpen={isModalOpenOrderInProcess}
              customClickCancelModal={customClickCancelModalOrderInProcess}
              customClickConfirmModal={customClickConfirmModalOrderInProcess}
          />
          }
          {
              isModalDetailsOpen && 
              <ModalOrderDetails
              modalOpen={isModalDetailsOpen}
              products={products}
              handleCancelModal={closeModalOrderDetails}
              orderId={orderId}
              confirmModal={confirmModalOrderDetails}
              buttonText='Terminar Orden'
              />
          }

         
  </div>
  )

  if (typeof window !== 'undefined' && window.innerWidth < 768){
    componentToRender = (
      <div className='font-bold text-[30px] text-center px-8 h-screen w-full flex flex-col justify-center items-center'>
          <p>USAR TABLETA PARA ESTE MODULO</p>
      </div>
    )
   }

  

  //USE EFFECT
  useEffect(()=>{
   
    getOrders();
  
  }, [update]);

  useEffect(()=>{
    setInterval(() => {
      getOrders();
    }, 10000);
    
  }, [])
  
  
  return (
      componentToRender
  )
}

export default Kitchen