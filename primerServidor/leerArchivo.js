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
    res.write(html);
    res.end();
  });
}).listen(8080);
