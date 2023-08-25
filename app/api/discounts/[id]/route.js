import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(response, request) {
  try {
    const { params } = request;
    const { id } = params;

    const querySelect = 'SELECT id, name, import_quantity, status, type FROM tbl_discount WHERE id = $1';
    const data = await conn.query(querySelect, [id]); // Debes pasar los parámetros como un array
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
    const {name, import_quantity, type_import, active} = body;
    //Creamos una consulta
    const query = "UPDATE TBL_DISCOUNT SET name=$1, import_quantity=$2, type=$3, status=$4  WHERE ID = $5";
    //Creamos un array con los valores
    const values = [name, import_quantity, type_import, active, id];
    //Creamos una peticion a la base de datos
    const res =  await conn.query(query, values);
    return NextResponse.json({res});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}
