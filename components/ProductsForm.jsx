"use client"

import React from 'react'
import { useForm } from 'react-hook-form';



function ProductsForm() {

    const {register, formState:{errors}, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

  return (
    <div className='flex flex-col h-full w-full  p-6'>
        <h2 className='text-[22px] font-semibold w-full mb-6'>Crear Articulo</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-start w-full  grow'>
              <div className='flex flex-row justify-between'>
                  <div className='w-[48%] flex flex-col'>
                      <div>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Email address
                        </label>
                        <div className='mt-2'>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>

                      <div className='mt-3'>
                        <label
                          htmlFor='email'
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Email address
                        </label>
                        <div className='mt-2'>
                          <input
                            id='email'
                            name='email'
                            type='email'
                            autoComplete='email'
                            required
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>
                  </div>

                  <div className="w-[48%]  lg:px-4 flex flex-col">
                      <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover photo
                      </label>
                      
                      <div className="mt-2 h-[120px] flex justify-center rounded-lg border border-dashed border-gray-900/25 px-3 py-10">
                        <div className="flex flex-col justify-center items-center">
                        
                          <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                              <span>Upload a image</span>
                              <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                            </label>
                            
                          </div>
                          
                        </div>
                      </div>
                  </div>
              </div>

              <div className='mt-3'>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium leading-6 text-gray-900'
                >
                  Email address
                </label>
                <div className='mt-2'>
                  <input
                    id='email'
                    name='email'
                    type='email'
                    autoComplete='email'
                    required
                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                  />
                </div>
              </div>

              <div className="mt-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              </div>

              <div className="mt-3">
              <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                Country
              </label>
              <div className="mt-2">
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-full h-[40px] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                >
                  <option>United States</option>
                  <option>Canada</option>
                  <option>Mexico</option>
                </select>
              </div>
              </div>

              <div className={`w-full  flex flex-col mt-3 `}>
        
                <label className='relative inline-flex items-center cursor-pointer'>
                    <input
                      
                      type='checkbox'
                      value=''
                      className='sr-only peer'
                      
                      
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-md peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    <span className='ml-3 py-1 text-sm font-medium text-gray-900 dark:text-gray-300'>
                      Activo
                    </span>
                    
                </label>

                  
              </div>

             
       

      
        </form>
    </div>
  )
}

export default ProductsForm