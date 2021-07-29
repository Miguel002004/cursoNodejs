var express = require('express');
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var app = express();
var Schema = mongoose.Schema;

//conectando a mongodb. el pedazo de linea despues de la coma es ncecsario lo indica la documentacion oficial
mongoose.connect("mongodb://localhost/fotos",{useNewUrlParser: true, useUnifiedTopology: true});
var useSchemaJSON = {
  email:String,
  password:String
}

var user_Schema = new Schema(useSchemaJSON);
var User = mongoose.model("User",user_Schema);

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
  //consulta todos los datos de la base de datos
  User.find((err,doc)=>{
    console.log(doc);
    res.render("login");
  });
});
//recibimos el formulario
//req.body.password. accedemos a los elementos de la peticion con su atributo name
app.post("/users",function(req,res) {
  var user = new User({email:req.body.email, password:req.body.password});
  //callback para saber cuando ya se guardaron los datos y ver errores
  user.save(()=>{res.send("recibimos tus datos");});
});
app.listen(8080);
