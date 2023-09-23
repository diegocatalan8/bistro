import  jwt  from "jsonwebtoken";
import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 
import { cookies } from "next/headers";



export async function validation(email, password) {
    try {
        const query ="SELECT id, email, password FROM tbl_user WHERE email = $1"
        const values = [email];
        const response =  await conn.query(query, values);
        const data = response.rows[0]


        if (data.email === email && data.password === password) {
            return {
                validation:true,
                id:data.id
            };
        } else {
            return false;
        }
    } catch (error) {
        console.error("Error verifying user credentials:", error);
        return false;
    }
    
}

export  async function  POST(request){
    //obtenemos de request.body el email y el password enviado
    const body = await request.json()
    //destructuramos body
    const {user, password} = body;

    //validamos si el usuario es correcto
    const isValidUser = await validation(user, password);

    if (isValidUser.validation) {
        //creamos un token con el metodo sign\
        //Variable con el que se crea el token
        const token = jwt.sign({
           exp: Math.floor(Date.now()/ 1000) + 60 * 60  *24 * 30,
           id:isValidUser.id,
           user: user,
           password:password,

        }, 'secret');


       //Seteamos la cookie
       const myCookie = cookies();
       myCookie.set('MyToken', token, {
        httpOnly:true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path:'/',

       })
      
       //creamos un header y lo enviamos con la cookie
       return NextResponse.json({
        message:'Succesfully',
        id:isValidUser.id
       });
    }  

    return NextResponse.json({ status: 401, body: { error: 'Invalid email or password' } });
    
}



