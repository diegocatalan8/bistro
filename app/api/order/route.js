import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(){
  try{
    const query = 'SELECT * FROM TBL_ORDER WHERE PAYMENT_STATE = FALSE AND STATUS = TRUE ';
    const data =  await conn.query(query);
    const response = data.rows;
    
    return NextResponse.json({response});
  }

  catch(error){
    return NextResponse.json({error: error.message });
  }
  }

export async function POST(request) {
  try{
     //Obtenesmos el objeto body de req
    const body = await request.json()
    console.log(body);
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {type_order, description, idUser} = body;
    //Creamos una consulta
    const query = "INSERT INTO TBL_ORDER (description, type, created_by, modified_by) VALUES($1, $2, $3, $4) RETURNING *";
    //Creamos un array con los valores
    const values = [description, type_order, idUser, idUser];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}