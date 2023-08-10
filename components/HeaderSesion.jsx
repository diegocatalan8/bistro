import Image from 'next/image';
import Logo from '@/assets/logo.jpg';

function HeaderSesion() {
  return (
    <nav className='relative flex w-full flex-wrap items-center justify-between bg-[#fff] py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 dark:bg-neutral-600 lg:py-4'>
      <div className='flex w-full flex-wrap items-center justify-between px-3'>
        <div className='ml-2 flex flex-row items-center'>
          <Image
            src={Logo}
            className='h-[80px] w-[80px]'
          />
          <p
            className='h-fit text-xl font-bold text-gray-600 dark:text-neutral-200'
          >
            BISTRO POS
          </p>
        </div>
      </div>
    </nav>
  );
}

export default HeaderSesion;
