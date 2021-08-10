//toda ruta en este documento se pone sobre /app (CREO)
var express = require('express');
var router = express.Router();
var Imagen = require("./models/imagenes");
var image_finder_middleware = require("./middlewares/find_image");
var fs = require("fs");//para modificar archivos. no es necesaro installar

router.get("/", (req, res)=> {
  Imagen.find({},)
  .populate("creator")
  .exec((err, imagenes)=>{
    (err) ? console.log(err) : res.render("app/home",{imagenes:imagenes});
  });
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
  //se puede dejar el json vacio(solamente las llaves) para mostrar todas las imagenes
  Imagen.find({creator: res.locals.user._id}, (err, imagenes)=>{
    if (err) {res.redirect("/app");return}
    res.render("app/imagenes/index", {imagenes:imagenes});
  });
}).post((req, res)=>{
  var extension = req.files.archivo.name.split(".").pop();//extraemos la extension del archivo
  console.log("EXTENSION: "+extension);
  console.log("usuarioid: "+res.locals.user._id);
  console.log("==========info archivo==========");
  console.log(req.files.archivo);
  console.log("================================");
 var data = {
   //titulo de la imagen
   title: req.body.title,
   //se asigna el usuario en locals con el middleware find_image.js
   creator: res.locals.user._id,
   extension:extension
 }
 console.log(req.body.title);
 var imagen = new Imagen(data);
 imagen.save(function (err) {
   if(!err){
     fs.rename(req.files.archivo.path, 'public/imagenes/'+imagen._id+'.'+extension, (errfile)=>{
       if (errfile) {
         console.log(errfile);
       }
     });//mueve el archivo del folder temporal a nuestra carpeta de imagenes
     res.redirect("/app/imagenes/"+imagen._id);
   }
   else {
     console.log(imagen);
     res.render(err);
   }
 });
});
module.exports = router;
