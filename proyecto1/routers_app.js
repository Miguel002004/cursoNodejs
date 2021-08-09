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
  //se pasa un json con el id del usuario para que muestre solamente las imagenes que creo el mismo
  Imagen.find({creator: res.locals.user._id}, (err, imagenes)=>{
    if (err) {res.redirect("/app");return}
    res.render("app/imagenes/index", {imagenes:imagenes});
  });
}).post((req, res)=>{
  console.log("usuarioid: "+res.locals.user._id);
 var data = {
   //titulo de la imagen
   title: req.body.title,
   //se asigna el usuario en locals con el middleware find_image.js
   creator: res.locals.user._id
 }
 console.log(req.body.title);
 var imagen = new Imagen(data);
 imagen.save(function (err) {
   if(!err){
     res.redirect("/app/imagenes/"+imagen._id);
   }
   else {
     console.log(imagen);
     res.render(err);
   }
 });
});
module.exports = router;
