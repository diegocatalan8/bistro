import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(response, request) {
  try {
    const { params } = request;
    const { id } = params;

    const query = 'SELECT NAME, LASTNAME, EMAIL FROM TBL_USER WHERE ID = $1';
    
    const data = await conn.query(query, [id]); // Debes pasar los parámetros como un array

    const responseData = data.rows; // Cambiado el nombre de la variable para evitar conflicto
    

    return NextResponse.json({ response: responseData}); // Cambiado el nombre de la variable para evitar conflicto
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(response, request) {
  try{
    //Obtenesmos el objeto body de req
    const body = await response.json()
    console.log(body);
    //Obtnemos el id del objeto a modificar
    const { params } = request;
    const { id } = params;
    console.log(params);
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {name, lastname, email} = body;
    
    //Creamos una consulta
    const query = "UPDATE TBL_USER SET NAME=$1, LAST_NAME=$2, EMAIL=$3 WHERE ID=$4";
    //Creamos un array con los valores
    const values = [name, lastname, email, id];
    //Creamos una peticion a la base de datos
    const res =  await conn.query(query, values);
    return NextResponse.json({res});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}