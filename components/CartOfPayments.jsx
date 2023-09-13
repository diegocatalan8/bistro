import React, { useState, useEffect } from 'react'
import Modal from './Modal';
import { BiSolidTrashAlt } from 'react-icons/bi';
import APIUtility from '@/services/ApiUtility';

function CartOfPayments({totalToPay, orderId, orderDetails, changeState, update, debt, isCartOpen, setIsCartOpen, userId = 1}) {

  //DELETE PAYMENT OF THE CART
  const [idToDelete, setIdToDelete] = useState(false);
  const updatePayment = async () => {
    try {
      const obj = {
        idItem: idToDelete,
        active: false,
        userId: userId
      }
      const url = `http://localhost:3000/api/payments/${orderDetails.id}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      changeState();
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
     
    }
  };

  //CHANGE STATE PAYMENT TO TRUE
  const paymentStateUpdateOrder = async () => {
    try {
      const obj = {
        payment_state : true, 
        state: orderDetails.state,
        discount_id : orderDetails.discount_id, 
        modified_by: userId, 
        status: orderDetails.status
      }
      const url = `http://localhost:3000/api/order/${orderDetails.id}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      changeState();
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  //MODAL FOR DELETE PAYMENT
  const modalText ={
    title:'Eliminar Pago',
    description:'¿Esta seguro que desea continuar?',
    buttonConfirmText:'Eliminar'
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customClickConfirmModal = async ()=>{
           setIsModalOpen(false);
           updatePayment();
  }
  const customClickCancelModal =()=>{
        setIsModalOpen(false);
  }

  //GET PAYMENTS
  const [payments, setPayments] = useState([]);
  const getPayments = async () => {
    try {
      const paymentsList = await APIUtility.fetchData(`http://localhost:3000/api/payments/${orderId}`);
      setPayments(paymentsList.response);
      console.log(paymentsList);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //USE EFFECT
    useEffect(()=>{
      getPayments();
    }, [update])

  return (
    <aside className={`Aside bg-white h-full flex flex-row  ${isCartOpen ? 'w-full absolute z-20 lg:static lg:z-0  lg:w-[35%] xl:w-[30%]' : 'w-[10%] md:w-[5%] lg:static lg:z-0 lg:w-[35%] xl:w-[30%]'}`}>
            <div className={`ButtonAside flex flex-col justify-center bg-[#E8E8E8]  h-full ${isCartOpen ? 'w-[10%] lg:hidden' : 'w-full lg:hidden'}`}>
                <button onClick={()=>{setIsCartOpen(!isCartOpen)}}  className='w-full h-[60px] font-semibold text-[22px] bg-[#2E68FF]  text-white rounded-l-md '>
                    {isCartOpen ? ">" : "<"}
                </button>
            </div>

            <div className={`h-full flex flex-col p-3 bg-white ${isCartOpen ? 'w-[90%] lg:w-full' : 'hidden lg:w-full'}`}>

                    <header className='flex flex-col w-full justify-center h-[12%] '>
                        <p className='w-full font-semibold text-[22px] md:text-[40px] lg:text-[22px]'>Payments</p>
                    </header>

                    <section className='h-[58%] flex flex-col overflow-y-scroll border-y-2 border-solid border-gray-400'>
                            <div className='h-full w-full'>
                            {
                                payments?.map((item)=>(
                                    <div key={item.id} className='flex flex-col justify-center w-full h-[70px] border-b border-solid border-gray-300'>
                                        <div className='flex flex-row justify-between items-center h-[80%]'>
                                            <div className='text-[20px] flex flex-row items-center h-full w-fit'>
                                                <p>{item?.type === 'cash' ? 'Efectivo' : ''}</p>
                                                <p className='ml-3'>${item?.amount}</p>
                                            </div>

                                            <button onClick={()=>{
                                                setIdToDelete(item.id);
                                                setIsModalOpen(true);
                                            }} className={`${orderDetails.payment_state ? 'hidden' : ''} text-red-500 hover:text-white border-2 border-solid border-red-500 hover:border-red-800 hover:bg-red-500 rounded-md h-[40px] w-[40px] flex justify-center items-center`}>
                                                    <BiSolidTrashAlt className=' w-[20px] h-[30px]'/>
                                            </button>
                                        </div>
                                    </div>
                                ))
                            }
                            </div>
                    </section>

                    <footer className='flex flex-col justify-between items-center h-[30%]'>

                        <div className='mt-6 text-[24px] font-semibold h-[25%] flex flex-col  justify-center w-[80%]'>
                            <p className='w-full text-right' >Total</p>
                            <p className='w-full text-right'>Q{totalToPay}</p>
                        </div>

                        <div className='text-[24px] font-semibold h-[25%] flex flex-col justify-center w-[80%]'>
                            <p>Restante</p>
                            <p>Q{debt > 0 ? debt : '0.00'}</p>
                        </div>

                        <div className='h-[50%] flex flex-col justify-center w-[80%]'>
                            <button
                                onClick={()=>{
                                  paymentStateUpdateOrder();
                                }}
                                type='button'
                                disabled={debt > 0 || orderDetails?.payment_state}
                                className={`${debt > 0 || orderDetails?.payment_state ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'} w-[100%] flex  h-[46px] md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md   text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6  `}
                            >
                                Confirmar Pago
                            </button>
                        </div>
        
                    </footer>
    
                    <Modal
                        title={modalText.title}
                        description={modalText.description}
                        buttonConfirmText={modalText.buttonConfirmText}

                        isModalOpen={isModalOpen}
                        customClickCancelModal={customClickCancelModal}
                        customClickConfirmModal={customClickConfirmModal}
                    />
            </div>
    </aside>
  )
}

export default CartOfPayments