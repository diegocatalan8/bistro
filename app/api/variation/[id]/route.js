import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(res, req){
  
  try{
    const {params} = req;
    const {id} = params;
    
    const query = 'select v.id, v.name, v.description, v.price, v.status, v.product_id, p.name as product_name, v.created_by as created_by_id, v.modified_by as modified_by_id, u.name as user_name, v.created_at, v.modified_at from tbl_variation as v inner join tbl_product as p on v.product_id = p.id inner join tbl_user as u on  v.created_by = u.id where v.status = true and v.id = $1;'

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