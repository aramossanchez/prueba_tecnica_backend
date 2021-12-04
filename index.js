const express = require('express');
const router = require('./router.js');
const db = require('./db.js');
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 4000;

var corsOptions = {//CONFIGURO OPCIONES DE CORS
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(express.json());
app.use(cors(corsOptions));

//RUTAS
app.use(router);

db.then(()=>{
        app.listen(PORT, ()=> console.log(`SERVIDOR LEVANTADO EN PUERTO ${PORT}`));
    })
    .catch((err)=> console.log(err.message));   