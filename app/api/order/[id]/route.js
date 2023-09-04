import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(response, request) {
  try {
    const { params } = request;
    const { id } = params;

    const query = 'SELECT * FROM TBL_ORDER WHERE ID = $1';
    const data = await conn.query(query, [id]); // Debes pasar los parámetros como un array
    const responseData = data.rows[0]; // Cambiado el nombre de la variable para evitar conflicto

    return NextResponse.json({ response: responseData }); // Cambiado el nombre de la variable para evitar conflicto
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(response, request) {
  try{
    //Obtenesmos el objeto body de req
    const body = await response.json()

    //Obtnemos el id del objeto a modificar
    const { params } = request;
    const { id } = params;
    
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {payment_state, state, discount_id, modified_by, status} = body;
    //Creamos una consulta
    const query = "UPDATE TBL_ORDER SET payment_state=$1, state=$2, discount_id=$3, modified_by=$4, status=$5 WHERE ID = $6";
    //Creamos un array con los valores
    const values = [payment_state, state, discount_id, modified_by, status, id];
    //Creamos una peticion a la base de datos
    const res =  await conn.query(query, values);
    return NextResponse.json({res});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});

    }
}
