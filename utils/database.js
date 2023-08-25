import {Pool} from 'pg';

let conn;


if(!conn){
   
    conn = new Pool({
        user:'postgres',
        password:'bistro',
        host:'localhost',
        port: 5432,
        database: 'bistro'
    })
}

export {conn};