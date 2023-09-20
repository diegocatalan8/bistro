"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';

function DiscountForm({httpMethod={post:true, put:false}, routeName, pushTo, dataToEdit}) {

  const {register, formState:{errors}, handleSubmit, reset} = useForm();


  const  onSubmit = async (data) =>{

      console.log(data);

      if(httpMethod.post){
        //Ejecuta un insert
        create(data);
        reset();
      }
      else if(httpMethod.put){
        //Ejecuta un update
        await update(data);
        pushTo(routeName);
      }
  }

  const create = async (obj) => {
    console.log('Entro');
    try {
      const url = '/api/discounts';
      const response = await APIUtility.postData(url, obj);
      console.log('Datos recibidos:', response);
    } 
    catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  const update = async (obj) => {
    try {
      const url = `/api/discounts/${dataToEdit.id}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
      
    }
  };



  return (
    <div className='flex flex-col h-full w-full  p-6'>
        <h2 className='text-[22px] font-semibold w-full mb-6'>Descuentos</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between w-full  grow'>
              
              <div>
                <div className='w-full'>
                      <div>
                        <label
                         
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Nombre
                        </label>
                        <div className='mt-2'>
                          <input
                            id='name'
                            name='name'
                            type='text'
                            autoFocus={true}
                            placeholder='Ingrese el nombre del descuento'
                            defaultValue={dataToEdit !== undefined ? dataToEdit.name : ''}
                            {...register('name',{
                              required:true
                            })}
                            className='pl-3 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                          />
                          {errors.name?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Debe ingresar un nombre.</p>}
                        </div>
                      </div>
                </div>

                <div className='w-full mt-3'>
                      <div>
                        <label
                          
                          className='block text-sm font-medium leading-6 text-gray-900'
                        >
                          Importe
                        </label>
                        <div className='mt-2'>
                          <input
                            id='import'
                            name='import'
                            type='number'
                            placeholder='Ingrese una cantidad'
                            defaultValue={dataToEdit !== undefined ? dataToEdit.import_quantity : ''}
                            {...register('import_quantity',{
                              required:true
                            })}
                      
                            className='pl-3 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                          />
                          {errors.import_quantity?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Debe ingresar una cantidad.</p>}
                        </div>
                      </div>
                </div>

                <div className="mt-3">
                  <label className="block text-sm font-medium leading-6 text-gray-900">
                    Seleccione tipo de importe
                  </label>
                  <div className="mt-2">
                    <select
                      id="type"
                      name="type"
                      {...register('type_import',{
                        required:httpMethod.post
                      })}
                      defaultValue={dataToEdit?.type || ''}
                      className="pl-2 block w-full h-[40px] rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    >
                      {httpMethod.put && <option value={dataToEdit.type} disabled>{dataToEdit.type+" "+"(Valor actual)"} </option>}
                      {httpMethod.post && <option value='' disabled>Seleccione una opcion...</option>}
                      <option value='Importe'>Importe</option>
                      <option value='Porcentaje'>Porcentaje</option>
                    </select>
                  </div>
                  {errors.type_import?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Debe seleccionar un tipo de importe.</p>}
                </div>
            
                <div className={`${httpMethod.post ? 'hidden' : ''} w-full  flex flex-col mt-3 `}>
            
                    <label className='relative inline-flex items-center cursor-pointer'>
                        <input
                        defaultChecked={dataToEdit !== undefined ? dataToEdit.status : true}
                        type='checkbox'
                        value=''
                        className='sr-only peer'
                        {...register('active',{
                          required:false
                        })}
                        
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-md peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-md after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                        <span className='ml-3 py-1 text-sm font-medium text-gray-900 dark:text-gray-300'>
                        Activo
                        </span>
                        
                    </label>

                    
                </div>
              </div>

              <div className='w-full h-fit mt-3 flex flex-row justify-end'>

                    <button
                      onClick ={(e)=>{
                        e.preventDefault();
                        pushTo(routeName);
                      }}
                      type='button'
                      className='mr-3 w-[48%] lg:w-[150px] flex  h-[46px] p-3  justify-center rounded-md bg-red-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                    >
                      Cancelar
                    </button>
                
                    <button
                      type='submit'
                      className='w-[48%] lg:w-[150px] flex  h-[46px] p-3  justify-center rounded-md bg-blue-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                    >
                      Confirmar
                    </button>
         
              </div>

        </form>
    </div>
  )
}

export default DiscountForm