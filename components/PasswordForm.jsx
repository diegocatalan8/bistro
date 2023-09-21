"use client"
import React from 'react'
import { useForm } from 'react-hook-form';

function PasswordForm() {

    const {register, formState:{errors}, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between w-full grow lg:w-[50%] p-6 h-fit'>
                
                <div>
                    <div className='w-full'>
                        <div>
                            <label
                            
                            className='block text-sm font-medium leading-6 text-gray-900'
                            >
                            Password Actual
                            </label>
                            <div className='mt-2'>
                            <input
                                id='password'
                                name='password'
                                type='password'
                                placeholder='**************'
                                {...register('actualPassword',{
                                required:true
                                })}
                                className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-3'>
                        <div>
                            <label
                            
                            className='block text-sm font-medium leading-6 text-gray-900'
                            >
                            Password Nuevo
                            </label>
                            <div className='mt-2'>
                            <input
                                id='newPassword'
                                name='newPassword'
                                type='password'
                                placeholder='**************'
                                {...register('newPassword',{
                                required:true
                                })}
                        
                                className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-3'>
                        <div>
                            <label
                            
                            className='block text-sm font-medium leading-6 text-gray-900'
                            >
                            Password Confirmación
                            </label>
                            <div className='mt-2'>
                            <input
                                id='confirmationPassword'
                                name='confirmationPassword'
                                type='password'
                                placeholder='**************'
                                {...register('confirmationPassword',{
                                required:true
                                })}
                        
                                className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                            </div>
                        </div>
                    </div>

                </div>

                <div className='w-full h-fit mt-6 flex flex-row justify-end'>
                        <button
                        type='submit'
                        className='w-[48%] lg:w-[150px] flex  h-[46px] p-3  justify-center rounded-md bg-blue-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                        >
                        Actualizar
                        </button>
                </div>

    </form>
  )
}

export default PasswordForm