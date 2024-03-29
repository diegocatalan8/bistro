import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(){
  
  try{

    const query = `SELECT v.ID, v.NAME, v.DESCRIPTION, v.PRICE, v.CREATED_BY AS CREATED_BY_ID, v.MODIFIED_BY AS MODIFIED_BY_ID, v.CREATED_AT, v.MODIFIED_AT, v.STATUS, v.PRODUCT_ID, p.NAME AS PRODUCT_NAME, u.NAME as USER_NAME, c.NAME AS CATEGORY_NAME FROM TBL_VARIATION AS v INNER JOIN TBL_PRODUCT AS p ON v.PRODUCT_ID = p.ID INNER JOIN TBL_USER AS u ON  v.created_by = u.id INNER JOIN TBL_CATEGORY AS c ON p.category_id = c.id WHERE v.STATUS = TRUE AND p.STATUS = TRUE AND c.STATUS = TRUE`

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
    const { product, name, price, description, idUser} = body;
    
    //Creamos una consulta
    const query = "INSERT INTO TBL_VARIATION(NAME, DESCRIPTION, PRICE, PRODUCT_ID, CREATED_BY, MODIFIED_BY) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    //Creamos un array con los valores
    const values = [name, description, price, product, idUser, idUser];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    //console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}