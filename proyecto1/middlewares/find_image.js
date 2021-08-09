//importando modelo de imagens (mongoose)
var Imagen = require("../models/imagenes");
var owner_check = require("./image_permission");

module.exports = function (req, res, next) {
  //el populate es como hacer un join en sql
  Imagen.findById(req.params.id)
    .populate("creator")
    .exec(function (err,imagen) {
            if (imagen != null && owner_check(imagen, req, res)) {
              console.log("encontré la imagen" + imagen.title+" --creador: "+imagen.creator);
              res.locals.imagen = imagen;
              next();
            }
            else {
              res.redirect("/app");
            }
          });
}
