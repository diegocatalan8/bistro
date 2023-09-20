'use client'
import React, {useState} from 'react'
import { useRouter } from 'next/navigation';
import APIUtility from '@/services/ApiUtility';
import Modal from './Modal';

function CardOrder({item, customClick, userId = 1, changeComponent}) {
   
    const originalDate = item.created_at;
    const date = new Date(originalDate);
    
    const hour = date.getHours();
    const min = date.getMinutes();
    const period = hour >= 12 ? "pm" : "am";
    const hourFormated = hour > 12 ? hour - 12 : hour;
    const minFormated = min < 10 ? "0" + min : min;

    const horaFinal = `${hourFormated}:${minFormated} ${period}`;

    const router = useRouter();
    
    const endOrder = () =>{
        if(item.payment_state){
          setIsModalOpen(true);
        }
        else{
          router.push(`/dashboard/order/payment/${item.id}`);
        }
    }

    //UPDATE STATE OF ORDERS
    const updateStateOfOrder = async () => {
      try {
        const obj = {
          payment_state : item.payment_state, 
          state: 'committed', 
          discount_id : null, 
          modified_by: userId, 
          status: item.status
      }
        const url = `/api/order/${item.id}`;
        const response = await APIUtility.putData(url, obj);
        console.log('Datos actualizados:', response);
        
      } catch (error) {
        console.error('Error en la petición:', error.message);
      }
    };

    //MODAL FOR DELETE PAYMENT
    const modalText ={
      title:'Entregar Orden',
      description:'¿Esta seguro que desea continuar?',
      buttonConfirmText:'Si, Continuar'
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const customClickConfirmModal = async ()=>{
            setIsModalOpen(false);
            updateStateOfOrder();
            changeComponent();
    }
    const customClickCancelModal =()=>{
          setIsModalOpen(false);
    }


  return (
    <div  className={`md:mr-5 lg:mb-5 cursor-pointer p-6 mt-5 md:mt-5 lg:mt-0  shadow-sm flex flex-col text-center justify-between items-center bg-white w-[60%] md:w-[45%] lg:w-[30%] xl:w-[18%] h-[30%] lg:h-[35%] rounded-xl hover:border-2 hover:border-solid hover:border-blue-500 hover:shasdow-lg`}>
            <div onClick={customClick} className='w-full h-full flex flex-col justify-between'>
                <div className='w-full flex flex-col justify-center items-center'>
                    <h2 className='w-full text-center font-semibold'>{'Orden #'+item.id}</h2>
                    <p>{item.description}</p>
                    <p className={`px-2 w-fit rounded-xl font-semibold  ${item.type === 'togo' ? 'text-[#2E68FF]' : item.type === 'restaurant' ? 'text-green-500' : 'text-[#FF0000]'}`} >{item.type === 'togo' ? 'Para llevar' : item.type === 'restaurant' ? 'Restaurante' : 'Delivery'}</p>
                    
                </div>

                <div className='w-full'>
                    <p>{horaFinal}</p>
                    <p>{item.payment_state ? 'Orden Pagada' : 'Pago pendiente'}</p>
                </div>
            </div>
            <div className={`w-full mt-6 ${item.state === 'completed' ? '' : 'hidden'}`}>
                <button onClick={endOrder} className='border-2 border-solid border-blue-600 px-3 hover:bg-blue-600 hover:text-white rounded-xl text-blue-600 font-semibold'>Entregar orden</button>
            </div>
            <Modal
                title={modalText.title}
                description={modalText.description}
                buttonConfirmText={modalText.buttonConfirmText}
                isModalOpen={isModalOpen}
                customClickCancelModal={customClickCancelModal}
                customClickConfirmModal={customClickConfirmModal}
            />
    </div>
  )
}

export default CardOrder