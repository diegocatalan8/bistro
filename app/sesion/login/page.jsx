'use client';

import LoginForm from '@/components/LoginForm';

export default function Login() {


  return (
    <div className='bg-white flex flex-col flex-grow  justify-center items-center'>
      <div className=' flex h-fit w-[90%] md:w-[60%]  lg:w-[30%]  flex-col justify-center px-6 py-12 lg:px-8'>
        <div className='w-full '>
          <h2 className='mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>
            Inciar Sesion
          </h2>
        </div>

        <div className='mt-10 flex flex-col justify-center items-center w-full '>
          <LoginForm/>
        </div>
      </div>
    </div>
  );
}
