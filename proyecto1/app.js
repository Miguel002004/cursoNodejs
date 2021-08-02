var express = require('express');
var bodyParser = require("body-parser");
var app = express();
var User = require("./models/user").User;

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
app.get("/signup",function(req,res) {
  //consulta todos los datos de la base de datos
  User.find((err,doc)=>{
    console.log(doc);
    res.render("signup");
  });
});
app.get("/login",function(req,res) {
    res.render("login");
});
//recibimos el formulario
//req.body.password. accedemos a los elementos de la peticion con su atributo name
app.post("/users",function(req,res) {
  var user = new User({email:req.body.email,
                       password:req.body.password,
                       password_confirmation: req.body.password_confirmation,
                       username: req.body.username});
  console.log(user.password_confirmation);
/*  ===========guardar con callback(acsincrono)============
//callback para saber cuando ya se guardaron los datos y ver errores
  user.save((err)=>{
    if (err) {
      console.log(String(err));
    }
    res.send("recibimos tus datos");});
});*/

//guardar con promesa
user.save().then(function (usuario_promesa) {
  res.send("guardamos el usuario exitosamente");
}, function(err) {
  if (err) {
    console.log(String(err));
    res.send("hubo un error al guardar el usuario");
  }});
});
app.post("/sessions",function(req,res) {
  //es como un select en mongodb
  User.findOne({email:req.body.email, password:req.body.password},function(err,docs) {
    //arriba, se puede usar el User.find el problema es que si hay documentos(regostros) duplicados los traé todos
    console.log(docs);
    res.send("hola mundo");
  });
});
app.listen(8080);
