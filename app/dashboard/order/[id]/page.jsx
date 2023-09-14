'use client'
import React, {useState, useEffect} from 'react';
import APIUtility from '@/services/ApiUtility';
import AddProduct from '@/components/AddProduct';
import CartOfOrders from '@/components/CartOfOrders';


function PageOrder({params}) {

  //GET ID
  const {id} = params;

  //CART LOGIC OPEN
  const [isCartOpen, setIsCartOpen] = useState(true);

  //CATEGORY ACTIVATE
  const [categoryActive, setCategoryActive] = useState("Todos");
  const handleCategoryClick = (value) => {
    if (value === categoryActive) {
      return;
    }
    setCategoryActive(value);
  };

  //GET DATA
  const [categories, setCategories] = useState([]);
  const getCategories = async () => {
    try {
      const categoriesList = await APIUtility.fetchData(`http://localhost:3000/api/category`);
      setCategories(categoriesList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [products, setProducts] = useState([]);
  const getProducts = async () => {
    try {
      const productsList = await APIUtility.fetchData(`http://localhost:3000/api/items`);
      setProducts(productsList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  const [variations, setVariations] = useState([]);
  const getVariations = async () => {
      try {
        const varitionsList = await APIUtility.fetchData(`http://localhost:3000/api/variation`);
        setVariations(varitionsList.response);
        
      } catch (error) {
        console.error('Error');
      } finally {
        //do nothing
      }
  };

  const[orderDetails, setOrderDetails] = useState([]);
  const getOrderDetails = async () => {
    try {
      const ordersList = await APIUtility.fetchData(`http://localhost:3000/api/order/${id}`);
      setOrderDetails(ordersList.response);
      console.log(ordersList.response);
    } catch (error) {
      console.error('Error');
    } finally {
      //do nothing
    }
  };

  //SEARCH BAR
  const [productToFind, setProductToFind] = useState('');
  const handleInputChangeSearch = (e) => {
    e.preventDefault();
    let entryString = e.target.value;
    let regularExpresion = /^[a-zA-Z0-9\s]{0,20}$/;

    if (regularExpresion.test(entryString)) {
      setProductToFind(e.target.value);
      handleCategoryClick('Todos');
    }
  };

  const searcherMotor = products.filter((item) => {
    
    // This is for search products
    let upperCaseName = item.name ? item.name.toUpperCase() : "";
    let upperCaseProductName = item.product_name ? item.product_name.toUpperCase() : "";
    let upperCaseDescription = item.description ? item.description.toUpperCase() : "";
    let upperCaseCategory = item.category ? item.category.toUpperCase() : "";
    
   

    return (
      (!upperCaseDescription.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseCategory.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseProductName.indexOf(productToFind.toUpperCase())) ||
      (!upperCaseName.indexOf(productToFind.toUpperCase())) &&
      (item.status === true)
    );
  });

  //MODAL
  const [isModalOpen, setIsModalOpen] =  useState(false);
  const [dataModal, setDataModal] = useState({});

  const openModal = () =>{
      setIsModalOpen(true);
  }

  const closeModal = () =>{
    setIsModalOpen(false);
}

  //UPDATE THE STATE OF COMPONENT CARTOFORDERS.JS
  const [update, setUpdate] = useState(false);
  const changeState = () =>{
    setUpdate(!update);
  }


  useEffect(()=>{
     getCategories();
     getProducts();
     getVariations();
  }, []);

  useEffect(()=>{
    getOrderDetails();
  }, [update]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsCartOpen(window.innerWidth < 821 ? false : true);
    }
  }, []);

  return (
    <div className='Container relative z-10  w-full h-full flex flex-row'>
          
          <section className={`Section px-5 pt-6 h-full w-[90%] ${isCartOpen ? 'md:w-[50%]' : 'md:w-[95%]'}  lg:w-[65%] xl:w-[70%] flex flex-col `}>
              {/**SEARCH BAR */}
              <div className='w-full flex  mt-10 md:mt-0 xl:mt-3'>
                  <input
                  id='search'
                  name='search'
                  type='text'
                  placeholder='Buscar...'
                  value={productToFind}
                  onChange={handleInputChangeSearch}
                  autoFocus={true}
                  className='pl-2 block w-full rounded-md border border-solid border-gray-400 py-1.5 text-gray-900 shadow-sm  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:text-sm sm:leading-6'
                  />
              </div>
              {/**CATEGORIES */}
              <div className=' min-h-[70px] max-w-full my-3 overflow-hidden'>
                  <div className='flex flex-row justify-start items-center w-full h-full overflow-x-scroll'>
                  <button onClick={()=>{
                      handleCategoryClick('Todos');
                      setProductToFind('');
                  }} className={`rounded-lg w-fit h-[90%] md:min-h-[60%] lg:h-[60%] px-2 mr-3 ${categoryActive === 'Todos' ? 'bg-[#2d69ff] text-white font-semibold shadow-md' : 'bg-white'}`}>
                          Todos
                  </button>
                      {
                        categories.map((category)=>(
                            <button key={category.id} onClick={()=>{
                              handleCategoryClick(category.name);
                              setProductToFind(category.name);
                            }} className={`rounded-lg w-fit h-[90%] md:min-h-[60%] lg:h-[60%] px-3 mr-3 ${categoryActive === category.name ? 'bg-[#2d69ff] text-white font-semibold shadow-md' : 'bg-white'}`}>
                                    {category.name}
                            </button>
                        ))
                      }
                  </div>
              </div>
              {/**PRODUCTS */}
              <div className='pt-4 content-start flex flex-row flex-wrap justify-center md:justify-between w-full h-full overflow-y-auto items-start'>
                    {
                      searcherMotor.map((item)=>(
                        <div key={item.id} onClick={()=>{
                                      if(orderDetails.state === 'registered' && orderDetails.status === true && !orderDetails.payment_state){
                                      openModal();
                                      setDataModal(item);
                                      }else{
                                        console.log('Do nothing');
                                      }
                                    }} className='cursor-pointer p-4 flex flex-col justify-between items-center rounded-xl mb-4 bg-white h-[260px] w-[90%] md:w-[48%] lg:w-[29%]'>

                             <img className='rounded-lg h-[60%] w-[90%]' alt='item' src={item.image}/> 

                             <div className='w-[90%] h-[40%] flex flex-col justify-center items-center'>
                                <p className='w-full font-semibold text-center text-[22px] md:text-[20px] lg:text-[16px] '>
                                  {item.name}
                                </p>
                             </div>
                        </div>
                      ))
                      }

      
              </div>

              <AddProduct
                isModalOpen={isModalOpen}
                customCloseModal={closeModal}
                data={dataModal}
                variations={variations}
                orderId={id}
                changeState={changeState}
              />
          </section>

          <CartOfOrders orderDetails={orderDetails} changeState={changeState} update={update} orderId={id} isCartOpen={isCartOpen} setIsCartOpen={setIsCartOpen}/>

         

    </div>
  )
}

export default PageOrder