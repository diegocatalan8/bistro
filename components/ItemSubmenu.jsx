import React from 'react'

function ItemSubmenu({onClick, item, verticalActive}) {

   
  return (
        <div 
        onClick={onClick}
        className={`${verticalActive === item.name ? "bg-[#2E68FF] shadow-lg rounded-lg text-white" : ""} rounded-lg hover:border-2 hover:border-solid hover:border-white  cursor-pointer w-full h-[70px] pl-3 hover:bg-[#2E68FF] hover:text-white font-bold flex flex-col justify-center content-center text-[18px] `}>
          <p>{item.name}</p>
          <p className='text-[12px] font-normal'>{item.description}</p>
        </div>
  )
}

export default ItemSubmenu