var http = require('http'), fs = require('fs');
http.createServer(function(req, res){
  /*
  Si hacemos un log al req podemos ver toda la solicitud que el navegador le manda al servidor.
  Esa solicitud es en formato json y por eso se hace req.url.
  }
  */
  //este if es para descartar la segunda peticion que hace la pagina para pedir el favicon
  if (req.url.indexOf("favicon.ico")>0) {return;}


  fs.readFile("./form_params.html",function(err, html){
    var html_string = html.toString();
    var array_parametros = [], parametros = {};
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    var nombre = "miguel";
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

    for (var i = 0; i < variables.length; i++) {
     var value = eval(variables[i]);
     var variable = variables[i];
     html_string = html_string.replace("{"+variables[i]+"}", parametros[variable])
   };

    res.writeHead(200, {"Content-DOCTYPE":"text/html"});
    res.write(html_string);
    res.end();
  });
}).listen(8080);
