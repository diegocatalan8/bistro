"use client";

import React from 'react';
import { TEInput } from "tw-elements-react";

export default function InputField({classProp='', type='text', id='', label='', size='lg'}){
  return (
      
        <div className={`relative  ${classProp}`}>
          <TEInput
            type={type}
            id={id}
            label={label}
            size={size}
          ></TEInput>
        </div>
    
  );
}