var mongoose = require("mongoose");
var Schema = mongoose.Schema;

//conectando a mongodb. el pedazo de linea despues de la coma es ncecsario lo indica la documentacion oficial
mongoose.connect("mongodb://localhost/fotos",{useNewUrlParser: true, useUnifiedTopology: true});

var posibles_valores=['M','F'];
var email_match= [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "coloca un email valido"];

var user_Schema = new Schema({
  name:String,
  username:{type:String, required:true, maxlength:[50, "username muy grande"]},
  password: {
    type:String,
    minlength:[8,"la contraseña tiene que tener más de 8 caracteres"],
    validate: {
      validator:function(password_validate) {
      return this.password_confirmation == password_validate;
    },
    message: "las contraseñas no son iguales"
      }
    },
  age:{type:Number, min:[5, "la edad no puede ser menor a 5 años"], max:[100,"la edad no puede ser mayor a 100 años"]},
  email:{type:String, required: "El correo es obligatorio", match:email_match},
  date_of_birth:Date,
  //enum no permite ingresar valores diferentes a los declarados en posibles_valores
  sex:{type: String, enum:{values: posibles_valores, message:"opcion no valida"}}
});

user_Schema.virtual("password_confirmation").get(function () {
  return this.p_c;
}).set(function (password) {
  this.p_c = password;
});

var User = mongoose.model("User",user_Schema);
module.exports.User = User;
