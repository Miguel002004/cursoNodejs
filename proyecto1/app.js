var express = require('express');
var bodyParser = require("body-parser");
var app = express();
//middelware built-in para archivos estaticos en la carpeta /public
//todo lo que está en public se puede acceder mediante la url(como en apache)
/*app.use(express.static('public'));*/
//se puede definir una ruta en el navegador para cada carpeta para no hacer conflicots arriba es de la forma simple
app.use("/public",express.static('public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));//el true hablita varios tipos de paraseo

app.set("view engine", "jade")

app.get("/",function(req,res) {
  res.render("index");
});
app.get("/login",function(req,res) {
  res.render("login");
});
//recibimos el formulario
//req.body.password. accedemos a los elementos de la peticion con su atributo name
app.post("/users",function(req,res) {
  console.log("Contraseña:" + req.body.password);
  console.log("Email:" + req.body.email);
  res.send("recibimos tus datos");
});
app.listen(8080);
