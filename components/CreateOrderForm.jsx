"use client"
import React from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';
import { Fragment, useRef} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useRouter } from 'next/navigation';




function CreateOrderForm({isModalOpen, closeModal, idUser=1}) {

  const router = useRouter();
  const cancelButtonRef = useRef(null);
  const {register, formState:{errors}, handleSubmit, reset} = useForm();

  const  onSubmit = async (data) =>{
      //console.log(data);
      create(data);
  }

  const create = async (obj) => {
    try {
      const data = {
        type_order: obj.type_order,
        description:obj.description,
        idUser:idUser
      }
      console.log(data);
      const url = '/api/order';
      const response = await APIUtility.postData(url, data);
      console.log('Datos recibidos:', response);
      router.push(`/dashboard/order/${response.response.rows[0].id}`);
    } 
    catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  

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
            <Dialog.Panel className='p-8 h-[400px] w-[80%] md:w-[50%] lg:w-[40%] xl:w-[35%] relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all'>
              
              <form onSubmit={handleSubmit(onSubmit)} className=' h-full w-full flex flex-col justify-between'>
                      
              
                          <h2 className='text-[24px] font-semibold w-full text-center'>Nueva Orden</h2>
          
                          <div className='mt-6'>
                              <div className=" w-full">
                                  <label className="block text-sm font-medium leading-6 text-gray-900">
                                      Seleccione el tipo de orden
                                  </label>
                                  <div className="mt-2">
                                      <select
                                      id="type"
                                      name="type"
                                      {...register('type_order',{
                                          required:true
                                      })}
                                      autoFocus={true}
                                      defaultValue={''}
                                      className="pl-2 block w-full h-[38px] rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                                      >
                                      
                                      <option value='' disabled>Seleccione una opcion...</option>
                                      <option value='togo'>Para llevar</option>
                                      <option value='restaurant'>Restaurante</option>
                                      <option value='delivery'>Delivery</option>
                                      </select>
                                  </div>
                                  {errors.type_order?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Debe seleccionar un tipo de orden.</p>}
                              </div>
              
                              <div className='mt-3 w-full'>
                                      <div>
                                          <label
                                          className='block text-sm font-medium leading-6 text-gray-900'
                                          >
                                          Descripción
                                          </label>
                                          <div className='mt-2'>
                                          <input
                                              id='description'
                                              name='description'
                                              type='text'
                                              
                                              placeholder='Ingrese un nombre o numero de mesa'
                                              {...register('description',{
                                              required:true
                                              })}
                                              className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                                          />
                                          {errors.description?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Debe ingresar un nombre o un numero de mesa.</p>}
                                          </div>
                                      </div>
                              </div>
                          </div>
              
                          <button
                              type='submit'
                              className='mt-3  w-full flex  h-[42px] py-2.5  justify-center rounded-md bg-blue-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'>
                                    Confirmar
                          </button>
          
              </form>

            </Dialog.Panel>
          </Transition.Child>
        </div>
      </div>

    </Dialog>
    </Transition.Root>
    
  )
}

export default CreateOrderForm



