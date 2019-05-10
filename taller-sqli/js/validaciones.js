/**
* Se encarga de validaciones generales a nivel de cliente.
*/

window.addEventListener('load', function(){

    $("#btn_submit").click(function(){
        validarCampos();
      });

    var desarrollo = true;

    $("body").on("change", ".validar-mayor-cero", function(){
      var valor = $(this).val();
      if (valor < 0){
        $(this).val(0);
      }
    });

    $("body").on("change", ".validar-mayor-uno", function(){
      var valor = $(this).val();
      if (valor < 1){
        $(this).val(1);
      }
    });


});
    /**
    * Valida todos los campos que tengan una clase de validación, como
    * validar-seleccionado y validar-no-vacio, y también a los pickers
    * de hora y fecha.
    * Se acciona cuando se clickea el botón de Confirmar Solicitud.
    * Si todos los campos requeridos están completos, se submitea el
    * formulario. Caso contrario, se indica al usuario que hay campos
    * sin rellenar, y se le indica cuáles son.
    */
   function validarCamposMensaje(mensaje){
       if (confirm(mensaje))
        validarCampos();
   }

    function validarCampos() {
        validarDateTimePickers();
        /*$(document).find(".faltante-select").map(function() {
            $(this).removeClass("faltante-select");
        });
        $(".faltante-input-text").map(function() {
            $(this).removeClass("faltante-input-text");
        });
        $(".numero-menor-cero").map(function() {
            $(this).removeClass("numero-menor-cero");
        });
        $(".faltante-fecha").map(function() {
            $(this).removeClass("faltante-fecha");
        });*/

        // Esta bandera se apaga si algún campo falta
        var flag = true;


        // Recorro todos los select de clase validar-seleccionado,
        // y si no se seleccionó nada les agrego la clase faltante-select,
        // que después será marcada en rojo
        $(".validar-seleccionado").map( function () {
            if (this.value == 0) {
                $(this).addClass("faltante-select");
                flag = false;
            }
            else{
                $(this).removeClass("faltante-select");
            }

        });

        $(".validar-date").map( function () {
            if (this.value == "__/__/____") {

                $(this).addClass("faltante-input-text");
                flag = false;
            }
            else{
                $(this).removeClass("faltante-input-text");
            }

        });


        // Recorro todos los input de clase validar-no-vacio,
        // y si están vacíos les agrego la clase faltante-input-text,
        // a la que después se le agrega un placeholder
        $(".validar-no-vacio").map( function () {
            if (!(/\S/.test($(this).val()))) {
                $(this).addClass("faltante-input-text");
                flag = false;
            }
            else{
                $(this).removeClass("faltante-input-text");
            }
        });

        $(".validar-mayor-cero").map( function () {
            if (parseFloat($(this).val() != undefined && $(this).val()) < 0) {
                $(this).addClass("numero-menor-cero");
                flag = false;
            }
            else{
                $(this).removeClass("numero-menor-cero");
            }
        });

        $(".validar-mayor-uno").map( function () {
            if (parseFloat($(this).val() != undefined && $(this).val()) < 0) {
                $(this).addClass("numero-menor-uno");
                flag = false;
            }
            else{
                $(this).removeClass("numero-menor-uno");
            }
        });

        


        // Mismo tipo de validación que en las dos clases anteriores, pero
        // respecto a los campos de hora y de fecha.

        $(".time-picker-start, .time-picker-end, #datePickerStart, #datePickerEnd").map( function (){
            // Si está vacío o si es la máscara es porque está mal
            if (!(/\S/.test($(this).val())) || $(this).val().indexOf("_") != -1) {
                $(this).addClass("faltante-fecha");
                flag = false;
            }
            else{
                $(this).removeClass("faltante-fecha");
            }
        });

        // Verifico que estén todos los campos completos
        if (!flag){
          event.preventDefault();
          alert("Complete correctamente todos los campos solicitados.");
        }
        else {
          confirmar();
        }

    }


    /**
    * Verifica que el teléfono esté en formato correcto.
    * Añade la clase 'error-telefono' a los campos con error.
    * @return {boolean}
    */
    function validarTelefonos() {

        var flag = true;
        var regEx = /^[(]?\d{0,5}[)]?[ |-]?\d{0,8}$/;

        $('.validar-telefono').map( function () {
            if (!(regEx.test($(this).val()))) {
                $(this).addClass("error-telefono");
                flag = false;
            }
        });
        return flag;
    }

    /**
    * Muestra el modal que permite submittear el form.
    */
    function confirmar(mensaje) {
        if(mensaje){
            if(confirm(mensaje))$('#form').submit();
        }
        else{
            $('#form').submit();
        }
    }

    function validarDateTimePickers(){
        $(".date").map( function () {
            validarDateTimePicker(this);
        });
    }

    function validarDateTimePicker(timePicker){
        console.log($(timePicker).val());
        if(!$(timePicker).val() || $(timePicker).val() == "__/__/____"){
            $(timePicker).val("");
        }
    }


    function validarCuit(sCUIT){
          var aMult   = '6789456789';
          var aMult   = aMult.split('');
          var sCUIT   = String(sCUIT);
          var iResult = 0;
          var aCUIT = sCUIT.split('');

          if (aCUIT.length == 11)
          {
              // La suma de los productos
              for(var i = 0; i <= 9; i++)
              {
                  iResult += aCUIT[i] * aMult[i];
              }
              // El módulo de 11
              iResult = (iResult % 11);

              // Se compara el resultado con el dígito verificador
              return (iResult == aCUIT[10]);
          }
          return false;
    }
