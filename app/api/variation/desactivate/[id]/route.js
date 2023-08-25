import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function PUT(res, req) {

    try{
      const {params} = req;
      const {id} = params;
  
      //Obtenesmos el objeto body de req
      const body = await res.json();
      
      //Destructuramos el objeto body que seran las propiedades del json de los datos
      //que se mandaron
      const {idUser, active} = body;
      console.log(body);
      //Creamos una consulta
      const query = "UPDATE TBL_VARIATION SET  MODIFIED_BY=$1, STATUS=$2 WHERE ID = $3";
      //Creamos un array con los valores
      const values = [idUser, active, id];
      //Creamos una peticion a la base de datos
      const response =  await conn.query(query, values);
      //console.log(response);
      return NextResponse.json({response});
      
      }
      catch(error){
        return NextResponse.json({error :error.message});
      }
  }