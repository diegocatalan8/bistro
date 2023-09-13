import React from 'react';
import { Transition } from '@headlessui/react';


export default function ModalTransaction({
  modalOpen,
  handleCancelModal,
  products,
  payments,
  orderDetails
}) {

  console.log(orderDetails);

  const onClickCancel = () => {
    handleCancelModal();
  };

  return (
    <Transition
      show={modalOpen}
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='fixed z-30 inset-0 overflow-y-auto'>
        <div className='flex  items-center justify-center min-h-screen'>
          <div className='fixed inset-0 bg-gray-100 bg-opacity-75 h-full'></div>

          <div className='p-10 overflow-hidden relative  dark:border-none bg-white border-solid border-2 border-[#ffffff33] shadow-[0px_-4px_40px_rgba(0,0,0,0.15)] dark:shadow-none  rounded-xl z-20 w-[80%] md:w-[70%] lg:w-[40%] xl:w-[30%] h-[500px] md:h-[700px] xl:h-[600px] flex flex-col justify-start items-center'>
            <button
              onClick={onClickCancel}
              className=' text-[22px] w-full font-bold text-left'
            >
              X
            </button>

            <div className='overflow-y-scroll h-full w-full'>
                <div className='flex flex-col mt-3'>
                  {/**TITLE */}
                  <h2 className='text-[30px] font-semibold'>
                    Orden # {orderDetails.id}
                  </h2>
                  <p>{orderDetails.description}</p>
                  
                </div>
                
                  {/**ARTICULOS */}
                  <section className='mt-3 border-t-2 border-dotted border-gray-500 h-[130px] py-3  w-full  flex flex-col justify-between '>
                    <div className='w-full flex flex-row justify-start  text-left px-3'>
                      <p className='font-semibold'>Articulos</p>
                    </div>

                    <div className='w-full flex flex-col justify-between mt-2 overflow-y-scroll px-3'>
                      {products?.map((item) => (
                        <div
                          key={item.id}
                          className='w-full flex flex-row justify-between'
                        >
                          <p>
                            +<span>{item.quantity}</span>{' '}
                            <span>{item.name}</span>
                          </p>
                          <p>Q {item.subtotal}</p>
                        </div>
                      ))}
                    </div>
                  </section>

                
                  {/**TOTAL */}
                  <section className='mt-2 border-t-2 border-dotted border-gray-500 w-full flex flex-col justify-between '>
                    <div className='py-4 px-3 w-full flex flex-col justify-between'>
                      <div className='w-full flex flex-row justify-between text-[22px] font-semibold'>
                        <p>Total</p>
                        <p>Q{products[0]?.sum_total}</p>
                      </div>
                    </div>
                  </section>


                  {/**PAGOS */}
                  <section className='border-t-2 border-dotted border-gray-500 h-[130px] py-3 w-full  flex flex-col justify-between'>
                    <div className='px-3 w-full flex flex-row justify-start  text-left'>
                      <p className='font-semibold'>Pagos</p>
                    </div>

                    <div className='px-3 w-full flex flex-col justify-between mt-2 overflow-y-scroll'>
                      {payments?.map((item) => (
                        <div
                          key={item.id}
                          className='w-full flex flex-row justify-between'
                        >
                          <p>
                            +<span>Q {item.amount}</span>{' '}
                            <span>{item.type === 'cash' ? 'Efectivo' : ''}</span>
                          </p>
                          
                        </div>
                      ))}
                    </div>
                  </section>

                  {/**TOTAL PAGOS*/}
                  <section className='border-t-2 border-dotted border-gray-500 w-full flex flex-col justify-between '>
                    <div className='mt-3 px-3 w-full flex flex-col justify-between'>
                      <div className='w-full flex flex-row justify-between text-[22px] font-semibold'>
                        <p>Total Pagos</p>
                        <p>Q{payments[0]?.sum_payments}</p>
                      </div>
                      <div className='w-full flex flex-row justify-between text-[22px] font-semibold'>
                        <p>Cambio:</p>
                        <p>Q{-parseFloat(products[0]?.sum_total - payments[0]?.sum_payments).toFixed(2)}</p>
                      </div>
                    </div>
                  </section>
            </div>

           
          </div>


        </div>
      </div>
    </Transition>
  );
}
