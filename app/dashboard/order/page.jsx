'use client'

import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import CardOrder from '@/components/CardOrder';
import CreateOrderForm from '@/components/CreateOrderForm';
import { useRouter } from 'next/navigation';


function Order() {

  //ROUTER
  const router = useRouter();

  const onClickOrder = (id) =>{
    router.push(`/dashboard/order/${id}`)
  } 

  //GET DATA
  const [orders, setOrders] = useState([]);
  const getOrders = async () => {
    try {
      const orderList = await APIUtility.fetchData(`http://localhost:3000/api/order`);
      setOrders(orderList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //MODAL LOGIC
  const [isModalOpen, setIsModalOpen] =  useState(false);

  const openModal = () =>{
      setIsModalOpen(true);
  }

  const closeModal = () =>{
    setIsModalOpen(false);
  }

  //ACTIVE SELECTION
  const [selectionActive, setSelectionActive] = useState("Todas");
  const handleSelectionClick = (value) => {
    if (value === selectionActive) {
      return;
    }
    setSelectionActive(value);
  };

  //SEARCH BAR
  const [stateToFind, setStateToFind] = useState('');
  const searcherMotor = orders.filter((item) => {
    
    // This is for search the states of the order
    let upperCaseState = item.state ? item.state.toUpperCase() : "";
    
    return (

      (!upperCaseState.indexOf(stateToFind.toUpperCase())) &&
      (item.status === true)
    );
  });

  //USE EFFECT
  useEffect(()=>{
    getOrders();
  }, [])

  
  return (
    <div className='h-full w-full flex flex-col'>
        <div className='px-6 h-[80px] flex flex-row justify-start items-center overflow-x-scroll'>
              
              <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Todas' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                      onClick={()=>{
                          handleSelectionClick('Todas');
                          setStateToFind('');
                        }}>Todas</button>
              <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Registradas' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                        onClick={()=>{
                            handleSelectionClick('Registradas');
                            setStateToFind('registered');
                          }}>Registradas</button>
              <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Por Aceptar' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                          onClick={()=>{
                              handleSelectionClick('Por Aceptar');
                              setStateToFind('toaccept');
                            }}>Por Aceptar</button>
              <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'En Proceso' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                      onClick={()=>{
                          handleSelectionClick('En Proceso');
                          setStateToFind('inprocess');
                        }}>En Proceso</button>
              <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Completadas' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                      onClick={()=>{
                        handleSelectionClick('Completadas');
                        setStateToFind('completed');
                      }}>Completadas</button>

        </div>
         <div className='flex-grow w-full justify-center md:justify-start flex-wrap  flex flex-row  px-6 py-6 overflow-y-scroll'>
        
              <div onClick={openModal} className='mr-5 lg:mb-5   cursor-pointer mt-10 md:mt-5 lg:mt-0 border-2 border-black  border-dotted shadow-sm flex flex-col text-center justify-center  items-center bg-white w-[60%] md:w-[45%] lg:w-[30%] xl:w-[18%] h-[30%] lg:h-[35%] rounded-xl '>
                  <p className='text-[40px]'>+</p>        
                  <h2 className='text-[20px] w-full'>Nueva orden</h2> 
              </div>

              {
                searcherMotor.map((item)=>(
                      <CardOrder customClick={()=>{onClickOrder(item.id)}} key={item.id} item={item}/>
                ))
              }

                
              <CreateOrderForm  closeModal={closeModal} isModalOpen={isModalOpen}/>

         </div>
    </div>
  )
}

export default Order