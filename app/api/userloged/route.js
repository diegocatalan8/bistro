import { NextResponse } from 'next/server' 
import { cookies } from "next/headers";
import  jwt  from 'jsonwebtoken';


export  async function  POST(request){
    
        //obtenermos la cookie
        const cookieStore = cookies()
        const myTokenName = cookieStore.get('MyToken');

        //vemos si existe la cookie
        if(!myTokenName){
            return NextResponse.json('No existe la cookie');
        }

        const decoded = jwt.verify(myTokenName.value, 'secret');

        console.log(decoded);

        return NextResponse.json({response: decoded});
}