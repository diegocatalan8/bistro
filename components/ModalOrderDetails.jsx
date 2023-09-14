import React from 'react';
import { Transition } from '@headlessui/react';
import { MdClose } from 'react-icons/md';


export default function ModalOrderDetails({
  modalOpen,
  handleCancelModal,
  products,
  orderId,
  confirmModal,
  buttonText
}) {

  console.log(products);

  const onClickCancel = () => {
    handleCancelModal();
  };

  return (
    <Transition
      show={modalOpen}
      enterFrom='opacity-0'
      enterTo='opacity-100'
      leaveFrom='opacity-100'
      leaveTo='opacity-0'
    >
      <div className='fixed z-30 inset-0 overflow-y-auto'>
        <div className='flex  items-center justify-center min-h-screen'>
          <div className='fixed inset-0 bg-gray-100 bg-opacity-75 h-full'></div>
          <div className='p-10 overflow-hidden relative  dark:border-none bg-white border-solid border-2 border-[#ffffff33] shadow-[0px_-4px_40px_rgba(0,0,0,0.15)] dark:shadow-none  rounded-xl z-20 w-[80%] md:w-[70%] lg:w-[60%] xl:w-[40%] h-[500px] md:h-[700px] xl:h-[600px] flex flex-col justify-start items-center'>
            <div className='py-3 border-b-2 border-solid border-[#A8A8A8] w-full text-[30px] font-semibold flex flex-row justify-between'>
              <p>Orden #{orderId}</p>
             <MdClose onClick={onClickCancel}/>
            </div>

            <div className='mb-6 flex flex-col flex-grow overflow-y-scroll h-full w-full'>
                  {
                    products.map((item)=>(
                        <div key={item.id} className='border-b-2 border-solid border-[#A8A8A8] w-full h-[25%] flex flex-row justify-between'>
                            <div className=' w-[15%] h-full text-[30px] font-bold flex flex-col justify-center items-center'>
                                <p className='w-full text-center'>{item.quantity}</p>
                            </div>
                            <div className='p-3 w-[85%] h-full flex flex-col justify-center items-start'>
                                <p className='text-[30px] font-semibold'>{item.product_name}</p>
                                <p className='text-[30px]'>{item.name}</p>
                                <p className='text-[30px]'>{item.note === '' ? '' :'-' + item.note}</p>
                            </div>
                        </div>
                    ))
                  }    
            </div>

            <div className='flex flex-col justify-center w-full'>
                            <button
                                onClick={()=>{
                                  confirmModal();
                                }}
                                type='button'
                                
                                className={`bg-red-600 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-[100%] flex  h-full md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md   text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6  `}
                            >
                                {buttonText}
                            </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  );
}
