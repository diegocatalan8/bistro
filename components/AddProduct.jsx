"use client"
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';
import { Fragment, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react';




function AddProduct({changeState, isModalOpen, customCloseModal, data, variations, orderId}) {
   
    
    const cancelButtonRef = useRef(null);
    const [quantityItems, setQuantityItems] = useState(1);

    const variationsFilter = variations.filter((variation)=>{
            return variation.product_id === data.id
    })
    const addItem = () =>{
        setQuantityItems(quantityItems+1);
    }
    const restItem = () =>{
        if(quantityItems > 1){
          setQuantityItems(quantityItems-1);
        }else{
          setQuantityItems(1);
        }
        
    }
    const resetCounter = () =>{
        setQuantityItems(1);
    }
    const {register, formState:{errors}, handleSubmit, reset} = useForm();

    const  onSubmit = async (data) =>{
  
        closeModal();
        console.log(data);
        create(data);
        resetCounter();
        
    }

    const create = async (obj) => {

      const struct = {
          quantity: quantityItems,
          variationId: obj.variationId,
          note: obj.note,
          orderId: orderId,
      }
      try {
        const url = '/api/cart';
        const response = await APIUtility.postData(url, struct);
        console.log('Datos recibidos:', response);
        changeState();
      } 
      catch (error) {
        console.error('Error en la petición:', error.message);
      }
    }; 


    const closeModal = () =>{
        customCloseModal();
        reset();
        setBoxChange(null);
        resetCounter();
    }

    const [boxChange, setBoxChange] = useState(null);
    const handleChangeBoxChange = (option) =>{
      setBoxChange(option);
    }


  return (
    <Transition.Root show={isModalOpen} as={Fragment}>
    <Dialog
      as='div'
      className='relative z-20'
      initialFocus={cancelButtonRef}
      onClose={closeModal}
    >

      <Transition.Child
        as={Fragment}
        enter='ease-out duration-300'
        enterFrom='opacity-0'
        enterTo='opacity-100'
        leave='ease-in duration-200'
        leaveFrom='opacity-100'
        leaveTo='opacity-0'
      >
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
      </Transition.Child>


      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='flex min-h-full items-center  justify-center p-4 text-center sm:items-center sm:p-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            enterTo='opacity-100 translate-y-0 sm:scale-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100 translate-y-0 sm:scale-100'
            leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
          >
            <Dialog.Panel className='p-6 h-[400px] w-[100%] md:w-[70%] lg:w-[55%] xl:w-[45%] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'>
              
              <form onSubmit={handleSubmit(onSubmit)} className=' h-full w-full flex flex-row justify-between'>
                  {/**Column One */}
                  <div className='h-full w-[50%] mr-2'>
                      <div className='h-[50%] rounded-lg w-full '>

                            <img className='w-full h-full rounded-lg' src={data.image} alt='Product Image'/>

                      </div>
                      <div className='h-[50%] w-full flex flex-col '>
                            <h2 className='w-full h-[20%] font-semibold text-[20px]  px-3 '>{data.name}</h2>
                            <p className='px-3 w-full flex-grow overflow-y-scroll '>
                                {data.description}
                            </p>
                            <div className='h-fit w-full flex flex-row justify-start items-center'>
                                <button type='button' onClick={restItem} className='text-[20px] font-semibold shadow-md text-[#2E68FF] hover:bg-[#2E68FF] hover:text-white border-2 border-solid border-[#2E68FF] w-[40px] h-[40px] rounded-lg'>-</button>
                                  <input
                                    id='quantity'
                                    name='quantity'
                                    type='number'
                                    value={quantityItems}
                                    readOnly={true}
                                    className='mx-3 block w-[40px] text-center rounded-lg  border border-solid border-black py-2 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500'
                                  />
                                  <button type='button' onClick={addItem} className='text-[20px] font-semibold shadow-md bg-[#2E68FF] text-white   w-[40px] h-[40px] rounded-lg'>+</button>

                            </div>
                      </div>
                  </div>


                  {/**Column Two */}
                  <div className='h-full w-[50%]'>
                        <div className='flex flex-col w-full h-[50%]'>
                            <h2 className=' w-full h-fit font-semibold text-[18px] py-2 px-2'>Variantes</h2>
                            <div className='overflow-y-scroll flex flex-grow flex-col  pl-2'>
                                {
                                  variationsFilter.map((item)=>(
                                    <div key={item.id} className='w-full'>
                                          <div className='flex flex-row justify-start mb-4'>
                                                  <input
                                                    id='variationId'
                                                    name='variationId'
                                                    type='radio'
                                                    value={item.id}
                                                    checked={boxChange === item.id}
                                                    onClick={()=>{handleChangeBoxChange(item.id)}}
                                                    placeholder='Ingrese una categoria'
                                                    {...register('variationId',{
                                                      required:true,
                                                    })}
                                                  />

                                                  <label
                                                    className='ml-2 block text-sm font-medium leading-6 text-gray-900'
                                                  >
                                                    {item.name}
                                                  </label>

                                                  <label
                                                    className='ml-2 block text-sm font-medium leading-6 text-gray-900'
                                                  >
                                                    Q{parseFloat(item.price).toFixed(2)}
                                                  </label>
                                            
                                          </div>
                                    </div>
                                  
                                  ))
                                }
                            </div>
                            {errors.variationId?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Seleccione una opción.</p>}
                        </div>
                        <div className='flex flex-col justify-between h-[50%] w-full '>
                          

                            <div className='w-full'>
                            <div>
                              <label
                                
                                className='block text-sm font-medium leading-6 text-gray-900'
                              >
                                Nota
                              </label>
                              <div className='mt-2'>
                                <input
                                  id='note'
                                  name='note'
                                  type='text'
                              
                                  placeholder='Ingrese una nota'
                                  {...register('note',{
                                    required:false,
                                  })}
                                  className='pl-2 h-[46px] block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                                />
                              
                              </div>
                            </div>
                            </div>  
                            
                            
                            <button
                              type='submit'
                              disabled={variationsFilter.length === 0 ? true : false}
                              className={`${variationsFilter.length === 0 ? 'bg-gray-300 text-white hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-500'} w-full flex  h-[46px] p-3  justify-center rounded-md text-[18px] font-semibold leading-6 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                            >
                              {variationsFilter.length === 0 ? 'N/A' : 'Confirmar'}
                            </button>



                        
                        </div>
                  </div>
          
              </form>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>

    </Dialog>
    </Transition.Root>
  )
}

export default AddProduct