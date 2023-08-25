"use client"

import React, { useState, useEffect } from "react";

import ItemSubmenu from '@/components/ItemSubmenu';
import Dropdown from '@/components/Dropdown';
import ProductsForm from '@/components/ProductsForm';
import CategoryForm from '@/components/CategoryForm';
import DiscountForm from '@/components/DiscountForm';
import VariationForm from '@/components/VariationForm';
import CatalogueList from '@/components/CatalogueList';

const catalogueList = [
  {id:1, name: "Productos", description:"Crea Y Modifica Productos", getItems: 'items', route:'Productos'},
  {id:2, name: "Categorias", description:"Crea Y Modifica Categorias", getItems: 'category', route:'Categorias'},
  {id:3, name: "Descuentos", description:"Crea Y Modifica Descuentos", getItems: 'discounts', route:'Descuentos'},
  {id:4, name: "Variaciones", description:"Crea Y Modifica Variaciones", getItems: 'variation', route:'Variaciones'},
]


export default function Catalogue(){

  const [sidebarVisible, setSidebarVisible] = useState( true );
  const [verticalActive, setVerticalActive] = useState("");
  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

    const [dataToEdit, setDataToEdit] = useState(null);
    const [getItems, setGetItems] = useState('');
    const [routeName, setRouteName] = useState('');
    const [httpMethod, setHttpMethod] = useState({post:true, put:false})
    const [localRoute, setLocalRoute] = useState({catalogue:false, products:false, category:false, discounts:false, variations:false});
    
   
    const activePutHttpMethod = () =>{
          setHttpMethod({post:false, put:true})
    }

    const activePostHttpMethod = () =>{
      setHttpMethod({post:true, put:false});
    }

    let componentToRender = null;
    const localRoutePush =(route)=>{
        switch (route) {
          case 'Catalogue':
            setLocalRoute({catalogue:true, products:true, category:false, discounts:false, variations:false});
            break;

          case 'Productos':
            setLocalRoute({catalogue:false, products:true, category:false, discounts:false, variations:false});
            break;
          
          case 'Categorias':
            setLocalRoute({catalogue:false, products:false, category:true, discounts:false, variations:false});
            break;
          
          case 'Descuentos':
            setLocalRoute({catalogue:false, products:false, category:false, discounts:true, variations:false});
            break;
          
          case 'Variaciones':
            setLocalRoute({catalogue:false, products:false, category:false, discounts:false, variations:true});
            break;
        
          default:
            break;
        }
    }
    if(localRoute.catalogue){
      componentToRender = 
      <CatalogueList 
              activePutHttpMethod={activePutHttpMethod} 
              activePostHttpMethod={activePostHttpMethod} 
              getItems={getItems} 
              routeName={routeName} 
              pushTo={localRoutePush}
              dataToEdit={dataToEdit}
              setDataToEdit={setDataToEdit}
      />
    }
    else if(localRoute.products){
      componentToRender = 
            <ProductsForm 
                  httpMethod={httpMethod}
                  routeName={'Catalogue'} 
                  pushTo={localRoutePush}
                  dataToEdit={dataToEdit}
            />
    }
    else if(localRoute.category){
      componentToRender = 
              <CategoryForm 
                      httpMethod={httpMethod}
                      routeName={'Catalogue'} 
                      pushTo={localRoutePush}
                      dataToEdit={dataToEdit}
              />
    }
    else if(localRoute.discounts){
      componentToRender = 
              <DiscountForm 
                    httpMethod={httpMethod}
                    routeName={'Catalogue'} 
                    pushTo={localRoutePush}
                    dataToEdit={dataToEdit}
              />;
    }
    else if(localRoute.variations){
      componentToRender = 
                  <VariationForm 
                            httpMethod={httpMethod}
                            routeName={'Catalogue'} 
                            pushTo={localRoutePush} 
                            dataToEdit={dataToEdit}
                  />;
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
        localRoutePush('Catalogue');
        setGetItems(item.getItems);
        setRouteName(item.route);
      }}/>

      <aside className={`${sidebarVisible ? '' : 'hidden'} h-full  w-[25%] md:w-[40%] lg:w-[30%]  mr-4 rounded-lg bg-white  flex flex-col  justify-start`} >
       
        {catalogueList.map((item)=>(
              <ItemSubmenu  key={item.id} verticalActive={verticalActive} item={item} onClick={()=>{
                    handleVerticalClick(item.name);
                    localRoutePush('Catalogue');
                    setGetItems(item.getItems);
                    setRouteName(item.route);
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