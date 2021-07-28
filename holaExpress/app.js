var express = require('express');
//obtiene el objeto que contiene la app
var app = express();
//cuando alguien acceda a direccion /(vacia) hacemos una peticion get que recibe un callback
//y retorna req y res
app.get("/",function(req,res) {
  res.send("hola mundo")
  //no tenemos que cerrar la coneccion por que express la cierra automaticamente
})
//inicia el servidor express
app.listen(8080);
