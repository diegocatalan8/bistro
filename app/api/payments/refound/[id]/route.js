import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function PUT(response, request) {
    try{
      //Obtenesmos el objeto body de req
      const body = await response.json()
      console.log(body);
      //Obtnemos el id del objeto a modificar
      const { params } = request;
      const { id } = params;
      console.log(id);
      //Destructuramos el objeto body que seran las propiedades del json de los datos
      //que se mandaron
      const {isRefound} = body;
      
      //Creamos una consulta
      const query = "UPDATE TBL_TRANSACTION SET ISREFOUND=$1 WHERE ORDER_ID = $2";
      //Creamos un array con los valores
      const values = [isRefound, id];
      //Creamos una peticion a la base de datos
      const res =  await conn.query(query, values);
      return NextResponse.json({res});
      
      }
      catch(error){
        return NextResponse.json({error :error.message});
      }
  }
  