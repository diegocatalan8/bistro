import { conn } from '@/utils/database';
import { NextResponse } from 'next/server';


export async function GET(){
  
  try{

    const query = 'select p.id, p.name, p.description, p.image, p.status, p.category_id, c.name as category from tbl_product as p inner join tbl_category as c on p.category_id = c.id where p.status = true';
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
    const {name, description, imageName, category, idUser} = body;
    
    //Creamos una consulta
    const query = "INSERT INTO TBL_PRODUCT(NAME, DESCRIPTION, IMAGE, CATEGORY_ID, CREATED_BY, MODIFIED_BY) VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    //Creamos un array con los valores
    const values = [name, description, imageName, category, idUser, idUser];
    //Creamos una peticion a la base de datos
    const response =  await conn.query(query, values);
    //console.log(response);
    return NextResponse.json({response});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}