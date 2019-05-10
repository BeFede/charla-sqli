//Archivo script para configuraciones globales

//Implementacion del enter como TAB



window.addEventListener("load", function(){

    firstInputFocus();
    seleccionarMenu();
    //Metodo que guarda el elemento principal del menu que se selecciono
    $('#side>ul>li').on("click", function(){
        sessionStorage.setItem("seleccion-gestion", $(this).attr("id"));
    });


    $('form').submit(function() {
        $('#modal-procesando').show();
    });
    
    

    $(".btn-print").on("click", function(){
        try{
            printPage();
        }
        catch(e){
            console.log("Error de impresion");
            print();
        }
        
    });


    $(document).on('focus', '.form-control', function() {
        $(this).attr('autocomplete', 'off');
    });


    //CARGAR-FILTROS
    $("body").on("click", "#btn_filtros, #btn-filtros, #btn-filtrar, #filtrar-clientes", function(){
        //guardo la pagina actual
        let paginaActual = window.location;
        sessionStorage.setItem("paginaActual", paginaActual);
        //cuando se hace click en boton filtros
        let filtros = [];
        $( ".form-filtro" ).each(function() {
            let obj = {};
            obj.id = $(this).attr("id");
            obj.text = $("#" + obj.id).val();
            filtros.push(obj);
        });
        sessionStorage.setItem("filtros", JSON.stringify(filtros));
    });

    });




$(document).on('keydown', 'input, select, textarea', function(e) {

    //guardar pagina anterior en session storage
    if (e.keyCode == 13 && e.shiftKey) {
        focusable = $(document).find('.form-control, .form-check-input').filter(":visible").filter(":enabled");
        next = focusable.eq(focusable.index(this)-1);
        e.preventDefault();
        next.focus();
    }else
    if (e.keyCode == 13) {
        if($( document.activeElement ).hasClass("form-filtro")){
            $(document).find('#btn_filtros').focus();
            $(document).find('#btn-filtros').focus();
            $(document).find('#btn-filtrar').focus();
            $(document).find('#filtrar-clientes').focus();
        }
        else{
            if($(document.activeElement).hasClass("form-filtro-modal")){
                $(document).find('.btn-filtro-modal').first().click();
            }
            else{
                focusable = $(document).find('.form-control, .form-check-input').filter(":visible").filter(":enabled");
                if(focusable.index(this)+1 == focusable.length){
                    //$(document).find('#btn_submit').click();
                }
                else{
                    focusable = $(document).find('.form-control, .form-check-input').filter(":visible").filter(":enabled");
                    next = focusable.eq(focusable.index(this)+1);
                    e.preventDefault();
                    next.focus();
                }
            }
        }
    }
    });
  //Implementación de boton F9 como submit
 

  $(document).on('keydown', function(e) {
    if(e.keyCode == 120){
        //$(document).find('#btn_submit').click();
       }
  });

    function avisoCarga(accion){
        if(accion == "show"){
            $('#modal-procesando').show();
        }
        else{
            $('#modal-procesando').hide();
        }

        }
  
    var $loading = $('#modal-procesando').hide();
    $(document).ajaxStart(function () {
        $('#modal-procesando').modal("show");
      }
    ).ajaxStop(function () {
        $('#modal-procesando').modal("hide");
    });
    
    function seleccionarMenu(){
        
        var seleccion = sessionStorage.getItem("seleccion-gestion");
        if (seleccion != null || sessionStorage.getItem("seleccion-gestion") == "#") {
            var seleccionado = '#' + seleccion;
            if(seleccion == "li-user"){
                $(seleccionado + " .principal").css("background", "var(--gradient)");
            }
            else{
                
                $(seleccionado).addClass("activado");
                $(seleccionado).children("ul").show();
            }
          }
          else{
            sessionStorage.setItem("seleccion-gestion", "li-user");
          }
    }
    

    //funcion para cargar las duplas
    function cargarFiltros(){
        let flag = false;
        //Si el session storage pagina es igual a la pagina actual
        if(sessionStorage.paginaActual == window.location){
            let filtros = JSON.parse(sessionStorage.filtros);
            //POR CADA [{nombrefiltro, valor}, {nombrefiltro, valor}]
            for(var i = 0; i < filtros.length; i++){
                $("#" + filtros[i].id).val(filtros[i].text);
            }
            //finalmente aprieto el boton
            flag = true;
        }
        //Borro los sessionStorage
        sessionStorage.setItem("paginaActual", "");
        sessionStorage.setItem("filtros", JSON.stringify([]));
        return flag;
    }

    function limpiarFiltrosGl(){
        $(".form-control").each(function(){
            let tipoNodo = $(this).prop('nodeName');
            switch (tipoNodo){
                case "SELECT":
                    $(this).val($(this).children(":first").val());
                    break;
                case "INPUT":
                    $(this).val("");
                    break;
                default: break;
            }     
        });
        $('#btn_filtros').click();
        $('#btn-filtros').click();
        $('#btn-filtrar').click();
        $('#filtrar-clientes').click();
    }

    function alertSS(mensaje,titulo, yes, no){
        if(!no) no = function(){};
        var modal = document.getElementById("modal-alert-ss");
        if (modal != null){
          modal.innerHTML = "";
        }
        else {
          modal = document.createElement("div");
          modal.id = "modal-alert-ss";
          modal.classList.add("modal");
          modal.classList.add("not-printable");
        }
        modal.style.paddingRight = "0px";
        var dialog = document.createElement("div");
        dialog.classList.add("modal-dialog");
        var content = document.createElement("div");
        content.classList.add("modal-content");
        var modalBody = document.createElement("div");
        modalBody.classList.add("modal-body");
        var rowSeleccion = document.createElement("div");
        rowSeleccion.classList.add("row");
        var colSeleccion= document.createElement("div");
        colSeleccion.classList.add("col-xs-12");
        if(Array.isArray(mensaje)){
            mensaje.forEach(msj => {
                colSeleccion.innerHTML += "<h3 style='margin-top: 0px; margin-bottom: 30px; font-size: 20px; color: darkgreen; font-weight: bold; text-align:center'>"+msj+"</h3>";
            });
        }
        else{
            colSeleccion.innerHTML += "<h3 style='margin-top: 0px; margin-bottom: 30px; font-size: 20px; color: darkgreen; font-weight: bold; text-align:center'>"+mensaje+"</h3>";
        }
        rowSeleccion.appendChild(colSeleccion);
        modalBody.appendChild(rowSeleccion);
        var rowButtons = document.createElement("div");
        rowButtons.className = "row";

        var aceptarButton = document.createElement("div");

        if(yes){
            
        aceptarButton.className = "col-xs-6";
        aceptarButton.style.alignContent = "center";
        var inputAceptar = document.createElement("input");
        inputAceptar.type = "button";
        inputAceptar.className = "btn btn-primary pull-right";
        inputAceptar.onclick = no;
        inputAceptar.style.width = "100%";
        inputAceptar.style.marginBottom = "0px !important";
        $(inputAceptar).click(function(){
            yes();
            $(modal).modal("hide");
            }
        );
        $(inputAceptar).keydown(function(e){
            if(e.keyCode == 13){
                $(inputAceptar).click();
            }
        });

        inputAceptar.value = "Si";
        aceptarButton.appendChild(inputAceptar);
        rowButtons.appendChild(aceptarButton);

        var cancelButton = document.createElement("div");
        cancelButton.className = "col-xs-6";
        cancelButton.style.alignContent = "center";
        var inputCancelar = document.createElement("input");
        inputCancelar.type = "button";
        inputCancelar.className = "btn btn-primary pull-right";
        inputCancelar.style.backgroundColor = "#444";
        inputCancelar.onclick = no;
        inputCancelar.style.width = "100%";
        inputCancelar.style.marginBottom = "0px !important";
        $(inputCancelar).click(function(){
            no();
            $(modal).modal("hide");
            }
        );

        $(inputCancelar).keydown(function(e){
            if(e.keyCode == 13){
                $(inputCancelar).click();
            }
        });
        inputCancelar.value = "No";
        cancelButton.appendChild(inputCancelar);
        rowButtons.appendChild(cancelButton);
        }

        else{
            aceptarButton.className = "col-xs-12";
            aceptarButton.style.alignContent = "center";
            var inputAceptar = document.createElement("input");
            inputAceptar.type = "button";
            inputAceptar.className = "btn btn-primary pull-right";
            inputAceptar.onclick = no;
            inputAceptar.style.width = "100%";
            inputAceptar.style.marginBottom = "0px !important";
            $(inputAceptar).click(function(){
                $(modal).modal("hide");
                }
            );
            $(inputAceptar).keydown(function(e){
                if(e.keyCode == 13){
                    $(inputAceptar).click();
                }
            });

            inputAceptar.value = "Aceptar";
            aceptarButton.appendChild(inputAceptar);
            rowButtons.appendChild(aceptarButton);
        }

        

        modalBody.appendChild(rowButtons);

        if(titulo == null || titulo == ""){
            titulo = "Información";
        }
        var header = "<div class='panel-heading'>" +
          "<div class='panel-portrait'>" +
          "<i class='material-icons portrait'>error_outline</i></div>";
      
        if (titulo != null) {
          header += "<div class='panel-header'>" + titulo + "</div></div>";
        }
        else {
          header += "<div class='panel-header'>Seleccione</div></div>";
        }
        content.innerHTML += header;
        content.appendChild(modalBody);
        dialog.appendChild(content);
        modal.appendChild(dialog);

        document.addEventListener("keydown", function(evt){
            if(evt.keyCode == 27){  
                $(modal).modal("hide");
            }
        });

        
        $(modal).modal("show");
        $(inputAceptar).focus();
    }


    function vincularEnter(filtros, button){
        $("#" + filtros).keydown(function(e){
            if(e.keyCode == 13 && $("#"+button).prop("disabled") != true && $("#"+button).prop("disabled") != "disabled"){
                e.preventDefault();
                e.stopPropagation();
                $("#" + button).click();
            }
        });
    }



    /**
     * 
     * @param {*} parametros 
     */
    function crearButtonsAcciones(btns){
        var cantidadBtns = btns.length;
        var buttons = document.createElement("div");
        if(cantidadBtns > 0){
            btns.forEach(btn => {
                let col = document.createElement("div"); 
                col.className =  "col-xs-" + parseInt(12/cantidadBtns);  
                let bt = document.createElement("div");
                bt.className = "btn btn-primary button-action-default";
                bt.style.margin = "0px";
                bt.style.marginTop = "15px";
                bt.style.cursor = "pointer";
                bt.style.width = "100%";
                col.style.padding = "0px 3px";
                bt.style.textAlign = "center";
                if(btn.icon == "fa fa-close" || btn.icon == "fa fa-trash"){
                    bt.style.backgroundColor = "#444";
                    bt.style.boxShadow = "0 5px 5px -5px #444";
                } 
                if(btn.title)bt.title = btn.title;
                bt.innerHTML =  "<i class='"+ btn.icon + "'></i>"
                bt.id = btn.id;
                col.appendChild(bt);
                buttons.appendChild(col);
            });
        };
        return buttons;
    }

    function firstInputFocus(){
        $('body:first *:input[type!=hidden]:enabled:visible:first').focus();
    }

    function addClickListener(keyCode, inputId){
        document.addEventListener("keydown", function(e){
            if(e.keyCode == keyCode)
            document.getElementById(inputId).click();
        });
    }


    function getCurrentDate(){
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var today = dd + '/' + mm + '/' + yyyy;
        return today;
    }