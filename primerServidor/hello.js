//manda llamar la libreria http para comunicarse con el servidor
var http = require('http');
//recive un objeto con la solicitud del usuario y el otro es la respuesta
//la funcion se ejecuta cada que el navegador hace una peticion
 var servidor = http.createServer((solicitud, respuesta)=>{
   console.log('hola mundo');
   //cierra la coneccion
   respuesta.end("hola mundo nodejs");
 });

servidor.listen(8080);
