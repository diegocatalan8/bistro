import React, {useState, useEffect} from 'react'
import APIUtility from '@/services/ApiUtility';
import { BiPencil } from 'react-icons/bi';
import { BiSolidTrashAlt } from 'react-icons/bi';
import Modal from '@/components/Modal'; 

function CatalogueList({getItems='', pushTo, routeName, activePutHttpMethod, activePostHttpMethod, dataToEdit, setDataToEdit, idUser=1}) {

  //Data
  const [data, setData] = useState([]);
  const [productToFind, setProductToFind] = useState('');
  
  //MODAL
  const modalText ={
      title:'Desactivar Producto',
      description:'Si desactiva el producto no lo podra volver a utilizar hasta activarlo nuevamente.',
      buttonConfirmText:'Desactivar'
   }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const customClickConfirmModal = async ()=>{
            await deleteItem(); 
            setIsModalOpen(false);
  }
  const customClickCancelModal =()=>{
        setIsModalOpen(false);
  }
  

  //SEARCH BAR
  const handleInputChangeSearch = (e) => {
    e.preventDefault();
    let entryString = e.target.value;
    let regularExpresion = /^[a-zA-Z0-9\s]{0,20}$/;

    if (regularExpresion.test(entryString)) {
      setProductToFind(e.target.value);
    }
  };

  const searcherMotor = data.filter((item) => {
    
    // This is for search products
    let upperCaseName = item.name ? item.name.toUpperCase() : "";
    let upperCaseProductName = item.product_name ? item.product_name.toUpperCase() : "";
    let upperCaseDescription = item.description ? item.description.toUpperCase() : "";
    let upperCaseType = item.type ? item.type.toUpperCase() : "";
    
   

    return (
      (!upperCaseDescription.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseType.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseProductName.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseName.indexOf(productToFind.toUpperCase())) &&
      (item.status === true)
    );
  });

  //FETCH
  const getData = async () => {
    try {
      const response = await APIUtility.fetchData(`http://localhost:3000/api/${getItems}`);
      setData(response.response);
      console.log(response.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const deleteItem = async () => {
    try {
      const dataDesactivate ={
                idUser:idUser,
                active:false,
          }

      const url = `http://localhost:3000/api/${getItems}/desactivate/${dataToEdit.id}`;
      const response = await APIUtility.putData(url, dataDesactivate);
      console.log('Datos actualizados:', response);
      
    } catch (error) {
      console.error('Error en la petición:', error.message);
      
    }
  };

  useEffect(()=>{
    getData();
  }, [getItems, isModalOpen])


  return (
    <div className='flex flex-col h-full w-full  p-6 '>
        <div className='w-full flex '>
            <input
            id='catalogueSearch'
            name='catalogueSearch'
            type='text'
            placeholder='Buscar...'
            value={productToFind}
            onChange={handleInputChangeSearch}
            autoFocus={true}
            className='pl-3 block w-full rounded-md  py-1.5 text-gray-900 shadow-sm border border-solid border-black placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
            />
        </div>

        <div className='flex my-6 '>
          <button
            type='button'
            onClick={(e)=>{
              e.preventDefault();
              pushTo(routeName);
              activePostHttpMethod();
              setDataToEdit(undefined);

            }}
            className='w-full  flex  h-[40px] justify-center items-center border-2 border-solid border-blue-500   rounded-md bg-white  text-[16px] font-semibold  text-blue-500 hover:text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            Crear Nuevo
          </button>
        </div>

        <div className='flex flex-col  flex-grow overflow-hidden'>

            <div className='mb-3 text-center font-semibold w-full flex flex-row border-b-2 border-solid border-gray-500'>
                <p className='pl-3 text-left w-[50%] md:w-[40%] lg:w-[60%] '>Nombre</p>
                <p className='w-[25%] md:w-[30%] lg:w-[20%] '>Editar</p>
                <p className='w-[25%] md:w-[30%] lg:w-[20%] '>Eliminar</p>
            </div>

            <div className='flex flex-col flex-grow  overflow-y-scroll'>
                {
                  searcherMotor.map((item)=>(
                      <div key={item.id} className=' flex flex-row w-full h-[60px] md:h-fit lg:h-[60px] md:py-3 lg:my-0 border-b border-gray-300 border-solid'>
                            <div className='w-[50%] md:w-[40%] lg:w-[60%] flex flex-col justify-center'>
                              <p className='pl-3 '>{item.name}</p>
                              <p className='pl-3 '>{item.type !== undefined ? item.type : '' +" "} {item.import_quantity !== undefined ? item.import_quantity : '' } </p>
                            </div>
                            <div onClick={(e)=>{
                              e.preventDefault();
                              pushTo(routeName);
                              activePutHttpMethod();
                              setDataToEdit(item);
                
                            }} className='w-[25%] md:w-[30%] lg:w-[20%] flex justify-center items-center'>
                                <button className='text-orange-500 hover:text-white border-2 border-solid border-orange-500 hover:border-orange-800 hover:bg-orange-500 rounded-md h-[40px] w-[40px] flex justify-center items-center'>
                                      <BiPencil className=' w-[20px] h-[30px]'/>
                                </button>
                            </div>
                            <div className='w-[25%] md:w-[30%] lg:w-[20%] flex justify-center items-center'>
                                <button onClick={()=>{
                                  setIsModalOpen(true);
                                  setDataToEdit(item);
                                }} className='text-red-500 hover:text-white border-2 border-solid border-red-500 hover:border-red-800 hover:bg-red-500 rounded-md h-[40px] w-[40px] flex justify-center items-center'>
                                        <BiSolidTrashAlt className=' w-[20px] h-[30px]'/>
                                </button>
                            </div>
                      </div>
                  ))
                }
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
    </div>
  )
}

export default CatalogueList