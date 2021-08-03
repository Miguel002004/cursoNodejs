var User = require("../models/user").User;

module.exports = function (req, res, next) {
  //si no está iniciada sesion lo redirige a iniciar sesion
  if(!req.session.user_id){
    res.redirect("/login");
  }
  else {
    User.findById(req.session.user_id, (err,user)=>{
      if(err){
        console.log(err);
        res.redirect("/login");
      }
      else{
        res.locals = {user: user};
        next();
      }
    });
  }
}
