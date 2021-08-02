var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conectando a mongodb. el pedazo de linea despues de la coma es ncecsario lo indica la documentacion oficial
mongoose.connect("mongodb://localhost/fotos",{useNewUrlParser: true, useUnifiedTopology: true});

var user_Schema = new Schema({
  name:String,
  username:String,
  password: String,
  age:Number,
  email:String,
  date_of_birth:Date
});

var User = mongoose.model("User",user_Schema);
module.exports.User = User;
