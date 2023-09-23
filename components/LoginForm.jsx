'use client'

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';
import {useRouter} from 'next/navigation'

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const router = useRouter();

  

  const [validationCredentials, setValidationCredentials] = useState(false);

  const onSubmit = (data) => {
    createSesion(data); 
  };

  const createSesion = async (obj) => {
    try {
      const url = '/api/login';
      const response = await APIUtility.postData(url, obj);
      console.log('Datos recibidos:', response);

      if(response.status === 401){
          setValidationCredentials(true);
      }else{
        router.push('/dashboard/order');
      }
      
    } 
    catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full '>

      <p className={`${validationCredentials ? 'mb-6 text-center text-[14px] text-red-500 font-semibold' : 'hidden'} `}>El email o la contraseña son incorrectos.</p>
      <div>
        <label className='block text-sm font-medium leading-6 text-gray-900'>
         Correo Electronico
        </label>
        <div className='mt-2'>
          <input
            {...register('user', {
              required: true,
            })}
            id='user'
            name='user'
            type='email'
            placeholder='Ingrese su nombre de usuario'
            className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm   placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
          />
        </div>
        {errors.user?.type === 'required' && (
          <p className='text-[12px] font-semibold text-red-500'>
            Su nombre de usuario es requerido.
          </p>
        )}
      </div>

      <div className='mt-3'>
        <div className='flex items-center justify-between'>
          <label className='block text-sm font-medium leading-6 text-gray-900'>
            Password
          </label>
        </div>
        <div className='mt-2'>
          <input
            {...register('password', {
              required: true,
            })}
            id='password'
            name='password'
            type='password'
            placeholder='Ingrese su contraseña'
            className='pl-3 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
          />
        </div>
        {errors.password?.type === 'required' && (
            <p className='text-[12px] font-semibold text-red-500'>
              Su password es requerido.
            </p>
          )}
      </div>

      <div className='mt-6'>
        <button
          type='submit'
          className='flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        >
          Iniciar
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
