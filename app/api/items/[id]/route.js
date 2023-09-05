import { conn } from '@/utils/database';
import { cloudinary } from '@/utils/cloudinary';
import { NextResponse } from 'next/server' 


export async function GET(response, request) {
  try {
    const { params } = request;
    const { id } = params;

    const query = 'select p.id, p.name, p.description, p.image, p.status, c.name as category  from tbl_product as p inner join tbl_category as c on p.category_id = c.id where p.id = $1';
    const data = await conn.query(query, [id]); // Debes pasar los parámetros como un array
    const responseData = data.rows[0]; // Cambiado el nombre de la variable para evitar conflicto

    return NextResponse.json({ response: responseData }); // Cambiado el nombre de la variable para evitar conflicto
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}

export async function PUT(response, request) {
  try{
    //Obtenesmos el objeto body de req
    const body = await response.formData();
    const image = body.get("imageName");

    let imageName;
    let query;
    let values;

    //Obtnemos el id del objeto a modificar
    const { params } = request;
    const { id } = params;

    //Destructuramos el objeto body que seran las propiedades del json de los datos
    //que se mandaron
    const name        = body.get("name");
    const description = body.get("description");
    const category    = body.get("category");
    const modified_by = body.get("modified_by");
    const active      = body.get("active");
    
    // Evaluate if exists image
    const isImage = image instanceof Blob;

    if(!isImage) {
      query = "UPDATE TBL_PRODUCT SET name=$1, description=$2, status=$3, category_id=$4, modified_by=$5 WHERE ID = $6";
      //Creamos un array con los valores
      values = [name, description, active, category, modified_by, id];
    }  
    else if (isImage) {

      const bytes = await  image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const cloudResponse = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({}, (err, result) => {
              if(err) {reject(err)}
    
              resolve(result);
        }).end(buffer);
      });

      imageName   = cloudResponse.secure_url;

      query = "UPDATE TBL_PRODUCT SET name=$1, description=$2, image=$3, status=$4, category_id=$5, modified_by=$6 WHERE ID = $7";
      //Creamos un array con los valores
      values = [name, description, imageName, active, category, modified_by, id];
    }
    //Creamos una consulta
    //Creamos una peticion a la base de datos
    const res =  await conn.query(query, values);
    return NextResponse.json({res});
    
    }
    catch(error){
      return NextResponse.json({error :error.message});

    }
}
