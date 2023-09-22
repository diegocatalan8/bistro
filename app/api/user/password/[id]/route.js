import { conn } from '@/utils/database';
import { NextResponse } from 'next/server' 

export async function validation(actualPassword, id) {
  try {
      const query ="SELECT PASSWORD FROM tbl_user WHERE ID = $1"
      const values = [id];
      const response =  await conn.query(query, values);
      const data = response.rows[0]


      if (data.password === actualPassword) {
          return {
              validation:true,
          };
      } else {
        return {
          validation:false,
      };
      }
  } catch (error) {
      console.error("Error verifying user credentials:", error);
      return {
        validation:false,
    };
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
    const {actualPassword, newPassword, confirmationPassword} = body;
    //Validacion
    const validationPassword = await validation(actualPassword, id);

    if(validationPassword.validation && newPassword === confirmationPassword){
          //Creamos una consulta
          const query = "UPDATE TBL_USER SET PASSWORD=$1 WHERE ID=$2";
          //Creamos un array con los valores
          const values = [newPassword, id];
          //Creamos una peticion a la base de datos
          const res =  await conn.query(query, values);
          return NextResponse.json({res:res, actualPassword:true, newPassword:true });
    }
    else if(validationPassword.validation === false){
          return NextResponse.json({actualPassword:false, newPassword:true});
    }
    else if(newPassword !== confirmationPassword){
          return NextResponse.json({actualPassword:true, newPassword:false});
    }
    
    }
    catch(error){
      return NextResponse.json({error :error.message});
    }
}