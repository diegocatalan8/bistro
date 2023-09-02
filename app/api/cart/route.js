import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(){
  
  try{

    const query = 'SELECT C.ID, C.VARIATION_ID, C.ORDER_ID, C.QUANTITY, C.NOTE, V.NAME, V.DESCRIPTION, V.PRICE FROM TBL_PRODUCT_CART AS C INNER JOIN TBL_VARIATION AS V ON C.VARIATION_ID = V.ID WHERE C.STATUS = TRUE';
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
    const body = await request.json();
    
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {variationId, orderId, quantity, note} = body;
    
    //Creamos una consulta
    const query = "INSERT INTO TBL_PRODUCT_CART(VARIATION_ID, ORDER_ID, QUANTITY, NOTE) VALUES($1, $2, $3, $4) RETURNING *";
    //Creamos un array con los valores
    const values = [variationId, orderId, quantity, note];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    //console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}