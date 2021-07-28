function parse(req) {
  var array_parametros = [], parametros = {};
  //esto es para verificar que nos est+en mandandando datos por la url en peticion get
  if (req.url.indexOf("?")>0){
    //req.url = ?nombre=miguel
    var url_data = req.url.split('?');
    //separamos todos los datos que nos puedan mandar
    array_parametros = url_data[1].split('&');
  }
  for (var i = 0; i < array_parametros.length; i++) {
      var param_data = array_parametros[i].split('=');
      //[nombre,miguel] => {nombre:miguel}
      parametros [param_data[0]] = param_data[1];
  }
  return parametros;
}
//exportamos la funcion parse para que se pueda acceder a ella atravez de otros archivos
// es como hacerla publica
module.exports.parse = parse;
