'use client'
import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import CartOfPayments from '@/components/CartOfPayments';
import { useForm } from 'react-hook-form';


function PaymentOrder({params}) {

  //USE FORM
  const {register, formState:{errors}, handleSubmit, reset} = useForm();

  const  onSubmit = async (data) =>{
        console.log(data);
  }

  //GET ID
  const {id} = params;

  //UPDATE THE STATE OF COMPONENT CARTOFORDERS.JS
  const [update, setUpdate] = useState(false);
  const changeState = () =>{
    setUpdate(!update);
  }

  //CART LOGIC OPEN
  const [isCartOpen, setIsCartOpen] = useState(true);

  //DISCOUNT ACTIVATE
  const [categoryActive, setCategoryActive] = useState("Todos");
  const handleCategoryClick = (value) => {
    if (value === categoryActive) {
      return;
    }
    setCategoryActive(value);
  };

  ///GET DATA
  const [discounts, setDiscounts] = useState([]);
  const getDiscounts = async () => {
    try {
      const discountsList = await APIUtility.fetchData(`http://localhost:3000/api/discounts`);
      setDiscounts(discountsList.response);
      console.log(discountsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

 
  const[orderDetails, setOrderDetails] = useState([]);
  const getOrderDetails = async () => {
    try {
      const ordersList = await APIUtility.fetchData(`http://localhost:3000/api/order/${id}`);
      setOrderDetails(ordersList.response);
      console.log(ordersList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //MODAL LOGIC
  const [isModalOpen, setIsModalOpen] =  useState(false);
  const [dataModal, setDataModal] = useState({});

  const openModal = () =>{
      setIsModalOpen(true);
  }

  const closeModal = () =>{
    setIsModalOpen(false);
  }


  //USE EFFECTS
  useEffect(()=>{
    getDiscounts();
    getOrderDetails();
  }, []);

  useEffect(()=>{
    
  }, [update]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsCartOpen(window.innerWidth < 821 ? false : true);
    }
  }, []);



  return (
    <div className='Container relative z-10  w-full h-full flex flex-row'>
          
          <section className={`Section pl-10 md:px-5  px-5  pt-12 md:pt-6 h-full w-[90%] ${isCartOpen ? 'md:w-[50%]' : 'md:w-[95%]'}  lg:w-[65%] xl:w-[70%] flex flex-col `}>
              
              <div className=' w-full flex flex-col items-center  flex-grow'>

                    <form onSubmit={handleSubmit(onSubmit)} className='w-full lg:w-[75%] h-full flex flex-col justify-between '>

                          <div className='w-full h-[35%] flex flex-col justify-end'>
                              {/**Input*/}
                              <div className='w-full  flex flex-col justify-center items-center'>
                                  
                                          <div className='w-full'>
                                            <div>
                                                <label className="text-[20px] font-semibold text-gray-900">
                                                  Ingresar Pago
                                                </label>
                                                <div className="relative mt-2 rounded-md shadow-sm">
                                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                      <span className="text-gray-500 sm:text-sm">$</span>
                                                    </div>

                                                    <input
                                                      type="text"
                                                      name="price"
                                                      id="price"
                                                      className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                      placeholder="0.00"
                                                      {...register('price',{
                                                        required:true,
                                                      })}
                                                    />

                                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                                      <label  className="sr-only">
                                                        Currency
                                                      </label>
                                                      <select
                                                        {...register('method',{
                                                          required:false
                                                        })}
                                                        defaultValue='Efectivo'
                                                        id="method"
                                                        name="method"
                                                        className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                      >
                                                        <option value='Efectivo'>Efectivo</option>
                                                        <option value='Cheque'>Cheque</option>
                                                      </select>
                                                    </div>
                                                </div>
                                            </div>
                                          </div>
                                          {errors.price?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Ingrese la cantidad a pagar.</p>}
                                        
                              </div>
                              {/**Descuentos*/}
                              <div className='mt-6 w-full flex flex-col justify-center '>
                                  {/**FIELDSET */}
                                  <div
                                    className={`w-full flex flex-row overflow-hidden dark:text-[#889898] text-[#3A3D31] items-center text-lg `}
                                  >
                                      <hr className='w-full block mr-2  dark:border-[#889898] border-[#3A3D31]'></hr>
                                      <p className={`min-w-fit`}>
                                        Descuentos
                                      </p>
                                  </div>
                                  {/**SELECCION DE DESCUENTOS */}
                                  <div className='min-h-[70px] max-w-full my-3 overflow-hidden '>
                                      <div className='flex flex-row justify-center items-center w-full h-full overflow-x-scroll '>
                                              {
                                                discounts.map((discount)=>(
                                                  <button key={discount.id} onClick={()=>{
                                                    console.log('Hola mundo');
                                                  }} className={`rounded-lg w-fit font-medium bg-white hover:bg-[#4D81F1] hover:text-white text-black h-[90%] md:min-h-[60%] lg:h-[60%] px-3 mr-3 border border-solid border-gray-300`}>
                                                          {discount.import_quantity} <label>{discount.type === 'Porcentaje' ? '%' : '$'}</label> 
                                                  </button>
                                                ))  
                                              }
                                      </div>
                                  </div>
                              </div>
                          </div>

                          {/**Boton Add payment*/}
                          <div className='w-full h-[15%] flex flex-row justify-between items-center '>
                                <button
                                  type='button'
                                  className='w-[48%]  flex  h-[46px] p-3  justify-center rounded-md bg-red-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                  >
                                   Cancelar
                                </button>
                                <button
                                type='submit'
                                className='w-[48%]  flex  h-[46px] p-3  justify-center rounded-md bg-blue-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                >
                                Agregar Pago
                              </button>
                          </div>

                    </form>
              </div>
          </section>

          {/*<CartOfOrders orderDetails={orderDetails} changeState={changeState} update={update} orderId={id} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>*/}

         <CartOfPayments isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>

    </div>
  )
}

export default PaymentOrder