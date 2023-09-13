import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 


export async function GET(){
  try{
    const query = 'SELECT T.ORDER_ID,	T.ISREFOUND, T.TYPE, SUM(T.AMOUNT) AS TOTAL_AMOUNT, O.DESCRIPTION, O.TYPE AS ORDER_TYPE, O.PAYMENT_STATE, O.STATE AS ORDER_STATE,	O.CREATED_AT AS DATE,  O.STATUS AS ORDER_STATUS FROM TBL_TRANSACTION AS T INNER JOIN (SELECT ID, DESCRIPTION, TYPE, PAYMENT_STATE, STATE, CREATED_AT, STATUS FROM TBL_ORDER) AS O ON T.ORDER_ID = O.ID WHERE T.STATUS = TRUE  GROUP BY  T.ORDER_ID, T.ISREFOUND, T.TYPE, O.DESCRIPTION, O.TYPE, O.PAYMENT_STATE, O.CREATED_AT, O.STATE, O.STATUS';
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
    const {amount, method, idUser, idOrder} = body;
    //Creamos una consulta
    const query = "INSERT INTO TBL_TRANSACTION (type, amount, order_id, modified_by, created_by) VALUES($1, $2, $3, $4, $5) RETURNING *";
    //Creamos un array con los valores
    const values = [method, amount, idOrder, idUser, idUser];
    //Creamos una peticion a la base de datos
    const response = await conn.query(query, values);
    console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}