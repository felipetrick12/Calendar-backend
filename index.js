const express = require('express');
const { dbConection } = require('./database/config');
var cors = require('cors');
require('dotenv').config();

//requerir el env que se creo, es para crear variables

const app = express();

//Base de Datos de

dbConection();

//Cors
app.use(cors());

//directorio publico
// middleware es una peticion que se ejecuta cuando pasa por un lugar
app.use( express.static('public'));

app.use( express.json() ); //es para ejecutar la funcion para que escuche los json y los cargue

//rutas// llama al middleware funcion donde el path es api,auth y lo extrae del routes,auth
app.use( '/api/auth',require('./routes/auth')); 
app.use( '/api/events',require('./routes/events')); 

//escuchar peticiones
app.listen(process.env.PORT,()=>{
    console.log(`servidor corriendo en puerto ${process.env.PORT}`);
})


