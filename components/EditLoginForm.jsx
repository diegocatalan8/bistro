"use client"

import React from 'react'
import ProfileForm from './ProfileForm'
import PasswordForm from './PasswordForm'


function EditLoginForm() {

   
  return (
    <div className='flex flex-col h-full w-full p-6 overflow-y-hidden'>
        <div className='mb-6'>
            <h2 className='text-[22px] font-semibold w-full'>Perfil</h2>
            <p>Actualiza tu detalles personales o tu contraseña</p>
        </div>
        <div className='flex flex-col lg:flex-row overflow-y-scroll'>
            <ProfileForm/>
            <PasswordForm/>
        </div>

    </div>
  )
}

export default EditLoginForm