//toda ruta en este documento se pone sobre /app (CREO)
var express = require('express');
var router = express.Router();
var Imagen = require("./models/imagenes");
var image_finder_middleware = require("./middlewares/find_image");

router.get("/", (req, res)=> {
  res.render("app/home");
});

router.get("/imagenes/new", (req,res)=>{
res.render("app/imagenes/new");
Imagen.find((err,doc)=>{
  console.log(doc);
});
});
//va a redirigir al middleware find_image.js(mio) todas las rutas con /imagenes + id + todo lo que siga
router.all("/imagenes/:id*", image_finder_middleware);

router.get("/imagenes/:id/edit",(req, res)=>{
  res.render("app/imagenes/edit");
});

router.route("/imagenes/:id").get((req, res)=>{
  res.render("app/imagenes/show");
  console.log(imagen);
}).put((req, res)=>{//editar imagen
  res.locals.imagen.title = req.body.title;
  res.locals.imagen.save((err)=>{
    (!err) ? res.render("app/imagenes/show") : res.render("app/imagenes/"+req.params.id+"/edit")
  });
}).delete((req, res)=>{
//recibe un json de condiciones para Eliminar
Imagen.findOneAndRemove({_id:req.params.id},(err)=>{
  if(!err){
    res.redirect("/app/imagenes");
  }
  else {
    console.log(err);
    res.redirect("/app/imagenes/"+req.params.id);
  }
  });
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
