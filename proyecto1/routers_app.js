//toda ruta en este documento se pone sobre /app (CREO)
var express = require('express');
var router = express.Router();
var Imagen = require("./models/imagenes");

router.get("/", (req, res)=> {
  res.render("app/home");
});

router.get("/imagenes/new", (req,res)=>{
res.render("app/imagenes/new");
Imagen.find((err,doc)=>{
  console.log(doc);
});
});

router.get("/imagenes/:id/edit",(req, res)=>{
  Imagen.findById(req.params.id, function (err, imagen) {
    res.render("app/imagenes/edit", {imagen:imagen});
  });
});

router.route("/imagenes/:id").get((req, res)=>{
  Imagen.findById(req.params.id, function (err, imagen) {
    //se pasa la imagen como parametro al reder de show.jade
    res.render("app/imagenes/show", {imagen:imagen});
    console.log(imagen);
  });
}).put((req, res)=>{//editar imagen
  Imagen.findById(req.params.id, function (err, imagen) {
    imagen.title = req.body.title;
    imagen.save((err)=>{
      (!err) ? res.render("app/imagenes/show", {imagen:imagen}) : res.render("app/imagenes/"+imagen.id+"/edit", {imagen:imagen})
    });
  });
}).delete((req, res)=>{

});

//coleccion de imagenes
router.route("/imagenes").get((req, res)=>{
  //se pasa un json vacio para que muestre todas las imagenes
  Imagen.find({}, (err, imagenes)=>{
    if (err) {res.redirect("/app");return}
    res.render("app/imagenes/index", {imagenes:imagenes});
  });
}).post((req, res)=>{
 var data = {
   //titulo de la imagen
   title: req.body.title
 }
 console.log(req.body.title);
 var imagen = new Imagen(data);
 imagen.save(function (err) {
   if(!err){
     res.redirect("/app/imagenes/"+imagen._id);
   }
   else {
     res.render(err);
   }
 });
});
module.exports = router;
