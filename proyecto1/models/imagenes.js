var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var img_Schema = new Schema({
  title:{type:String, required:true}
});

var Imagen = mongoose.model("Imagen", img_Schema);

module.exports = Imagen;
