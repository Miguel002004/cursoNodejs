var express = require('express');
var app = express();
//middelware built-in para archivos estaticos en la carpeta /public
//todo lo que está en public se puede acceder mediante la url(como en apache)
/*app.use(express.static('public'));*/
//se puede definir una ruta en el navegador para cada carpeta para no hacer conflicots arriba es de la forma simple
app.use("/estatico",express.static('public'));

app.set("view engine", "jade")

app.get("/",function(req,res) {
  res.render("index");
});
app.get("/login",function(req,res) {
  res.render("login");
});
app.listen(8080);
