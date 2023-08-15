"use client"

import React, { useState, useEffect } from "react";

import ItemSubmenu from '@/components/ItemSubmenu';
import Dropdown from '@/components/Dropdown';
import ProductsForm from '@/components/ProductsForm';

const catalogueList = [
  {id:1, name: "Productos", description:"Crea Y Modifica Productos"},
  {id:2, name: "Categorias", description:"Crea Y Modifica Categorias"},
  {id:3, name: "Descuentos", description:"Crea Y Modifica Descuentos"},
  {id:4, name: "Variaciones", description:"Crea Y Modifica Variaciones"},
]


export default function Catalogue(){

  const [sidebarVisible, setSidebarVisible] = useState( false );

  const [verticalActive, setVerticalActive] = useState("");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

 
  const [localRoute, setLocalRoute] = useState({products:false, category:false, discounts:false, variations:false});

  let componentToRender = null;
  const localRoutePush =(route)=>{
      switch (route) {
        case 'Productos':
          setLocalRoute({products:true, category:false, discounts:false, variations:false});
          break;
        
        case 'Categorias':
          setLocalRoute({products:false, category:true, discounts:false, variations:false});
          break;
        
        case 'Descuentos':
          setLocalRoute({products:false, category:false, discounts:true, variations:false});
          break;
        
        case 'Variaciones':
          setLocalRoute({products:false, category:false, discounts:false, variations:true});
          break;
      
        default:
          break;
      }
  }

    if(localRoute.products){
      componentToRender = <ProductsForm/>
    }
    else if(localRoute.category){
      componentToRender = <p>Categorias</p>;
    }
    else if(localRoute.discounts){
      componentToRender = <p>Descuentos</p>;
    }
    else if(localRoute.variations){
      componentToRender = <p>Variaciones</p>;
    }

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setSidebarVisible(window.innerWidth >= 768);
      }
    }, []);
  
  

  return (
    <div className="h-screen flex-1 flex flex-col justify-end bg-[#e8e8e8]">

    <h2 className='text-[22px] font-semibold px-4 w-full'>Catalogos</h2>

   

    <div className='px-4 py-6 h-[90%] flex flex-col md:flex-row justify-between w-full'>
      
      <Dropdown classProp={"md:hidden"} list={catalogueList} customClick ={(item)=>{
        handleVerticalClick(item.name);
        localRoutePush(item.name);
      }}/>

      <aside className={`${sidebarVisible ? '' : 'hidden'} h-full  w-[25%] md:w-[40%] lg:w-[30%]  mr-4 rounded-lg bg-white  flex flex-col  justify-start`} >
       
        {catalogueList.map((item)=>(
              <ItemSubmenu  key={item.id} verticalActive={verticalActive} item={item} onClick={()=>{
                    handleVerticalClick(item.name);
                    localRoutePush(item.name);
              }}/>
        ))}

      </aside>
 

      <section className='h-full w-full md:w-[60%] lg:w-[70%] rounded-lg bg-white'>
              {componentToRender}
      </section>
              
    </div>

            
    </div>
  );
}