"use client"

import React, { useState, useEffect } from "react";
import ItemSubmenu from '@/components/ItemSubmenu';
import Dropdown from '@/components/Dropdown';
import EditLoginForm from '@/components/EditLoginForm';



function Configurations() {
  const catalogueList = [
    {id:1, name: "Login and Password", description:"Edicion de login"},
  ]

  let componentToRender = null;

  const [sidebarVisible, setSidebarVisible] = useState( true );
  const [verticalActive, setVerticalActive] = useState("");

  const handleVerticalClick = (value) => {
    if (value === verticalActive) {
      return;
    }
    setVerticalActive(value);
  };

  const [localRoute, setLocalRoute] = useState({configuration:false});

  const localRoutePush =(route)=>{

    switch (route) {
      case 'Login and Password':
        setLocalRoute({configuration:true});
        break;

      default:
        break;
    }
}

if(localRoute.configuration){
  componentToRender = <EditLoginForm/>
}

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setSidebarVisible(window.innerWidth >= 768);
    }
  }, []);


  return (
    <div className='h-screen flex-1 flex flex-col justify-end bg-[#e8e8e8]'>
      <h2 className='text-[22px] font-semibold px-4 w-full'>Ajustes</h2>

      <div className='px-4 py-6 h-[90%] flex flex-col md:flex-row justify-between w-full'>

        <Dropdown
          classProp={'md:hidden'}
          list={catalogueList}
          customClick={(item) => {
            handleVerticalClick(item.name);
            localRoutePush(item.name);
          }}
        />

        <aside
          className={`${
            sidebarVisible ? '' : 'hidden'
          } h-full  w-[25%] md:w-[40%] lg:w-[30%]  mr-4 rounded-lg bg-white  flex flex-col  justify-start`}
        >
          {catalogueList.map((item) => (
            <ItemSubmenu
              key={item.id}
              verticalActive={verticalActive}
              item={item}
              onClick={() => {
                handleVerticalClick(item.name);
                localRoutePush(item.name);
              }}
            />
          ))}
        </aside>

        <section className='h-full w-full md:w-[60%] lg:w-[70%] rounded-lg bg-white overflow-y-hidden'>
          {componentToRender}
        </section>

      </div>
    </div>
  );
}

export default Configurations;
