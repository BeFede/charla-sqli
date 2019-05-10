function obtenerMarcas(id){


  $.ajax({
        url: "../ctrl/ajax/obtener_marcas_articulos.ajax.php",
        data: {
          datos: 'tipos_documento'
        },
        dataType: 'json',
        type: 'POST',
        success: function(marcas_articulos){
            cargarSelector(marcas_articulos, $('#select_marcas_articulos'), id);
            $('#select_marcas_articulos').append($(`<option value="otra-marca">Otra marca</option>`));

        },
        error: function(xhr, status){
          console.log("No se han podido obtener las marcas de los artículos");
          console.log(xhr);
          console.log(status);
        }
    });

}


function obtenerLineas(id){

  $.ajax({
    url: "../ctrl/ajax/obtener_lineas_articulos.ajax.php",
    data: {
      datos: 'tipos_documento'
    },
    dataType: 'json',
    type: 'POST',
    success: function(lineas_articulos){
      cargarSelector(lineas_articulos, $('#select_lineas_articulos'), id);
      $('#select_lineas_articulos').append($(`<option value="otra-linea">Otra línea</option>`));
    },
    error: function(xhr, status){
      console.log("No se han podido obtener las lineas de los artículos");
      console.log(xhr);
      console.log(status);
    }
  });

}


function obtenerUnidades(id){

  $.ajax({
        url: "../ctrl/ajax/obtener_unidades_medida.ajax.php",
        data: {
          datos: 'unidades_medida'
        },
        dataType: 'json',
        type: 'POST',
        success: function(unidades_medida){
            cargarSelector(unidades_medida, $('#select_unidades_medida'), id);
            $('#select_unidades_medida').append($(`<option value="otra-unidad">Otra unidad</option>`));
        },
        error: function(xhr, status){
          console.log("No se han podido obtener las unidades de medida");
          console.log(xhr);
          console.log(status);
        }
    });

}



function obtenerValoresIVA(){

  $.ajax({
        url: "../ctrl/ajax/obtener_valores_IVA.ajax.php",
        data: {
          datos: 'tipos_documento'
        },
        dataType: 'json',
        type: 'POST',
        success: function(valores_IVA){
            cargarSelector(valores_IVA, $('#select_valores_IVA'));
        },
        error: function(xhr, status){
          console.log("No se han podido obtener los valores de IVA de los artículos");
          console.log(xhr);
          console.log(status);
        }
    });

}


function registrarNuevaLinea(descripcion){
  $.ajax({
        url: "../ctrl/ajax/registrar_linea_articulo.ajax.php",
        data: {
          linea: descripcion
        },
        dataType: 'json',
        type: 'POST',
        success: function(id){
            alert("Línea registrada: " + descripcion);
            obtenerLineas(id);
        },
        error: function(xhr, status){
          console.log("No se han podido registrar la nueva línea de artículos");
          console.log(xhr);
          console.log(status);
        }
    });
}



function registrarNuevaMarca(descripcion){
  $.ajax({
        url: "../ctrl/ajax/registrar_marca_articulo.ajax.php",
        data: {
          marca: descripcion
        },
        dataType: 'json',
        type: 'POST',
        success: function(id){
            alert("Marca registrada: " + descripcion);
            obtenerMarcas(id);
        },
        error: function(xhr, status){
          console.log("No se han podido registrar la nueva marca de artículos");
          console.log(xhr);
          console.log(status);
        }
    });
}

function registrarNuevaUnidad(descripcion){
  $.ajax({
        url: "../ctrl/ajax/registrar_unidad_medida.ajax.php",
        data: {
          unidad: descripcion
        },
        dataType: 'json',
        type: 'POST',
        success: function(id){
            alert("Unidad registrada: " + descripcion);
            obtenerUnidades(id);
        },
        error: function(xhr, status){
          console.log("No se han podido registrar la nueva unidad de medida");
          console.log(xhr);
          console.log(status);
        }
    });
}
