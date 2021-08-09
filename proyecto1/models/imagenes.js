var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var img_Schema = new Schema({
  title:{type:String, required:true},
  //es como una llave foranea de una base de datos sql. que hace referencia al modelo User 
  creator:{type: Schema.Types.ObjectId, ref: "User"}
});

var Imagen = mongoose.model("Imagen", img_Schema);

module.exports = Imagen;
