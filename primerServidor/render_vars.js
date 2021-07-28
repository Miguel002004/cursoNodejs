var http = require('http'), fs = require('fs');
http.createServer(function(req, res){
  fs.readFile("./render_var.html",function(err, html){
//combierte el html en string. porque el html es un archivo binario que el navegador interpreta
    var html_string = html.toString();

    //exprecion regular. las funciones tienen un valor match que busca patrones dentro de llaves
    //se pueden usar expresiones regulares para identificar correos, tarjetas de creditos etc
    var variables = html_string.match(/[^\{\}]+(?=\})/g);
    //variables ['nombre']
    var nombre = "miguel";
    for (var i = 0; i < variables.length; i++) {
      //eval es una funcion global que pasa un string y lo ejecuta como codigo de js
     var value = eval(variables[i]);
     //aquí se reemplasa la variable para imprimir miguel xd
     html_string = html_string.replace("{"+variables[i]+"}", value)
   };

    res.writeHead(200, {"Content-DOCTYPE":"text/html"});
    //imprime el resultado de concatenacion
    res.write(html_string);
    res.end();
  });
}).listen(8080);
