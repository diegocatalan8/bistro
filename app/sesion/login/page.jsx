import InputField from '@/components/InputField';
import Button from '@/components/Button';


export default function Login() {
  
    return (
        <div className='flex flex-col flex-grow  justify-center items-center'>
            <section className=' h-fit w-[75%] md:w-[60%] lg:w-[30%]'>
                  <h2 className='text-4xl font-medium leading-tight w-full'>Ingresar</h2>
                  <form>
                    <InputField classProp='mt-6' label='Ingresa tu correo electronico' />
                    <InputField classProp='mt-6' type='password' label='Ingresa tu contraseña' />
                    <p className='w-full text-primary font-semibold mt-6'><a href='#'>¿Olvidaste tu contraseña?</a></p>
                    <Button type='submit' text='Iniciar Sesión' color='bg-primary' classProp='mt-6 h-[46px] font-semibold'/>
                  </form>
                  
            </section>
        </div>
    )
  }
  