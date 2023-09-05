import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(response, request) {
  try {
    const { params } = request;
    const { id } = params;


    const query = 'SELECT C.ID, C.VARIATION_ID, C.ORDER_ID, C.QUANTITY, C.NOTE, P.NAME AS PRODUCT_NAME, P.IMAGE, O.ID AS ID_ORDER, O.DESCRIPTION AS ORDER_DESCRIPTION, V.NAME, V.DESCRIPTION, V.PRICE, C.QUANTITY * V.PRICE AS SUBTOTAL, SUM(C.QUANTITY * V.PRICE) OVER () AS SUM_TOTAL FROM TBL_PRODUCT_CART AS C INNER JOIN TBL_VARIATION AS V ON C.VARIATION_ID = V.ID INNER JOIN TBL_ORDER AS O ON C.ORDER_ID = O.ID INNER JOIN TBL_PRODUCT AS P ON V.PRODUCT_ID = P.ID  WHERE C.STATUS = TRUE AND O.ID = $1';

    const data = await conn.query(query, [id]); // Debes pasar los parámetros como un array
    const responseData = data.rows; // Cambiado el nombre de la variable para evitar conflicto

    return NextResponse.json({ response: responseData }); // Cambiado el nombre de la variable para evitar conflicto
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
    const {active, idItem} = body;
    
    //Creamos una consulta
    const query = "UPDATE TBL_PRODUCT_CART SET STATUS=$1 WHERE ORDER_ID = $2 AND ID=$3";
    //Creamos un array con los valores
    const values = [active, id, idItem];
    //Creamos una peticion a la base de datos
    const res =  await conn.query(query, values);
    return NextResponse.json({res});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}
