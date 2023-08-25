import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(){
  
  try{

    const query = 'select v.id, v.name, v.description, v.price, v.status, v.product_id, p.name as product_name, v.created_by as created_by_id, v.modified_by as modified_by_id, u.name as user_name, v.created_at, v.modified_at from tbl_variation as v inner join tbl_product as p on v.product_id = p.id inner join tbl_user as u on  v.created_by = u.id where v.status = true ;'
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