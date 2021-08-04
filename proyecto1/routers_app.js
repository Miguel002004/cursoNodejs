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

});

router.route("/imagenes/:id").get((req, res)=>{
  Imagen.findById(req.params.id, function (err, imagen) {
    //se pasa la imagen como parametro al reder de show.jade
    res.render("app/imagenes/show", {imagen:imagen});
    console.log(imagen);
  })
}).put((req, res)=>{

}).delete((req, res)=>{

});

//coleccion de imagenes
router.route("/imagenes").get((req, res)=>{

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
