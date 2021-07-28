var http = require('http'), fs = require('fs'),
  //tambien lo importamos como libreria. pero ahora es libreria local
  //pero esto nos arroja un objeto
  parser = require("./params_parser.js"),
  render_html = require("./render_html.js");
  //almacenamos la funcion en una variable. igual podemos exportar datos aparte de funciones
  var p = parser.parse;
  var render1 = render_html.render;
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
    //aqui mandamos el request para que sea filtrado alv
    var parametros = p(req);

    res.writeHead(200, {"Content-DOCTYPE":"text/html"});
    res.write(render1(html_string,parametros));
    res.end();
  });
}).listen(8080);
