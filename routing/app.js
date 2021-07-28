var express = require('express');
var app = express();
app.set("view engine", "jade")
app.get("/",function(req,res) {
  res.render("index",{hola: "hola miguel"});
});
app.post("/",(req,res)=>{
  res.render("form");
});
//  /:nombre se combierte en una especie de exprecion regular que obtiene todo despues de /
// en pocas palabras accede a la funcion cada que hay un /:[cualquier texto]  
app.get("/:nombre",(req,res)=>{
  // req.params.nombre obtiene los parametros de la url
  res.render("form", {nombre: req.params.nombre});
});
app.listen(8080);
