import { NextResponse } from 'next/server'
import { cookies } from "next/headers";
import jwt from 'jsonwebtoken';


export  async function middleware(request) {

  //obtenermos la cookie
  const cookieStore = cookies()
  const jasonwebtoken = cookieStore.get('MyToken')

 
  //Verificamos si es igual a undefined
  if(jasonwebtoken === undefined){
    console.log("JWT ES UNDEFINED");
    return NextResponse.redirect(new URL("/sesion/login", request.url));
  }

  try{
    return NextResponse.next('Successfully');

  }catch(e){
    console.log(e);
    return NextResponse.redirect(new URL("/sesion/login", request.url));
  }
  
}

export const config = {
    matcher: ['/dashboard', '/dashboard/catalogue', '/dashboard/configurations', '/dashboard/order', '/dashboard/transactions']
}
