"use client"
import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';

function PasswordForm() {

    const {register, formState:{errors}, handleSubmit, reset} = useForm();

    //COOKIE ID USER
    const [idUser, setIdUser] = useState(null);
    const fetchCookie = async (obj = {}) => {
            try {
            const url = '/api/userloged';
            const response = await APIUtility.postData(url, obj);
            console.log('Datos recibidos:', response);
            setIdUser(response.response.id);
            } 
            catch (error) {
            console.error('Error en la petición:', error.message);
            }
    };

   const onSubmit = (data) =>{
       console.log(data);
       update(data, idUser);
   }

   const [actualPasswordValidation, setActualPasswordValidation] = useState(true);
   const [newPasswordValidation, setNewPasswordValidation] = useState(true);
   

   const update = async (data, id) => {
       try {
         
         const url = `/api/user/password/${id}`;
         const response = await APIUtility.putData(url, data);
         console.log('Datos actualizados:', response);
         setNewPasswordValidation(response.newPassword);
         setActualPasswordValidation(response.actualPassword);

         if(response.actualPassword === true && response.newPassword === true){
            reset();
         }
        
       } catch (error) {
         console.error('Error en la petición:', error.message);
        
       }
   };

   useEffect(()=>{
    fetchCookie();
   }, [])

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
                                className={`${actualPasswordValidation === false ? 'border-2 border-solid border-red-600' : 'border border-solid border-black'} pl-2 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6`}
                            />
                            </div>
                            <p className={`${actualPasswordValidation === false ? 'text-red-600 font-semibold text-[12px]' : 'hidden'} `}>Contraseña Incorrecta</p>
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
                        
                                className={`${newPasswordValidation === false ? 'border-2 border-solid border-red-600' : 'border border-solid border-black'} pl-2 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6`}
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
                        
                                className={`${newPasswordValidation === false ? 'border-2 border-solid border-red-600' : 'border border-solid border-black'} pl-2 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6`}
                            />
                            </div>
                        </div>
                    </div>
                    <p className={`${newPasswordValidation === false ? 'text-red-600 font-semibold text-[12px]' : 'hidden'} `}>Las contraseñas no coinciden.</p>
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