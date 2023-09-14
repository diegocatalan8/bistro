"use client";

import React, { useState, useEffect } from 'react';
import APIUtility from '@/services/ApiUtility';
import {useRouter} from 'next/navigation';
import { BiSolidTrashAlt } from 'react-icons/bi';
import Modal from './Modal';

function CartOfOrders({orderDetails, changeState, update, orderId, isCartOpen, setIsCartOpen, userId = 1}) {
  
  //ROUTER
  const router = useRouter();
  //GET DATA
  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const productsList = await APIUtility.fetchData(`http://localhost:3000/api/cart/${orderId}`);
      setProducts(productsList.response);
      console.log(productsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //DELETE PRODUCTS OF THE CART
  const [idToDelete, setIdToDelete] = useState(false);

  const updateProduct = async () => {
    try {
      const obj = {
        idItem: idToDelete,
        active: false,
      }
      const url = `http://localhost:3000/api/cart/${orderId}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      changeState();
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
     
    }
  };

  //SEND COMANDA LOGIC
  const sendComandaUpdateOrder = async () => {
    try {
      const obj = {
        payment_state : orderDetails.payment_state, 
        state: 'toaccept', 
        discount_id : null, 
        modified_by: userId, 
        status: true
    }
      const url = `http://localhost:3000/api/order/${orderId}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      changeState();
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };
 
  //DELETE ORDER LOGIC
  const deleteOrderUpdate = async () => {
    try {
      const obj = {
        payment_state : orderDetails.payment_state, 
        state: orderDetails.state, 
        discount_id : orderDetails.discount_id, 
        modified_by: userId, 
        status: false
    }
      const url = `http://localhost:3000/api/order/${orderId}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      changeState();
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  //BUTTONS DISABLED
  const [isSendComandaDisabled, setIsSendComandaDisabled] = useState(true);
  const [isConfirmButtonDisabled, setIsConfirmButtonDisabled] = useState(true);

  //MODAL FOR DELETE PRODUCT
  const modalText ={
    title:'Eliminar del carrito',
    description:'¿Esta seguro que desea continuar?',
    buttonConfirmText:'Eliminar'
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customClickConfirmModal = async ()=>{
           setIsModalOpen(false);
           updateProduct();
  }
  const customClickCancelModal =()=>{
        setIsModalOpen(false);
  }

  //MODAL FOR CANCEL ORDER
  const modalTextCancelOrder ={
    title:'Cancelar Orden',
    description:'¿Esta seguro que desea cancelar la orden?',
    buttonConfirmText:'Cancelar'
  }

  const [isModalCancelOrderOpen, setIsModalCancelOrderOpen] = useState(false);
  
  const customClickConfirmModalCancelOrder = ()=>{
          setIsModalCancelOrderOpen(false);
          deleteOrderUpdate();
          router.push('/dashboard/order');
  }
  const customClickCancelModalCancelOrder =()=>{
        setIsModalCancelOrderOpen(false);
  }
  

  //USE EFFECTS
  useEffect(()=>{
        getProducts();
  }, [update])

  useEffect(()=>{
        setIsSendComandaDisabled((products.length > 0 && orderDetails.state === 'registered' && orderDetails.status === true)  ? false : true);
        setIsConfirmButtonDisabled(orderDetails.status === false || products.length === 0 ? true : false);
  }, [products, orderDetails.state, orderDetails.status])

  

  return (
    <aside className={`Aside bg-white h-full flex flex-row  ${isCartOpen ? 'w-full absolute z-20 lg:static lg:z-0  lg:w-[35%] xl:w-[30%]' : 'w-[10%] md:w-[5%] lg:static lg:z-0 lg:w-[35%] xl:w-[30%]'}`}>
            <div className={`ButtonAside flex flex-col justify-center bg-[#E8E8E8]  h-full ${isCartOpen ? 'w-[10%] lg:hidden' : 'w-full lg:hidden'}`}>
                <button onClick={()=>{setIsCartOpen(!isCartOpen)}}  className='w-full h-[60px] font-semibold text-[22px] bg-[#2E68FF]  text-white rounded-l-md '>
                    {isCartOpen ? ">" : "<"}
                </button>
            </div>

            <div className={`h-full flex flex-col p-3 bg-white ${isCartOpen ? 'w-[90%] lg:w-full' : 'hidden lg:w-full'}`}>

                    <header className='flex flex-col w-full justify-center h-[15%]'>
                       
                            <p className='w-full font-semibold text-[20px] md:text-[35px] lg:text-[18px]'>Orden #{orderDetails.id}</p>
                            <p className='w-full text-[18px] md:text-[25px] lg:text-[15px]'>{orderDetails.description}</p>
                            <div className='w-full flex flex-row justify-end'>
                                    <p className={`${orderDetails.status === true ? '' : 'hidden'} py-1 pr-2 flex-1 text-right `}>
                                        {orderDetails.state === 'registered' ? 'Registrada' : orderDetails.state === 'toaccept' ? 'Por aceptar' : orderDetails.state === 'inprocess' ? 'En Proceso' : orderDetails.state === 'inprocess' ? 'completed' : ''} 
                                    </p>
                                    <p className={`${orderDetails.status === true ? 'hidden' : ''} py-1 pr-2 flex-1 text-right `}>
                                        Cancelada
                                    </p>
                                    <div className={`${orderDetails.status === true ? '' : 'hidden'} w-fit flex flex-col justify-center items-center`}>
                                        <div className={`${orderDetails.state === 'registered' ? 'bg-red-500 shadow-lg' : orderDetails.state === 'toaccept' ? 'bg-orange-500 shadow-lg' : orderDetails.state === 'inprocess' ? 'bg-blue-500 shadow-lg' : orderDetails.state === 'inprocess' ? 'completed' : ''} w-4 h-4 rounded-xl`}>
                                        </div>
                                    </div>
                                    <div className={`${orderDetails.status === true ? 'hidden' : ''} w-fit flex flex-col justify-center items-center`}>
                                        <div className={`bg-red-500 w-4 h-4 rounded-xl`}>
                                        </div>
                                    </div>
                            </div>
                       
                
                    </header>

                    <section className='h-[60%] flex flex-col overflow-y-scroll border-y-2 border-solid border-gray-400'>
                        <div className='h-full'>
                        {
                            products.map((item)=>(
                                <div key={item.id} className='p-2 flex flex-row justify-between border-b-2 border-solid border-gray-200 w-full h-[33.33%] '>
                                    {/**COLUMN 1 */}
                                        <div className='flex flex-col justify-start w-[25%] '>

                                            <div  className='w-full rounded-lg border-solid '>
                                                <img alt='product' src={item.image} className='w-full h-full rounded-lg'/>

                                            </div>
                                        </div>

                                    {/**COLUMN 2 */}
                                        <div className='flex flex-col justify-between p-1.5 w-[50%]'>
                                            <div>
                                                <p className='font-medium  text-[20px] md:text-[30px] lg:text-[18px]'>{item.name}</p>
                                                <p className='md:text-[25px] lg:text-[15px]'>{item.note}</p>
                                            </div>
                                            
                                            <p className='md:text-[25px] lg:text-[15px]'>Cant. {item.quantity}</p>
                                        </div>

                                    {/**COLUMN 3 */}
                                        <div className='flex flex-col justify-between p-2 w-[25%] '>
                                                <p className='w-full text-center font-bold text-[#4D81F1] md:text-[25px] lg:text-[15px]'>${parseFloat(item.subtotal).toFixed(2)}</p>

                                                <div className={`${orderDetails.state !== 'registered' || orderDetails.status === false || orderDetails.payment_state === true ? 'hidden' : ''} w-full flex justify-center items-center`}>
                                                    <button onClick={()=>{
                                                        setIsModalOpen(true);
                                                        setIdToDelete(item.id)
                                                    }} className='text-white bg-red-500 border-2 border-solid border-red-500 hover:border-red-800 hover:bg-red-500 rounded-md h-[40px] w-[40px] md:h-[60px] md:w-[60px] lg:h-[40px] lg:w-[40px] flex justify-center items-center'>
                                                            <BiSolidTrashAlt className=' w-[20px] h-[30px] md:w-[40px] md:h-[50px] lg:w-[20px] lg:h-[30px]'/>
                                                    </button>
                                                </div>
                                        </div>
                                </div>
                            ))
                        }
                        </div>
                    </section>

                    <footer className='flex flex-col justify-center items-center h-[30%]'>
                        <div className='flex flex-col justify-center h-full w-[80%]'>
                            <button
                                onClick={()=>{
                                    router.push(`/dashboard/order/payment/${orderId}`)
                                }}
                                type='button'
                                disabled={isConfirmButtonDisabled}
                                className={`${isConfirmButtonDisabled ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'} w-[100%] flex  h-[46px] md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md   text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6  `}
                            >
                                {orderDetails.payment_state ? 'Ver pagos' : `Cobrar Q ${products[0] ? parseFloat(products[0]?.sum_total).toFixed(2) : '0.00'}`}
                            </button>

                            <div className='flex flex-row justify-between w-full'>
                            
                                <button
                                onClick ={()=>{
                                    sendComandaUpdateOrder();
                                }}
                                type='button'
                                disabled={isSendComandaDisabled}
                                className={`mt-3 w-[49%] ${isSendComandaDisabled ? 'bg-gray-300 text-white' : ''} flex  h-[46px] md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md bg-[#50D1AA]  text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600`}
                                >
                                    Enviar 
                                </button>

                                <button
                                onClick ={()=>{
                                    if(orderDetails.status){
                                        setIsModalCancelOrderOpen(true);
                                        changeState();
                                    
                                    }
                                    else{
                                        router.push('/dashboard/order');
                                    }
                                }}
                                type='button'
                                className='mt-3 w-[49%]  flex h-[46px] md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md bg-[#FF0000]  text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6 text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                                >
                                    {orderDetails.status ? 'Eliminar' : 'Regresar'}
                                </button>

                            </div>
                        </div>

                    </footer>


                    {isModalCancelOrderOpen && <Modal
                        title={modalTextCancelOrder.title}
                        description={modalTextCancelOrder.description}
                        buttonConfirmText={modalTextCancelOrder.buttonConfirmText}

                        isModalOpen={isModalCancelOrderOpen}
                        customClickCancelModal={customClickCancelModalCancelOrder}
                        customClickConfirmModal={customClickConfirmModalCancelOrder}
                    />}

                    {isModalOpen && <Modal
                        title={modalText.title}
                        description={modalText.description}
                        buttonConfirmText={modalText.buttonConfirmText}

                        isModalOpen={isModalOpen}
                        customClickCancelModal={customClickCancelModal}
                        customClickConfirmModal={customClickConfirmModal}
                    />}
            </div>
    </aside>
  )
}

export default CartOfOrders