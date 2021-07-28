var express = require('express');
//obtiene el objeto que contiene la app
var app = express();
//decimos que el motor de vistas es jade
app.set("view engine", "jade")
//cuando alguien acceda a direccion /(vacia) hacemos una peticion get que recibe un callback
//y retorna req y res
app.get("/",function(req,res) {
  //cuando alguien entre a / se muestra el index.jade. no es necesario ponder la extencion
  res.render("index",{hola: "hola miguel"});
  //no tenemos que cerrar la coneccion por que express la cierra automaticamente
})
//inicia el servidor express
app.listen(8080);
