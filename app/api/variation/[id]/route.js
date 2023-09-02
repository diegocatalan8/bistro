import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(res, req){
  
  try{
    const {params} = req;
    const {id} = params;
    
    const query = `SELECT v.ID, v.NAME, v.DESCRIPTION, v.PRICE, v.CREATED_BY AS CREATED_BY_ID, v.MODIFIED_BY AS MODIFIED_BY_ID, v.CREATED_AT, v.MODIFIED_AT, v.STATUS, v.PRODUCT_ID, p.NAME AS PRODUCT_NAME, u.NAME as USER_NAME, c.NAME AS CATEGORY_NAME FROM TBL_VARIATION AS v INNER JOIN TBL_PRODUCT AS p ON v.PRODUCT_ID = p.ID INNER JOIN TBL_USER AS u ON  v.created_by = u.id INNER JOIN TBL_CATEGORY AS c ON p.category_id = c.id WHERE v.STATUS = TRUE AND p.STATUS = TRUE AND c.STATUS = TRUE AND V.PRODUCT_ID = $1`

    const data =  await conn.query(query, [id]);
    const response = data.rows;
    
    return NextResponse.json({response});
  }

  catch(error){
    return NextResponse.json({error: error.message });
  }
  }
  
export async function PUT(res, req) {

  try{
    const {params} = req;
    const {id} = params;

    //Obtenesmos el objeto body de req
    const body = await res.json();
    
    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const {name, description, price, product, idUser, active} = body;
    console.log(body);
    //Creamos una consulta
    const query = "UPDATE TBL_VARIATION SET NAME=$1, DESCRIPTION=$2, PRICE=$3, PRODUCT_ID=$4,  MODIFIED_BY=$5, STATUS=$6 WHERE ID = $7";
    //Creamos un array con los valores
    const values = [name, description, price, product, idUser, active, id];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    //console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}