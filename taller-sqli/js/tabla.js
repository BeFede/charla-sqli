/**
* Crea una tabla "table" en contenedor especificado por parámetro
* @data cuerpo de la tabla
* @head cabecera de la tabla
* @content contenedor html en donde se creará la tabla
*/
function crearTabla(data, head, content, btns, num_pag, pag_active){

  $(content).empty();
  if (data) {
    var wraper = document.createElement('div');
    wraper.className = "wraper-tabla";
    var tabla = document.createElement('table');
    tabla.className = "table table-responsive table-hover table-striped ";
    var cabecera = crearCabecera(head);
    tabla.appendChild(cabecera);
    var tooltip = crearTooltip(btns);
    var cuerpo = crearCuerpo(data, tabla, btns);
    tabla.appendChild(cuerpo);
    wraper.appendChild(tabla);
    content.appendChild(wraper);
    if (num_pag != 0){
      content.appendChild(crearPaginacion(num_pag,pag_active,tooltip));
    }
  }
  if(cuerpo.outerHTML == "<tbody></tbody>"){
    tabla.innerHTML = "<h4>NO HAY DATOS QUE MOSTRAR</h4>";
  }
}




function crearTablaDePrecios(variables, callback){
  var $content = $('#tabla-precios');
  var $table;
  var $thead;
  var $tbody;

  /*Creo una tabla*/
  for (var i=0; i < parseInt(variables.sucursales.length); i++) {
    $table = $(`<table class="table table-hover table-striped"></table>`);
    $tbody = $(`<tbody></tbody>`);
    $thead = $(`
    <thead ">

    </thead>`);
    for (var k = 0; k < variables.empaques.length; k++) {
      var $empaque = $(`<th style="text-align:center;">` + variables.empaques[k].id + `</th>`);
      $($thead).children('tr').append($empaque);
    }

      var $rowTitle = $(`<tr><td class="noBorder" style="font-size: 18px; background-color:var(--color)" colspan="5">Sucursal número ` + variables.sucursales[i].nro + `</td></tr>`);
      var $rowHeaders = $(`<tr></tr>`);
      var $rowHeadersSuper = $(`<tr></tr>`);
      $rowHeadersSuper.append("<td style='width: 16% !important; font-size: 17px !important' rowspan='2'>Lista de precio</td>","<td style='font-size: 14px' colspan='2'>POR UNIDAD</td>","<td style='font-size: 14px' colspan='2'>POR BULTO</td>" )
      $rowHeaders.append("<td style='width: 16% !important'>Utilidad (%)</td>","<td style='width: 26% !important'>Precio ($)</td>","<td style='width: 16% !important'>Utilidad (%)</td>","<td style='width: 26% !important'>Precio ($)</td>");
      $thead.append($rowTitle);
      $thead.append($rowHeadersSuper);
      $thead.append($rowHeaders);

      for (var j=0; j < parseInt(variables.listas_precio.length); j++) {
        var $row = $(`<tr></tr>`);
        //$row.append(`<td>` + variables.sucursales[i] + `</td>`);
        $row.append(`<td style="width: 16% !important; font-size: 17px !important"> ` + variables.listas_precio[j].id + `</td>`);
        //utilidad por porcentaje
        $row.append(`<td  style="width: 16% !important">
        <input type="number"  name="utilidades[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][1]" id=utilidades[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][1] class="utilidad articulo form-control input-utilidad validar-mayor-cero" placeholder="Utilidad unidad"></input>
        </td>`);
        //precio por articulo
        $row.append(`<td style="width: 26% !important">
        <input type="number" style="color:green; font-weight: bold" name="precios[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][1]" id=precios[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][1] class="precio articulo form-control input-precio validar-mayor-cero" placeholder="Precio unidad"></input>
        </td>`);
        //utilidad por articulo
        $row.append(`<td style="width: 16% !important">
        <input type="number"  name="utilidades[` + variables.sucursales[i].nro + `][` + variables.listas_precio[j].id +`][2]" id=utilidades[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][2] class="utilidad bulto form-control input-utilidad validar-mayor-cero" placeholder="Utilidad bulto"></input>
        </td>`);
        //precio por articulo
        $row.append(`<td style="width: 26% !important">
        <input type="number"  style="color:blue; font-weight: bold" name="precios[` + variables.sucursales[i].nro + `][` + variables.listas_precio[j].id +`][2]" id=precios[`+ variables.sucursales[i].nro +`][`+ variables.listas_precio[j].id + `][2] class="precio bulto form-control input-precio validar-mayor-cero" placeholder="Precio bulto"></input>
        </td>`);

        $tbody.append($row);
      


  }
  $table.append($thead);
  $table.append($tbody);
  $content.append($table);

  }
  
  /*Append tabla*/



    if (callback != undefined){
      callback();
    }
}



function llenarDePrecios(data){

  $(content).empty();
  if (data.length != undefined) {
    var tabla = document.createElement('table');
    tabla.className = "table table-responsive table-hover table-striped ";

    var cabecera = crearCabecera(head);
    tabla.appendChild(cabecera);

    var cuerpo = crearCuerpoPrecios(data, tabla, precios);
    tabla.appendChild(cuerpo);

    content.appendChild(tabla)

  }
}


function crearTablaArticulosPorSucursal(data, head, content){

  $(content).empty();
  if (data.length != undefined) {
    var tabla = document.createElement('table');
    tabla.className = "table table-responsive table-hover table-striped";
    var cabecera = crearCabecera(head);
    tabla.appendChild(cabecera);
    var cuerpo = crearCuerpo(data, tabla);
    tabla.appendChild(cuerpo);
    content.appendChild(tabla);

  }
}


function crearCabecera(itemsCabecera){

  var thead = document.createElement('thead');
  var tr = document.createElement('tr');


  for (var i = 0; i < itemsCabecera.length; i++) {
    var td = document.createElement('td');
    var text = document.createTextNode(itemsCabecera[i]);
    td.appendChild(text);
    tr.appendChild(td);
  }

  thead.appendChild(tr);
  return thead;
}


function crearCuerpo(datos, tabla, btns){
  var tbody = document.createElement('tbody');
  $.each(datos, function(i, item) {
      var tr = document.createElement('tr');
      tr.id = item.id;
      $.each(item, function(j, text) {
        if (j != 'id'){
        var td = document.createElement('td');
        var text = document.createTextNode(text);
        td.appendChild(text);
        tr.appendChild(td);}
      });

      if(btns != undefined){
        var td = document.createElement('td');
        for (var j = 0; j < btns.length; j++) {
          var itag = document.createElement('i');
          itag.className = btns[j].icon;
          var btn = document.createElement('a');
          if(btns[j].title) btn.title = btns[j].title; 
          btn.className = btns[j].class;
          btn.appendChild(itag);
          td.appendChild(btn);
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
  });

  return tbody;
}



function crearCuerpoPrecios(datos, tabla, precios){
    var tbody = document.createElement('tbody');
    $.each(datos, function(i, item) {
        var tr = document.createElement('tr');
        tr.id = item.id;
        $.each(item, function(j, text) {
          if (j != 'id'){
          var td = document.createElement('td');
          td.id = j;
          var text = document.createTextNode(text);
          td.appendChild(text);
          tr.appendChild(td);
        }
        });

        var td = document.createElement('td');
        var input = document.createElement('input');
        input.type = "text";
        input.className = "input-precio"
        input.value = precios[i].precio;
        td.appendChild(input);
        td.id = 'precio';
        tr.appendChild(td);

/*
          var div = document.createElement('div');
          div.className = "input-group ";
          for (var j = 0; j < btns.length; j++) {
            var itag = document.createElement('i');
            itag.className = btns[j].icon;
            var btn = document.createElement('a');
            btn.className = "btn btn-default input-group-addon " + btns[j].class;
            btn.appendChild(itag);
            div.appendChild(btn);
            tr.appendChild(div);
          }
*/
        tbody.appendChild(tr);
    });

    return tbody;
}


//paginacion
function crearPaginacion(numPage, pagActiva, tooltip){
  numPage = Math.ceil(numPage);
  var div = document.createElement('div');
  div.style.textAlign = "center";
  div.style.position = "relative";
  var ul = document.createElement('ul');
  ul.className = "pagination";
  //hasta aca cree los containers
  for(var i = (pagActiva - 2) ; i <= parseInt(pagActiva) + 2; i++){
    if(i > 0 && i <= numPage){
      var li = document.createElement('li');
      li.className = "page-item";
      if (pagActiva == i) li.className += " active";
      var a = document.createElement('a');
      a.className = "page-link";
      var text = document.createTextNode(i);
      a.appendChild(text);
      li.appendChild(a);
      ul.appendChild(li);
    }
}

  let liPuntos = document.createElement('li');
  liPuntos.className = "page-item";
  let aPuntos = document.createElement('a');
  aPuntos.className = "page-link-puntos";
  let textPuntos = document.createTextNode(" ... ");
  aPuntos.appendChild(textPuntos);
  liPuntos.appendChild(aPuntos);
  ul.append(liPuntos);

  let liTotal = document.createElement('li');
  liTotal.className = "page-item";
  let aTotal = document.createElement('a');
  aTotal.className = "page-link";
  let textTotal = document.createTextNode(numPage);
  aTotal.appendChild(textTotal);
  liTotal.appendChild(aTotal);
  ul.append(liTotal);


  div.appendChild(ul);
  div.append(tooltip);



  return div;
}
function estiloColumnas(cantidadColumnas){
    $("td").css("width", "" + 100/cantidadColumnas + "%");
}

//fin nueva paginacion
/*
function crearPaginacion(cantPage, pagActiva){
  var div = document.createElement('div');
  div.style.textAlign = "center";
  var ul = document.createElement('ul');
  ul.className = "pagination";

  for(var i = 0; i < parseInt(cantPage); i++){
    var li = document.createElement('li');
    li.className = "page-item";
    if (pagActiva == (i+1)) li.className += " active";
    var a = document.createElement('a');
    a.className = "page-link";
    a.href = "#";
    var text = document.createTextNode((i+1));
    a.appendChild(text);
    li.appendChild(a);
    ul.appendChild(li);
  }

  div.appendChild(ul);

  return div;
}*/

function ajustarHeader(tabla){
  
    var colCount = contarColumnas(tabla);
    var datosCol = $('tbody tr:nth-child(1) td');
    for( var i = 1; i < colCount+1; i++) {    
      $('thead tr:nth-child(1) td:nth-child('+i+')').width($('tbody tr:nth-child(1) td:nth-child('+i+')').width());
    }
}

function contarColumnas(tabla){
  var cols = $(tabla).find("tr:first td");
  var count = 0;
  for(var i = 0; i < cols.length; i++)
  {
   var colspan = cols.eq(i).attr("colspan");
   if( colspan && colspan > 1)
   {
      count += colspan;
   }else{
      count++;
   }
}
return count;
}

function crearTooltip(btns){
  var tooltip = "";
  if(btns != undefined && btns.length > 0){
    tooltip = document.createElement('div');
    tooltip.className = "helptip";
    var tticon = document.createElement('i');
    tticon.className = "material-icons";
    tticon.innerHTML += "help";
    tticon.style = "font-size: 30px !important";
    var tttext = document.createElement("span");
    tttext.className = "helptiptext";
    for (var j = 0; j < btns.length; j++) {
      var helpitem = document.createElement('span');
      var itag = document.createElement('i');
      itag.className = btns[j].icon;
      var text = document.createElement('p');
      if(btns[j].title) text.innerHTML = btns[j].title;
      helpitem.className = "helptipitem";
      itag.style = "display: inline-block";
      text.style = "padding-left: 10px; padding-right: 10px; display: inline-block; white-space: nowrap;";
      helpitem.appendChild(itag);
      helpitem.appendChild(text);
      helpitem.appendChild(document.createElement('br'));
      tttext.appendChild(helpitem);
    }
    tooltip.append(tticon);
    tooltip.append(tttext);
  }
  return tooltip;
}