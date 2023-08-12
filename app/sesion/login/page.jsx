"use client"

import Button from '@/components/Button';
import { useForm } from 'react-hook-form';
import { TEInput } from "tw-elements-react";


export default function Login() {
  
    const {register, formState:{errors}, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

    return (
        <div className='flex flex-col flex-grow  justify-center items-center'>

            {errors.email?.type === 'pattern' && <p className=' text-red-500 font-semibold'>Error en el email o contraseña.</p>}
            <section className='mt-6 h-fit w-[75%] md:w-[60%] lg:w-[30%]'>
                  
                  <h2 className='text-4xl font-medium leading-tight w-full'>Ingresar</h2>
                  <form onSubmit={handleSubmit(onSubmit)}>
                      
                      <div className="relative w-full mt-6">
                        <TEInput
                          type="text"
                          id="email"
                          label="Ingrese su correo electronico"
                          size="lg"
                          {...register('email', {
                            required:true,
                            pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          })}
                        ></TEInput>
                        {errors.email?.type === 'required' && <p className='text-red-500 font-semibold'>El campo es requerido.</p>}
                        
                      </div>

                      <div className="relative w-full mt-6">
                        <TEInput
                          type="password"
                          id="password"
                          label="Ingrese su correo electronico"
                          size="lg"
                          {...register('password', {
                            required:true,
                          })}
                        ></TEInput>
                        {errors.password?.type === 'required' && <p className='text-red-500 font-semibold'>El campo es requerido.</p>}
                      </div>


                    <p className='w-full text-primary font-semibold mt-6'><a href='#'>¿Olvidaste tu contraseña?</a></p>
                    <Button type='submit' text='Iniciar Sesión' color='bg-primary' classProp='mt-6 h-[46px] font-semibold'/>
                  </form>
                  
            </section>
        </div>
    )
  }
  