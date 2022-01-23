//Common JS no es propia de JS, no la acepta de forma nativa
//const express = require('express');
import express from 'express';
import router from './routes/index.js';
import db from './config/db.js';

import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'});


const app = express();

//Conectar db
db.authenticate()
    .then(()=> console.log('Base de datos conectada'))
    .catch(error=>console.log(error));
    


//Habilitar pug
app.set('view engine', 'pug');

//Obtener el año actual
app.use((req, res, next)=>{
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombresitio = 'Agencia de Viajes'
    return next();
});

// Agregar el body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

//Definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/', router);

/* Puesto y host para la app */
const host = process.env.HOST || '0.0.0.0';
//Definir puerto
const port = process.env.PORT || 4000;

app.listen(port, host, ()=>{
    console.log(`El servidor esta funcionando en el puerto ${port} y host ${host}`);
});
