"use client"

import React, {useState} from "react";
import Logo from '@/assets/logo.jpg'
import Link from 'next/link';
import Image from 'next/image';
import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from '@headlessui/react';
import {MdOutlineSettings, MdOutlineLogout} from "react-icons/md";
import { BiSolidFilePlus, BiListCheck, BiTransferAlt } from 'react-icons/bi';
import { MdArticle } from 'react-icons/md';


function SideNavbar() {
    const [verticalActive, setVerticalActive] = useState("Nueva Orden");

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
        return;
        }
        setVerticalActive(value);
    };

  return (
    <div>
      <Disclosure  as="nav">

        <Disclosure.Button className="absolute top-4 right-4 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className=" lg:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>

        <div className="p-6 w-[60%] md:w-[40%] h-screen bg-white z-20 fixed top-0 -left-96 md:-left-[600px] lg:left-0 lg:w-[20%]  peer-focus:left-0 peer:transition ease-out delay-150 duration-200">
          <div className="flex flex-col justify-start item-center">
            {/* Logo */}
            <div>
                <Image className='h-full w-full' alt='Logo' src={Logo}/>
            </div>
            {/* panel */}
            <div className=" my-4 border-b border-gray-100 pb-4">

             <Link href='/dashboard'>
             <div onClick={()=>{handleVerticalClick("Crear Orden")}} className={`${verticalActive === "Crear Orden" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <BiSolidFilePlus className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "Crear Orden" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "Crear Orden" ? "text-white" : ""}`}>
                    Crear Orden
                    </h3>
                </div>
             </Link>

              <Link href='/dashboard/orders'>
              <div onClick={()=>{handleVerticalClick("Ordenes")}} className={`${verticalActive === "Ordenes" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <BiListCheck className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "Ordenes" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "Ordenes" ? "text-white" : ""}`}>
                    Ordenes
                    </h3>
                </div>
              </Link>

              <Link href='/dashboard/transactions'>
              <div onClick={()=>{handleVerticalClick("Transacciones")}} className={`${verticalActive === "Transacciones" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <BiTransferAlt className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "Transacciones" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "Transacciones" ? "text-white" : ""}`}>
                    Transacciones
                    </h3>
                </div>
              </Link>
             
              <Link href='/dashboard/catalogue'>
              <div onClick={()=>{handleVerticalClick("Catalogos")}} className={`${verticalActive === "Catalogos" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <MdArticle className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "Catalogos" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "Catalogos" ? "text-white" : ""}`}>
                    Catalogos
                    </h3>
                </div>
              </Link>
              
            </div>
            {/* setting  */}
            <div  className=" my-4 border-b border-gray-100 pb-4">
                <div onClick={()=>{handleVerticalClick("Configuraciones")}} className={`${verticalActive === "Configuraciones" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <MdOutlineSettings className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "Configuraciones" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "Configuraciones" ? "text-white" : ""}`}>
                    Ajustes
                    </h3>
                </div>
            </div>
            {/* logout */}
            <div className=" my-4">
            <div  className={` flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                <MdOutlineLogout className={`text-2xl text-gray-600 group-hover:text-white `}/>
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Salir
                </h3>
              </div>
            </div>
          </div>
        </div>

      </Disclosure>
    </div>
  );
}

export default SideNavbar;