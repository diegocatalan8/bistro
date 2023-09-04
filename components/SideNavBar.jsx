"use client"

import React, {useEffect, useState} from "react";
import { useRouter } from 'next/navigation';
import APIUtility from '@/services/ApiUtility';
import Modal from './Modal';
import Logo from '@/assets/logo.jpg'
import Link from 'next/link';
import Image from 'next/image';
import { useAccountContext } from '@/context/account/AccountContext';

import { GiHamburgerMenu } from "react-icons/gi";
import { Disclosure } from '@headlessui/react';
import {MdOutlineSettings, MdOutlineLogout} from "react-icons/md";
import { BiSolidFilePlus, BiListCheck, BiTransferAlt } from 'react-icons/bi';
import { MdArticle } from 'react-icons/md';




function SideNavbar() {
    const router = useRouter();
    const [isMenuVisible, setIsMenuVisible] = useState(true);
    const [size, setSize] = useState("static");
    const [verticalActive, setVerticalActive] = useState('/dashboard/order');

    const {setUser} = useAccountContext();

    //MODAL
    const modalText ={
      title:'Cerrar Sesion',
      description:'¿Esta seguro que desea continuar?',
      buttonConfirmText:'Logout'
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const customClickConfirmModal = async ()=>{
             await fetchCookie();
             setIsModalOpen(false);
             router.push('/sesion/login');
             setUser(null);
    }
    const customClickCancelModal =()=>{
          setIsModalOpen(false);
    }


    const fetchCookie = async (obj = {}) => {
      try {
        const url = 'http://localhost:3000/api/logout';
        const response = await APIUtility.postData(url, obj);
        console.log('Datos recibidos:', response);
        router.push('/sesion/login');
      } 
      catch (error) {
        console.error('Error en la petición:', error.message);
      }
    };

    const handleVerticalClick = (value) => {
        if (value === verticalActive) {
        return;
        }
        setVerticalActive(value);
    };

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setSize(window.innerWidth >= 768 ? "static" : "z-20 absolute");
  
        const handleResize = () => {
          setSize(window.innerWidth >= 768 ? "static" : "z-20 absolute");
        };
  
        window.addEventListener('resize', handleResize);
  
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }
    }, []);

    useEffect(() => {
      if (typeof window !== 'undefined') {
        setVerticalActive(window.location.pathname);
      }
    }, []);

   
   
  

  return (
    
      <Disclosure>

        <Disclosure.Button onClick={()=>{setIsMenuVisible(!isMenuVisible)}} className="absolute top-0 left-0 md:top-2 md:left-3 z-30 inline-flex items-center peer justify-center rounded-md p-2 text-gray-800 hover:bg-[#2E68FF] hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white group">
          <GiHamburgerMenu
            className="md:hidden h-6 w-6"
            aria-hidden="true"
          />
        </Disclosure.Button>

        <div className={`h-screen bg-white p-6  ${isMenuVisible ? size : 'hidden'}  w-[60%] md:w-[30%] lg:w-[22%]`}>
    
        
          <div className="flex flex-col justify-start item-center">
            {/* Logo */}
            <div>
                <Image className='h-full w-full' alt='Logo' src={Logo}/>
            </div>
            {/* panel */}
            <div className=" my-4 border-b border-gray-100 pb-4">

             <Link href='/dashboard/order'>
             <div onClick={()=>{handleVerticalClick("/dashboard/order")}} className={`${verticalActive === "/dashboard/order" || (verticalActive.indexOf("/dashboard/order") !== -1) ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <BiSolidFilePlus className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "/dashboard/order" || (verticalActive.indexOf("/dashboard/order") !== -1) ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "/dashboard/order" || (verticalActive.indexOf("/dashboard/order") !== -1) ? "text-white" : ""}`}>
                    Crear Orden
                    </h3>
                </div>
             </Link>


              <Link href='/dashboard/transactions'>
              <div onClick={()=>{handleVerticalClick("/dashboard/transactions")}} className={`${verticalActive === "/dashboard/transactions" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <BiTransferAlt className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "/dashboard/transactions" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "/dashboard/transactions" ? "text-white" : ""}`}>
                    Transacciones
                    </h3>
                </div>
              </Link>
             
              <Link href='/dashboard/catalogue'>
              <div onClick={()=>{handleVerticalClick("/dashboard/catalogue")}} className={`${verticalActive === "/dashboard/catalogue" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                    <MdArticle className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "/dashboard/catalogue" ? "text-white" : ""}`} />
                    <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "/dashboard/catalogue" ? "text-white" : ""}`}>
                    Catalogos
                    </h3>
                </div>
              </Link>
              
            </div>
            {/* setting  */}
           
              <div  className=" my-4 border-b border-gray-100 pb-4">
                <Link href='/dashboard/configurations'>
                  <div onClick={()=>{handleVerticalClick("/dashboard/configurations")}} className={`${verticalActive === "/dashboard/configurations" ? "bg-[#2E68FF] shadow-lg m-auto text-white" : ""} flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                      <MdOutlineSettings className={`text-2xl text-gray-600 group-hover:text-white ${verticalActive === "/dashboard/configurations" ? "text-white" : ""}`} />
                      <h3 className={`text-base text-gray-800 group-hover:text-white font-semibold ${verticalActive === "/dashboard/configurations" ? "text-white" : ""}`}>
                      Ajustes
                      </h3>
                  </div>
                </Link>
              </div>
            
            {/* logout */}
            <div onClick={()=>{
              setIsModalOpen(true);
            }} className=" my-4">
            <div  className={` flex mb-2 justify-start items-center gap-4 pl-5 hover:bg-[#2E68FF] p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto`}>
                <MdOutlineLogout className={`text-2xl text-gray-600 group-hover:text-white `}/>
                <h3 className="text-base text-gray-800 group-hover:text-white font-semibold ">
                  Salir
                </h3>
              </div>
            </div>
          </div>
        </div>
        <Modal 
        title={modalText.title}
        description={modalText.description}
        buttonConfirmText={modalText.buttonConfirmText}

        isModalOpen={isModalOpen}
        customClickCancelModal={customClickCancelModal}
        customClickConfirmModal={customClickConfirmModal}
        />

      </Disclosure>
   
  );
}

export default SideNavbar;

{/**-left-96 md:-left-[600px] lg:left-0  peer-focus:left-0 peer:transition ease-out delay-150 duration-200*/}