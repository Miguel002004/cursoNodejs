module.exports = function (req, res, next) {
  //si no está iniciada sesion lo redirige a iniciar sesion
  if(!req.session.user_id){
    res.redirect("/login");
  }
  else {
    next();
  }
}
