'use client'
import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import CartOfPayments from '@/components/CartOfPayments';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import LoadingPage from '@/components/LoadingPage';


function PaymentOrder({params, idUser=1}) {

  //Router
  const router = useRouter();

  //USE FORM
  const {register, formState:{errors}, handleSubmit, reset} = useForm();

  //GET ID
  const {id} = params;

  //LOADING VALIDATION
  const [loading, setLoading] = useState(true);

  //CREATE PAYMENT
  const createPayment = async (obj) => {
    const structure = {
      amount: obj.amount,
      method: obj.method, 
      idUser: idUser, 
      idOrder: id
    }
    try {
      const url = 'http://localhost:3000/api/payments';
      const response = await APIUtility.postData(url, structure);
      console.log('Datos recibidos:', response);
      changeState();
    } 
    catch (error) {
      console.error('Error en la petición:', error.message);
    }
  };

  //UPDATE THE STATE OF COMPONENT CARTOFORDERS.JS
  const [update, setUpdate] = useState(false);
  const changeState = () =>{
    setUpdate(!update);
  }

  //CART LOGIC OPEN
  const [isCartOpen, setIsCartOpen] = useState(true);

  //GET DATA
  const [payments, setPayments] = useState([]);
  const getPayments = async () => {
    try {
      const paymentsList = await APIUtility.fetchData(`http://localhost:3000/api/payments/${id}`);
      setPayments(paymentsList.response);
      console.log(paymentsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const productsList = await APIUtility.fetchData(`http://localhost:3000/api/cart/${id}`);
      setProducts(productsList.response);
      console.log(productsList.response);
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

  //CALCULATE REST PAYMENT
  let totalToPay = products[0]?.sum_total;
  let totalPaid = payments[0]?.sum_payments;
  let debt = payments.length > 0 ? totalToPay - totalPaid : totalToPay;
 
  //ONSUBMIT
  const  onSubmit = async (data) =>{  
     console.log(data); 
     reset();
     createPayment(data);
   }
  
  
  //USE EFFECTS
  useEffect(()=>{
     getPayments();
     getOrderDetails();
     setTimeout(() => {
        setLoading(false)
     }, 500);
  }, [update]);

  useEffect(()=>{
    getProducts();

    if (typeof window !== 'undefined') {
      setIsCartOpen(window.innerWidth < 821 ? false : true);
    }
  }, []);

  
  return loading ? (
      <LoadingPage/>
    ) : (
    <div className='Container relative z-10  w-full h-full flex flex-row'>
          
          <section className={`Section pl-10 md:px-5  px-5  pt-12 md:pt-6 h-full w-[90%] ${isCartOpen ? 'md:w-[50%]' : 'md:w-[95%]'}  lg:w-[65%] xl:w-[70%] flex flex-col `}>
              
              {orderDetails.payment_state ? (
                  <div className='w-full flex flex-col justify-center items-center flex-grow'>
                          <p className='text-center text-[40px] font-bold'>ORDEN PAGADA</p>
                          <p className='text-red-500 text-[35px] font-semibold'>CAMBIO Q{-debt}</p>
                          <button
                                      onClick={()=>{
                                        if(orderDetails.state === 'committed'){
                                          router.push(`/dashboard/order`)
                                        }else{
                                          router.push(`/dashboard/order/${id}`)
                                        }
                                        
                                      }}
                                      type='button'
                                      className='mt-6 w-[48%]  flex  h-[46px] p-3  justify-center rounded-md  border-2 border-solid border-red-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-red-600 bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600'
                                      >
                                      Volver
                          </button>
                  </div>
                ) : (
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
                                                          name="amount"
                                                          id="amount"
                                                          className="block w-full rounded-md border border-solid border-gray-400 py-1.5 pl-7 pr-20 text-gray-900  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                          placeholder="0.00"
                                                          {...register('amount',{
                                                            required:true,
                                                          })}
                                                        />

                                                        <div className="absolute inset-y-0 right-0 flex items-center">
                                                          <label  className="sr-only">
                                                            Method
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
                                                            <option value='cash'>Efectivo</option>
                                                            
                                                          </select>
                                                        </div>
                                                    </div>
                                                </div>
                                              </div>
                                              {errors.amount?.type === 'required' && <p className='text-[12px] font-semibold text-red-500'>Ingrese la cantidad a pagar.</p>}
                                            
                                  </div>
                              </div>

                              {/**Boton Add payment*/}
                              <div className='w-full h-[15%] flex flex-row justify-between items-center '>
                                    <button
                                      onClick={()=>{
                                        router.push(`/dashboard/order/${id}`)
                                      }}
                                      type='button'
                                      className='w-[48%]  flex  h-[46px] p-3  justify-center rounded-md bg-red-600  text-[18px] font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                      >
                                      Atras
                                    </button>
                                    <button
                                    disabled={debt <= 0} 
                                    type='submit'
                                    className={`${debt <= 0 ? 'bg-gray-300 text-white hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-500'} w-[48%] flex  h-[46px] p-3  justify-center rounded-md   text-[18px] font-semibold leading-6  shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
                                    >
                                    Agregar Pago
                                  </button>
                              </div>

                        </form>
                  </div>
                )
              }
          </section>


         <CartOfPayments totalToPay={totalToPay} orderId={id} orderDetails={orderDetails} changeState={changeState} update={update} debt={debt}  isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>

    </div>
    )  
  
}

export default PaymentOrder