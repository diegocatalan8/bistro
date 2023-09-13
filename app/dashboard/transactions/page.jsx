"use client"
import React, {useState, useEffect} from 'react'
import APIUtility from '@/services/ApiUtility';
import { BiReceipt } from 'react-icons/bi';
import { BiMoney } from 'react-icons/bi';
import ModalTransaction from '@/components/ModalTransaction';
import Modal from '@/components/Modal';

function Transactions() {
  //CHANGE THE STATE OF THE COMPONENT
  const [update, setUpdate] = useState(false);
  const changeState = () =>{
        setUpdate(!update);
  }

  //GET DATA
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async () => {
    try {
      const transactionsList = await APIUtility.fetchData(`http://localhost:3000/api/payments`);
      setTransactions(transactionsList.response);
      console.log(transactionsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [products, setProducts] = useState([]);
  const getProducts = async (orderId) => {
    try {
      const productsList = await APIUtility.fetchData(`http://localhost:3000/api/cart/${orderId}`);
      setProducts(productsList.response);
      console.log(productsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [payments, setPayments] = useState([]);
  const getPayments = async (orderId) => {
    try {
      const paymentsList = await APIUtility.fetchData(`http://localhost:3000/api/payments/${orderId}`);
      setPayments(paymentsList.response);
      console.log(paymentsList);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const[orderDetails, setOrderDetails] = useState([]);
  const getOrderDetails = async (orderId) => {
    try {
      const ordersList = await APIUtility.fetchData(`http://localhost:3000/api/order/${orderId}`);
      setOrderDetails(ordersList.response);
      console.log(ordersList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //REFOUND TRANSACTION
  const updatePayment = async () => {
    try {
      const obj = {
        isRefound: true
      }
      const url = `http://localhost:3000/api/payments/refound/${products[0]?.order_id}`;
      const response = await APIUtility.putData(url, obj);
      console.log('Datos actualizados:', response);  
      changeState();
    } catch (error) {
      console.error('Error en la petición:', error.message);
     
    }
  };

  //MODAL FOR VIEW DETAILS 
  const [isModalDetailsOpen, setIsModalDetailsOpen] = useState(false);
  const closeModalDetails = () =>{
    setIsModalDetailsOpen(false);
  }

  //MODAL FOR REFOUND
  const modalText ={
    title:`Reembolsar Q ${parseFloat(products[0]?.sum_total).toFixed(2)}`,
    description:'¿Esta seguro que desea reembolsar?',
    buttonConfirmText:'Si, reembolsar'
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customClickConfirmModal = async ()=>{
           setIsModalOpen(false);
           updatePayment();
  }
  const customClickCancelModal =()=>{
        setIsModalOpen(false);
  }

  //GET ACTUAL DATE
  var currentDate = new Date();
  var year = currentDate.getFullYear();
  var getMonth = currentDate.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month number
  var month = getMonth <= 9 ? '0' + getMonth : getMonth;
  var day = currentDate.getDate();
  var dateInText = year + '-' + month + '-' + day;

  const [dateToFind, setDateToFind] = useState(dateInText);
  

  //SEARCH BAR
  const [transactionToFind, setTransactionToFind] = useState('');
  const handleInputChangeSearch = (e) => {
    e.preventDefault();
    let entryString = e.target.value;
    let regularExpresion = /^[a-zA-Z0-9\s]{0,20}$/;

    if (regularExpresion.test(entryString)) {
      setTransactionToFind(e.target.value);
    }
  };

  const searcherMotor = transactions.filter((item) => {
    // This is for search the transaction specific
    let upperCaseOrderId = item.order_id ? item.order_id : "";
    let upperCaseDescription = item.description ? item.description.toUpperCase() : "";
    
    //DATE OF THE TRANSACTION
    let originalDate = item.date;
    let dateTransaction = new Date(originalDate);
    let year = dateTransaction.getFullYear();
    let getMonth = dateTransaction.getMonth() + 1; // Months are zero-based, so we add 1 to get the correct month number
    let month = getMonth <= 9 ? '0'+getMonth : getMonth;
    let day = dateTransaction.getDate();
    let dateToFilter = year + '-' + month + '-' + day;


    return (
      (dateToFilter === dateToFind)  && (
      (upperCaseOrderId === parseInt(transactionToFind)) ||
      (!upperCaseDescription.indexOf(transactionToFind.toUpperCase())) 
      )
    );
  });
  


  //USE EFFECT
  useEffect(()=>{
    getTransactions();
  }, [update]);


  return (
    <div className='p-4 h-screen w-full flex flex-col'>
        <div className='flex flex-col bg-white h-full w-full rounded-xl p-6'>

              <div className='flex flex-row h-[50px] w-full justify-between items-end '>
                    {/**SEARCH BAR */}
                    <div className='w-[70%] h-full flex'>
                        <input
                        id='search'
                        name='search'
                        type='text'
                        placeholder='Buscar...'
                        value={transactionToFind}
                        onChange={handleInputChangeSearch}
                        autoFocus={true}
                        className='pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                        />
                    </div>

                    <input 
                        type="date" 
                        id="start" 
                        className='ml-2 lg:ml-0 text-center w-fit font-semibold h-full px-3 block  rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                        name="trip-start" 
                        value={dateToFind}
                        onChange={(e)=>{
                          setDateToFind(e.target.value);
                        }}
                        
                    />

              </div>  

              <div className='pt-6 flex flex-col flex-grow overflow-hidden'>
                    <div className='border-b-2 border-solid border-[#A8A8A8]  text-center  lg:px-5 font-semibold items-center text-[14px] lg:text-[18px] w-full h-[40px] flex flex-row justify-between'>
                          <p className='w-[25%] lg:w-[16.6%]'>Id</p>
                          <p className='w-[25%] lg:w-[16.6%]'>Fecha</p>
                          <p className='w-[25%] lg:w-[16.6%]'>Descripción</p>
                          <p className='hidden lg:block w-[25%] lg:w-[16.6%]'>Tipo</p>
                          <p className='hidden lg:block w-[25%] lg:w-[16.6%]'>Reembolsar</p>
                          <p className='w-[25%] lg:w-[16.6%] '>Detalles</p>
                    </div>

                    <div className='text-[14px] lg:text-[18px]  w-full h-full flex flex-col  overflow-y-scroll'>
                            {
                              searcherMotor?.map((item) => {
                                // Parsear la cadena de fecha
                                const dateObj = new Date(item.date);
                                
                                // Obtener componentes de fecha
                                const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Sumar 1 porque los meses van de 0 a 11
                                const day = String(dateObj.getDate()).padStart(2, '0');
                                const year = dateObj.getFullYear();
                            
                                // Formatear la fecha como "MM/DD/YYYY"
                                const formattedDate = `${day}/${month}/${year}`;
                            
                                return (
                                  <div key={item.order_id} className='text-center lg:px-5 w-full min-h-[70px] flex flex-row justify-between items-center'>
                                    <p className='w-[25%] lg:w-[16.6%]'>#{item.order_id}</p>
                                    <p className='w-[25%] lg:w-[16.6%]'>{formattedDate}</p>
                                    <p className='hidden lg:block w-[25%] lg:w-[16.6%]'>{item.description}</p>

                                    <p className={`hidden lg:block w-[25%] lg:w-[16.6%] rounded-xl ${item.isrefound === true ? 'text-white bg-red-600 font-semibold' : 'text-white bg-green-600 font-semibold'}`}>{item.isrefound === true ? 'Reembolso' : 'Pago'}</p>
                                    <p className=' w-[25%] lg:w-[16.6%] flex flex-row justify-center'>
                                          <button disabled={item.isrefound} onClick={()=>{
                                            getPayments(item.order_id);
                                            getProducts(item.order_id);
                                            setTimeout(()=>{
                                              setIsModalOpen(true);
                                            }, 300)
                                          }} className={`${item.isrefound === true ? 'bg-gray-200 text-white' : 'text-red-500 hover:text-white border-2 border-solid border-red-500 hover:border-red-800 hover:bg-red-500'}  rounded-md h-[40px] w-[40px] flex justify-center items-center`}>
                                                  <BiMoney className=' w-[20px] h-[30px]'/>
                                          </button>
                                    </p>
                                    <p className=' w-[25%] lg:w-[16.6%] flex flex-row justify-center'>
                                          <button onClick={()=>{
                                              getProducts(item.order_id);
                                              getPayments(item.order_id);
                                              getOrderDetails(item.order_id);
                                              setTimeout(()=>{
                                                setIsModalDetailsOpen(true);
                                              }, 300)
                                          }} className='text-orange-500 hover:text-white border-2 border-solid border-orange-500 hover:border-orange-800 hover:bg-orange-500 rounded-md h-[40px] w-[40px] flex justify-center items-center'>
                                                  <BiReceipt className=' w-[20px] h-[30px]'/>
                                          </button>
                                    </p>
                                    
                                  </div>
                                );
                              })
                            }
                    </div>
              </div>
             
            {isModalDetailsOpen &&
              <ModalTransaction
              modalOpen={isModalDetailsOpen}
              handleCancelModal={closeModalDetails}
              products={products}
              payments={payments}
              orderDetails={orderDetails}
            />
            }

          {isModalOpen && <Modal
              title={modalText.title}
              description={modalText.description}
              buttonConfirmText={modalText.buttonConfirmText}

              isModalOpen={isModalOpen}
              customClickCancelModal={customClickCancelModal}
              customClickConfirmModal={customClickConfirmModal}
          />}
        </div>
    </div>
  )
}

export default Transactions