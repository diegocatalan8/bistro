'use client'

import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import CardOrder from '@/components/CardOrder';
import CreateOrderForm from '@/components/CreateOrderForm';
import { useRouter } from 'next/navigation';
import Dropdown from '@/components/Dropdown';


function Order() {

  //UPDATE THE STATE OF THE COMPONENT
  const [update, setUpdate] = useState(false);
  const changeComponent = () =>{
    setUpdate(!update);
  }

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
  const [selectionActive, setSelectionActive] = useState("Registradas");
  const handleSelectionClick = (value) => {
    if (value === selectionActive) {
      return;
    }
    setSelectionActive(value);
  };

  //SEARCH BAR
  const [stateToFind, setStateToFind] = useState('registered');
  const searcherMotor = orders.filter((item) => {
    
    // This is for search the states of the order
    let upperCaseState = item.state ? item.state.toUpperCase() : "";
    let stateCommitted = 'committed'
    
    return (

      ((!upperCaseState.indexOf(stateToFind.toUpperCase())) && item.state !== stateCommitted) &&
      (item.status === true)
    );
  });


  //USE EFFECT
  useEffect(()=>{
    getOrders();
  }, [update])
  
  useEffect(() => {
    setInterval(()=>{
      changeComponent();
    }, 10000)
  }, [])
  

  const buttonsSelect = [
    {id: 1, name: 'Registradas', state: 'registered'},
    {id: 2, name: 'Por Aceptar', state: 'toaccept'},
    {id: 3, name: 'En Proceso', state: 'inprocess'},
    {id: 4, name: 'Completadas', state: 'completed'}
  ]
  
  return (
    <div className='h-full w-full flex flex-col justify-start items-start md:justify-center md:items-center'>

        <div className='bg-[#e8e8e8] h-[12%] md:h-[8%] w-full flex flex-col justify-end items-center md:px-6  md:items-start lg:justify-center lg:items-center'>
            
            <Dropdown classProp={"w-[70%] md:w-[80%] lg:hidden"} list={buttonsSelect} customClick ={(item)=>{
                handleSelectionClick(item.name);
                setStateToFind(item.state);
                changeComponent();
            }}/>

            <div className='w-full h-[50%] hidden lg:flex lg:flex-row justify-start items-center overflow-y-hidden overflow-x-scroll'>
                          
              
                          <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Registradas' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                                    onClick={()=>{
                                        handleSelectionClick('Registradas');
                                        setStateToFind('registered');
                                        changeComponent()
                                      }}>Registradas</button>
                          <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Por Aceptar' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                                      onClick={()=>{
                                          handleSelectionClick('Por Aceptar');
                                          setStateToFind('toaccept');
                                          changeComponent();
                                        }}>Por Aceptar</button>
                          <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'En Proceso' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                                  onClick={()=>{
                                      handleSelectionClick('En Proceso');
                                      setStateToFind('inprocess');
                                      changeComponent();
                                    }}>En Proceso</button>
                          <button className={`ml-3 font-semibold w-fit px-2 py-1 rounded-lg ${selectionActive === 'Completadas' ? 'text-white bg-[#2E68FF]' : 'text-black hover:text-white bg-[#D9D9D9] hover:bg-[#2E68FF]'}`} 
                                  onClick={()=>{
                                    handleSelectionClick('Completadas');
                                    setStateToFind('completed');
                                    changeComponent();
                                  }}>Completadas</button>

                                  

            </div>
            
        </div>

         <div className='max-h-[88%] h-[88%] md:max-h-[92%] md:h-[92%] w-full justify-center md:justify-start items-start flex flex-row  flex-wrap px-6 py-6 md:py-6 overflow-y-scroll'>
        
              <div onClick={openModal} className='md:mr-5 cursor-pointer md:mt-5 lg:mt-0 lg:mb-5 border-2 border-black border-dotted shadow-sm flex flex-col text-center justify-center items-center bg-white w-[60%] md:w-[45%] lg:w-[30%] xl:w-[18%] h-[30%] lg:h-[35%] rounded-xl'>
                  <p className='text-[40px]'>+</p>        
                  <h2 className='text-[20px] w-full'>Nueva orden</h2> 
              </div>

              {
                searcherMotor.map((item)=>(
                      <CardOrder changeComponent={changeComponent} customClick={()=>{
                        onClickOrder(item.id);
                      }} key={item.id} item={item}/>
                ))
              }

                
              <CreateOrderForm  closeModal={closeModal} isModalOpen={isModalOpen}/>

         </div>
    </div>
  )
}

export default Order