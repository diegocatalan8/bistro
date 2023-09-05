import { v2 } from 'cloudinary';
          
v2.config({ 
  cloud_name: '', 
  api_key: '', 
  api_secret: '' 
});

let cloudinary;


if(!cloudinary){
  cloudinary = v2;
}

export {cloudinary};