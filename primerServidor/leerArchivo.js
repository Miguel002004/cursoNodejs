var http = require('http'), fs = require('fs');
//===============Leer archivos sincronosXD===========
/*var html = fs.readFileSync("./inde.html");
http.createServer((req,res)=>{
  //mandar html al usuario
  res.write(html);
  res.end();
}).listen(8080);*/
//===================================================


//===============Leer archivos asincrono=============
//readFileSync => readFile
//cada que se actualise la pagina se va a releer los archivos ya que se mete el readFile a create server. pero se puede ponder al reves
http.createServer(function(req, res){
  fs.readFile("./inde.html",function(err, html){
    //writeHead recive un status code y la cabezera. El codigo 200 indica que todo esta bien, el 400 que no se encontro y el 500 que hay errores etc
    // y el tipo de respuesta que estamos enviando es html. no es necesario amenos que enviemos un nuevo tipo de respuesta como json
    res.writeHead(200, {"Content-DOCTYPE":"text/html"});
    /*ejemplo de json:
      res.writeHead(200,{"Content-Type":"application/json"});
      res.write(JSON.stringify({nombre: "Miguel", username:"Miguel123"}));
    */
    res.write(html);
    res.end();
  });
}).listen(8080);
