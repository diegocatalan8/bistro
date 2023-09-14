"use client"

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import APIUtility from '@/services/ApiUtility';


function ProductsForm({httpMethod ={post:true, put:false}, routeName, pushTo, idUser=1, dataToEdit}) {
    
    console.log(dataToEdit);
    const [categories, setCategories] = useState([]);
    
    const {register, reset, formState:{errors}, handleSubmit, watch} = useForm();

    const [imageUrl, setImageUrl] = useState(null);

    const [imageObj, setImageObj] = useState(null);

    const watchFile = watch(["image"]);
    console.log(watchFile);
    
    const previewImage = (file) => {
      
      if (file[0] && file[0][0]) {

        const image = file[0][0]

        if ( image == imageObj) {
          return
        }

        setImageObj(image)  
        const url = URL.createObjectURL(image);
        console.log(url)
        setImageUrl(url)
      }
    }

    previewImage(watchFile);

    const  onSubmit = async  (data) =>{ 
      console.log(data);
      if(httpMethod.post){
        //Ejecuta un insert
        create(data);
        setImageUrl(null);
        reset();
      }
      else if(httpMethod.put){
        //Ejecuta un update
        await update(data);
        pushTo(routeName);
      }
    }

    const create = async (data) => {

      try {

        const structure = new FormData();

        structure.append('name', data.name);
        structure.append('description', data.description);
        structure.append('imageName', data.image[0]);
        structure.append('category', data.category);
        structure.append('idUser', idUser);
        
        const url = 'http://localhost:3000/api/items';
        const response = await APIUtility.postData(url, structure);
        console.log('Datos recibidos:', response);
      } 
      catch (error) {
        console.error('Error en la petición:', error.message);
      }
    };

    const update = async (obj) => {
      try {

        const dataUpdate = new FormData();
          
        dataUpdate.append('name', obj.name);
        dataUpdate.append('description', obj.description);
        dataUpdate.append('imageName', obj.image[0]);
        dataUpdate.append('category', obj.category);
        dataUpdate.append('active', obj.active);
        dataUpdate.append('modified_by', idUser);

        const url = `http://localhost:3000/api/items/${dataToEdit.id}`;
        const response = await APIUtility.putData(url, dataUpdate);
        console.log('Datos actualizados:', response);
        
      } catch (error) {
        console.error('Error en la petición:', error.message);
        
      }
    };

    const getCategories = async () => {
      try {
        const categories = await APIUtility.fetchData(`http://localhost:3000/api/category`);
        setCategories(categories.response);
      } catch (error) {
        console.error('Error');
      } finally {
        //do nothing
      }
    };

    

    useEffect(()=>{
      getCategories();
      if(dataToEdit) setImageUrl(dataToEdit.image);
    }, [])
  



  return (
    <div className='flex flex-col h-full w-full  p-6'>
        <h2 className='text-[22px] font-semibold w-full mb-6'>Articulo</h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col justify-between w-full  grow'>
            <div>
                <div className='flex flex-row justify-between'>
                    <div className='w-[48%] flex flex-col'>
                        <div>
                          <label
                          
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Nombre
                          </label>
                          <div className='mt-2'>
                            <input
                              {...register('name',{
                                required:true
                              })}
                              id='name'
                              name='name'
                              type='text'
                              placeholder='Hamburguesa'
                              autoFocus={true}
                              defaultValue={dataToEdit !== undefined ? dataToEdit.name : ''}
                              className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                          </div>
                          {errors.name?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Ingrese el nombre del producto.</p>}
                        </div>

                        <div className='mt-3'>
                          <label
                          
                            className='block text-sm font-medium leading-6 text-gray-900'
                          >
                            Descripción
                          </label>
                          <div className='mt-2'>
                            <input
                            {...register('description',{
                              required:true
                            })}
                              id='description'
                              name='description'
                              placeholder='Deliciosa hamburguesa casera.'
                              type='text'
                              defaultValue={dataToEdit !== undefined ? dataToEdit.description : ''}
                              className='pl-2 block w-full rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                            />
                          </div>
                          {errors.description?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Ingrese una descripcion del producto.</p>}
                        </div>
                    </div>

                    <div className="w-[48%]  lg:px-4 flex flex-col">
                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                          Imagen
                        </label>
                        
                        <div className="mt-2 h-[120px] flex justify-center rounded-lg border border-dashed border-black px-3 py-10">
                          <div className="flex flex-col justify-center items-center">
                          
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            {errors.image?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Imagen Requerida.</p>}
                              <label
                                className="relative flex items-center flex-col cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                              >
                                <span>Subir imagen</span>
                                <input 
                                {...register('image',{
                                  required:imageUrl ? false : true
                                })}
                                
                                type="file" className="sr-only" accept="image/*" name="image"/>
                                <div>
                                  {imageUrl ? <img className='rounded-md h-[70px]' src={imageUrl} alt="preview" /> : null}
                                </div>
                              </label>
                              
                            </div>
                              
                          </div>
                        </div>
                    </div>
                    
                </div>
                
                <div className="mt-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Seleciona una categoria
                    </label>
                    <div className="mt-2">
                      <select
                        {...register('category',{
                          required:httpMethod.post
                        })}
                        
                        id="category"
                        name="category"
                        defaultValue={dataToEdit?.category_id || ''}
                        className="pl-2 block w-full h-[40px] rounded-md border border-solid border-black py-1.5 text-gray-900 shadow-sm  focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      >
                        {httpMethod.put && <option value={dataToEdit.category_id} disabled>{dataToEdit.category+" "+"(Valor actual)"} </option>}
                        {httpMethod.post && <option value='' disabled>Seleccione una opcion...</option>}
                        {categories.map((option)=>(
                            <option key={option.id} value={option.id} >{option.name}</option>
                        ))}
                      </select>
                    </div>
                    {errors.category?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Seleccione una categoria.</p>}
                </div>

                <div className={`${httpMethod.post ? 'hidden':''} w-full  flex flex-col mt-3 `}>
          
                  <label className='relative inline-flex items-center cursor-pointer'>
                      <input
                        
                        type='checkbox'
                        value=''
                        className='sr-only peer'
                        defaultChecked={dataToEdit !== undefined ? dataToEdit.status : true}
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

export default ProductsForm