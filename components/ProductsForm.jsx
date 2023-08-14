"use client"

import React from 'react'
import { useForm } from 'react-hook-form';
import { TEInput } from "tw-elements-react";
import Button from './Button';

function ProductsForm() {

    const {register, formState:{errors}, handleSubmit} = useForm();

    const onSubmit = (data) =>{
        console.log(data);
    }

  return (
    <div className='flex flex-col h-full w-full  p-6'>
        <h2 className='text-[22px] font-semibold w-full'>Crear Articulo</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between w-full  grow'>

        <div className='flex flex-col w-full justify-between'>
            <section className='flex flex-col justify-between mt-6'>

                <div className='flex flex-row w-full justify-between'>
                    <div className="relative w-[45%]">
                        <TEInput
                        type="text"
                        id="name"
                        label="Nombre del articulo"
                        size="lg"
                        {...register('name', {
                            required:true,
                            
                        })}
                        ></TEInput>
                        {errors.name?.type === 'required' && <p className='text-red-500 font-semibold'>Debe ingresar el nombre del articulo.</p>}
                    </div>

                    <div className="relative w-[53%]">
                        <TEInput
                        type="text"
                        id="description"
                        label="Descripción"
                        size="lg"
                        {...register('description', {
                            required:true,
                        })}
                        ></TEInput>
                        {errors.description?.type === 'required' && <p className='text-red-500 font-semibold'>Debe ingresar la descripción del articulo.</p>}
                    </div>
                </div>

                <div className='flex flex-col h-fit  w-full mt-6'>
                        <label
                            htmlFor="formFile"
                            className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                        >
                        Seleccionar imagen
                        </label>
                        <input
                        className="relative m-0  block w-full min-w-0 flex-auto cursor-pointer rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] font-normal leading-[2.15] text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:cursor-pointer file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                        id="formFileLg"
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        />
                   
                </div>
                
            </section>

            <section className='flex flex-col w-full mt-6'>
                <label className="text-[#737373]" for="mySelect">Selecciona un grupo de opciones:</label>
                <div className="relative w-full  ">
                <select
                defaultValue=""
                className = "w-full h-[43px] px-4 rounded-md text-black border-[#d4d4d4] border border-solid"
                id="groupOptions"
                {...register('groupOptions', {
                    required:true,
                })}
                >
                <option value="" disabled >
                    Selecciona grupo de opciones...
                </option>
                <option value="option1">Opción 1</option>
                <option value="option2">Opción 2</option>
                <option value="option3">Opción 3</option>
                                
                </select>
                {errors.groupOptions?.type === 'required' && <p className='text-red-500 font-semibold'>Debe seleccionar un grupo de opciones.</p>}
                </div>
            </section>

            <section className='flex flex-col lg:flex-row w-full mt-6'>
                    <div className='relative w-full'>
                        <label className="text-[#737373]" for="mySelect">Selecciona una categoria:</label>
                        <div className="w-full">
                            <select
                            defaultValue=""
                            className = "w-full h-[43px] px-4 rounded-md text-black border-[#d4d4d4] border border-solid"
                            id="category"
                            {...register('category', {
                                required:true,
                            })}
                            >
                            <option value="" disabled>
                                Selecciona una categoria...
                            </option>
                            <option value="option1">Opción 1</option>
                            <option value="option2">Opción 2</option>
                            <option value="option3">Opción 3</option>
                                            
                            </select>
                            {errors.category?.type === 'required' && <p className='text-red-500 font-semibold'>Debe seleccionar una categoria.</p>}
                        </div>
                    </div>

                    <div className='mt-6 w-full flex justify-start items-center'>
                        <input
                        className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault" 
                        {...register('activo')}
                        />
                        <label
                            className="inline-block pl-[0.15rem] hover:cursor-pointer"
                            htmlFor="flexSwitchCheckDefault"
                        >Activo</label>
                    </div>
            </section>
        </div>


        <div className='flex flex-row h-[50px] justify-end'>
                <Button 
                type="button"
                text="Cancelar"
                color="bg-danger"
                classProp='rounded-lg font-semibold text-[22px] mr-4'
                />

                <Button 
                type="submit"
                text="Confirmar"
                color="bg-primary"
                classProp='rounded-lg font-semibold text-[22px]'
                />
        </div>
        </form>
    </div>
  )
}

export default ProductsForm