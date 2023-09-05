import {Pool} from 'pg';

let conn;


if(!conn){
   
    conn = new Pool({
        user:'',
        password:'',
        host:'',
        port: '',
        database: ''
    })
}

export {conn};