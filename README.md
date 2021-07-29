# Curso Nodejs

node está separado en diferentes librerias o modulos. Se pueden importar con `require("http");`

para ejecutar un archivo de node se escribe `node [nombre del archivo]`

para que el navegador termine de cargar la pagina tenemos que cerrar la conexion 

---

## variables en una vista

esto es para renderizar el valor de una variable en el codigo html

por ejemplo en html tener: `<h1> hola  {{nombre}}</h1>` y en js `hola = "miguel"`

para que al renderizar la pagina el resultado sea `<h1> hola miguel </h1>`

## npm

para instalar un npm podemos usar el comando `npm install [paquete] --save`

cuando se instalan paquetes se crean archivos .json que indican que paquetes están siendo usados. Entonces usamos --save para que se agreguen el nombre de los paquetes al mismo archivo. de esa forma, si estamos usando git. el otro usuario simplemente hace un `npm install` para instalar todo de un solo comando.

es importante hacer un archivo `.gitignore` para no agregar los modulos de los paquetes. ya que estos modulos cambian. pero se installan con npm install

## jade

jade es un motor de vistas(render) para html que hace buena sinergia con express

y usa lenguaje con iteraciones. parecido a python y es una especie de traductor

las vistas creadas se tienen que crear en una carpeta llamada `views` y los archivos son `.jade`

`!= hola` significa que hay una variable "hola"

cuando hay un `-` al principio de una line significa que es codigo $js$ que se ejecuta en el servidor

el `=` ejecuta e imprime el codigo js

el  `p!=<h1>hola</h1>` ejecuta el codigo html como tal

**interpolacion o concatenacion entre texto y js**

se usa el

`p hola #{arreglo[i]}`

para concatenar texto y javascript 

```jade
h1!= hola
    - var arreglo = [1,2,3,4,5];
    - for (var i = 0; i < arreglo.length; i++)
      p hola #{arreglo[i]}
```

## Express

Una aplicacion express es en pocas palabras una serie de funciones middelware ejecutandose

**¿que es un middelwere?**

request-response cycle

recibimos una peticion ===> mandamos una respuesta

todo lo que se hace en medio de esas peticiones (en la flecha) es en donde trabajamos con express y hay acceso al request y al response. 

se pueden tener varios middelwere ejecutandose en una peticion

durante el proceso de respuesta hay  una pilade funciondes middelware ejecutandose. cada una puede llamar a la siguiente o terminar el ciclo

### Tipos de middelware

+ **Nivel aplicacion:** es similar al que hicimos a "mano"(las funciones middelwere reciben 3 funciones: request, response y next donde next es a la siguiente funcion a ejecutar o a rederizar)

+ **Nivel routing**: todavia no lo usamos pero está chido

+ **De manejo de errores:** reciben 4 parametros: error, request, response y next. se manda a llamar next como paramtro el error

+ **Built-in (la que biene con express):** se encarga de servir los archivos estaticos

+ **De terceros:** se instalan a npm para  extender la funcionalidad de otros