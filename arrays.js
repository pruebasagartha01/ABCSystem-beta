var require$$0 = require('mysql2');

const mysql = require$$0;

const MYSQL_DB_HOST = "localhost";
const MYSQL_DB_USER = "pepito";
const MYSQL_DB_PASSWORD = "11111";
const MYSQL_DB_NAME = "pepito";


const abecedario =['a','b','c','d','e','f','g','h','i','j','k','l','m','n','ñ','o','p','q','r','s','t','u','v','w','x','y','z']

const email = ['@'&&'.com','.es','.cl','.net','.org','.edu','.gob']

const contact = []

var conexión = mysql.createConnection({
    host     : MYSQL_DB_HOST,
    user     : MYSQL_DB_USER,
    password : MYSQL_DB_PASSWORD,
    database : MYSQL_DB_NAME,    
});
conexión.connect(function (error){
    if(error){
        throw error;
    }else{
        console.log('conexion a tabla usuarios exitosa');
    }
});
conexión.query('SELECT * FROM usuarios', function (error,filas){
    val = [];
    if(error){
        throw error;
    }
    filas.forEach(fila => {
        val.push(fila['contacto'])
        console.log('desde la base de datos: ',val)
        }
        )
        contact.push(val)
    }
    )

conexión.end();

module.exports = {
    email,
    abecedario
}


