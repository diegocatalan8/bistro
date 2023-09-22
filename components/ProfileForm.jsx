"use client"
import React, {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';


function ProfileForm() {

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
        reset();
    }

    const update = async (data, id) => {
        try {
          
          const url = `/api/user/profile/${id}`;
          const response = await APIUtility.putData(url, data);
          console.log('Datos actualizados:', response);
         
        } catch (error) {
          console.error('Error en la petición:', error.message);
         
        }
    };


  useEffect(() => {
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
                             Nombre
                            </label>
                            <div className='mt-2'>
                            <input
                                id='name'
                                name='name'
                                type='text'
                                placeholder='John'
                                {...register('name',{
                                required:true
                                })}
                        
                                className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-3'>
                        <div>
                            <label
                            
                            className='block text-sm font-medium leading-6 text-gray-900'
                            >
                            Apellido
                            </label>
                            <div className='mt-2'>
                            <input
                                id='lastname'
                                name='lastname'
                                type='text'
                                placeholder='Ingrese un apellido'
                                {...register('lastname',{
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
                            Email
                            </label>
                            <div className='mt-2'>
                            <input
                                id='email'
                                name='email'
                                type='email'
                                placeholder='Ingrese un correo electronico'
                                {...register('email',{
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

export default ProfileForm