import { NextResponse } from 'next/server' 
import { cookies } from "next/headers";


export  async function  POST(request){
    
        //obtenermos la cookie
        const cookieStore = cookies()
        const myTokenName = cookieStore.get('MyToken')

        console.log(myTokenName);

        //vemos si existe la cookie
        if(!myTokenName){
            return NextResponse.json('No existe la cookie');
        }

        cookieStore.delete('MyToken');

        return NextResponse.json('Cookie Eliminada');
    
}