function render(html, parametros){
  var variables = html.match(/[^\{\}]+(?=\})/g);
  var nombre = "";
  for (var i = 0; i < variables.length; i++) {
   var value = eval(variables[i]);
   var variable = variables[i];
   html = html.replace("{"+variables[i]+"}", parametros[variable])
 }
 return html;
}
module.exports.render = render;
