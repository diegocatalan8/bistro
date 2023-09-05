import React from 'react'

function CartOfPayments({isCartOpen, setIsCartOpen, userId = 1}) {
  return (
    <aside className={`Aside bg-white h-full flex flex-row  ${isCartOpen ? 'w-full absolute z-20 lg:static lg:z-0  lg:w-[35%] xl:w-[30%]' : 'w-[10%] md:w-[5%] lg:static lg:z-0 lg:w-[35%] xl:w-[30%]'}`}>
            <div className={`ButtonAside flex flex-col justify-center bg-[#E8E8E8]  h-full ${isCartOpen ? 'w-[10%] lg:hidden' : 'w-full lg:hidden'}`}>
                <button onClick={()=>{setIsCartOpen(!isCartOpen)}}  className='w-full h-[60px] font-semibold text-[22px] bg-[#2E68FF]  text-white rounded-l-md '>
                    {isCartOpen ? ">" : "<"}
                </button>
            </div>

            <div className={`h-full flex flex-col p-3 bg-white ${isCartOpen ? 'w-[90%] lg:w-full' : 'hidden lg:w-full'}`}>

                    <header className='border-2 border-solid border-blue-500 flex flex-col w-full justify-start h-[12%] '>
                        <p className='w-full font-semibold text-[22px] md:text-[40px] lg:text-[22px] border-2 border-solid border-blue-500'>Payments</p>
                    </header>

                    

            </div>
    </aside>
  )
}

export default CartOfPayments


{/**

<section className='h-[60%] flex flex-col overflow-y-scroll border-y-2 border-solid border-gray-400'>
                        <div className='h-full'>
                        {
                            products.map((item)=>(
                                <div key={item.id} className='p-2 flex flex-row justify-between border-b-2 border-solid border-gray-200 w-full h-[33.33%] '>
                                    {/**COLUMN 1 
                                    <div className='flex flex-col justify-start w-[25%] '>
                                    <div className='w-full rounded-lg border-solid '>
                                        <Image alt='product' src={Logo} className='w-full  h-full'/>
                                    </div>
                                </div>

                            {/**COLUMN 2 
                                <div className='flex flex-col justify-between p-1.5 w-[50%]'>
                                    <div>
                                        <p className='font-medium  text-[20px] md:text-[30px] lg:text-[18px]'>{item.name}</p>
                                        <p className='md:text-[25px] lg:text-[15px]'>{item.note}</p>
                                    </div>
                                    
                                    <p className='md:text-[25px] lg:text-[15px]'>Cant. {item.quantity}</p>
                                </div>

                            {/**COLUMN 3 
                                <div className='flex flex-col justify-between p-2 w-[25%] '>
                                        <p className='w-full text-center font-bold text-[#4D81F1] md:text-[25px] lg:text-[15px]'>${parseFloat(item.subtotal).toFixed(2)}</p>

                                        <div className={`${orderDetails.state === 'toaccept' || orderDetails.status === false ? 'hidden' : ''} w-full flex justify-center items-center`}>
                                            <button onClick={()=>{
                                                setIsModalOpen(true);
                                                setIdToDelete(item.id)
                                            }} className='text-white bg-red-500 border-2 border-solid border-red-500 hover:border-red-800 hover:bg-red-500 rounded-md h-[40px] w-[40px] md:h-[60px] md:w-[60px] lg:h-[40px] lg:w-[40px] flex justify-center items-center'>
                                                    <BiSolidTrashAlt className=' w-[20px] h-[30px] md:w-[40px] md:h-[50px] lg:w-[20px] lg:h-[30px]'/>
                                            </button>
                                        </div>
                                </div>
                        </div>
                    ))
                }
                </div>
            </section>

            <footer className='flex flex-col justify-center items-center h-[30%]'>
                <div className='flex flex-col justify-center h-full w-[80%]'>
                    <button
                        type='button'
                        disabled={isConfirmButtonDisabled}
                        className={`${isConfirmButtonDisabled ? 'bg-gray-300 text-white' : 'bg-blue-600 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'} w-[100%] flex  h-[46px] md:h-[66px] lg:h-[46px] p-3 md:p-5 lg:p-3 justify-center rounded-md   text-[18px] md:text-[25px] lg:text-[18px] font-semibold leading-6  `}
                    >
                        Cobrar Q{products[0] ? parseFloat(products[0]?.sum_total).toFixed(2) : '0.00'}
                    </button>
                </div>

            </footer>

*/}