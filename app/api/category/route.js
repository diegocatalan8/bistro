import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(){
  
  try{

    const query = 'SELECT * FROM TBL_CATEGORY WHERE STATUS = TRUE';
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
    const body = await request.json()
    //Obtenesmos el objeto body de req
    console.log('Este es el body');
    console.log(body);
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {category} = body;
    //Creamos una consulta
    const query = "INSERT INTO TBL_CATEGORY(NAME) VALUES($1) RETURNING *";
    //Creamos un array con los valores
    const values = [category];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}