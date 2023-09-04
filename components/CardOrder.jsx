import React from 'react'

function CardOrder({item, customClick}) {

    const originalDate = item.created_at;
    const date = new Date(originalDate);

    const hour = date.getUTCHours();
    const min = date.getUTCMinutes();
    const period = hour >= 12 ? "pm" : "am";
    const hourFormated = hour > 12 ? hour - 12 : hour;
    const minFormated = min < 10 ? "0" + min : min;

    const horaFinal = `${hourFormated}:${minFormated} ${period}`;

    


  return (
    <div onClick={customClick} className={`md:mr-5 lg:mb-5 cursor-pointer p-6 mt-5 md:mt-5 lg:mt-0  shadow-sm flex flex-col text-center justify-between items-center bg-white w-[60%] md:w-[45%] lg:w-[30%] xl:w-[18%] h-[30%] lg:h-[35%] rounded-xl hover:border-2 hover:border-solid hover:border-blue-500 hover:shasdow-lg`}>
            <div className='w-full'>
                <h2 className='w-full text-center font-semibold'>{'Orden #'+item.id}</h2>
                <p>{item.description}</p>
                
                
            </div>

            <div className='w-full'>
                <p>{horaFinal}</p>
            </div>

            <div className='w-full'>
                <p className={`rounded-xl font-semibold text-white ${item.type === 'togo' ? 'bg-[#2E68FF]' : item.type === 'restaurant' ? 'bg-green-500' : 'bg-[#FF0000]'}`} >{item.type === 'togo' ? 'Para llevar' : item.type === 'restaurant' ? 'Restaurante' : 'Delivery'}</p>
            </div>

            
    </div>
  )
}

export default CardOrder