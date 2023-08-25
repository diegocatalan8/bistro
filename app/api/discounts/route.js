import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(){
  
  try{

    const query = 'SELECT id, name,  import_quantity, status, type  FROM  TBL_DISCOUNT WHERE status= TRUE';
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
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {name, import_quantity, type_import} = body;
    //Creamos una consulta
    const query = "INSERT INTO TBL_DISCOUNT(NAME, IMPORT_QUANTITY, TYPE) VALUES($1, $2, $3) RETURNING *";
    //Creamos un array con los valores
    const values = [name, import_quantity, type_import];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}