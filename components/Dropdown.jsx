import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BiChevronDown } from 'react-icons/bi';


function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Dropdown({classProp, list, customClick=()=>{}}) {
  const [selected, setSelected] = useState({name:'Seleccione una opción...'});

  return (
    <Listbox   value={selected} onChange={setSelected}>
      {({ open }) => (
        <>
          <div className={`${classProp} relative mt-2 mb-3`}>
            <Listbox.Button className={`relative w-full h-[46px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-black-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6`}>
              <span className='flex items-center'>
                <BiChevronDown className='text-[32px]'/>
                <span className='ml-3 block truncate'>{selected.name}</span>
              </span>
              <span className='pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2'>
                
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave='transition ease-in duration-100'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Listbox.Options className='absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
                {list.map((item) => (
                  <Listbox.Option
                    key={item.id}
                    onClick={()=>{
                      customClick(item);
                    }}
                    className={({ active }) =>
                      classNames(
                        active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9'
                      )
                    }
                    value={item}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className='flex items-center'>
                        
                          <span
                            className={classNames(
                              selected ? 'font-semibold' : 'font-normal',
                              'ml-3 block truncate'
                            )}
                          >
                            {item.name}
                          </span>
                        </div>

                        {selected ? (
                          <span
                            className={classNames(
                              active ? 'text-white' : 'text-indigo-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4'
                            )}
                          >
                           
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
