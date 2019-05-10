var page_size = 10;
var cabecera = ["Nro","Nombre", "Tipo de documento", "Número documento", "Direccion","Acciones"];
var page_number = 1;
var filtros = "";
var edicion = false;
btns =
    [
        {
            "icon": "fa fa-eye",
            "class": "btn-visualizar btn-visualizar-socio btn-vis-modal",
            "title": "Visualizar datos del socio"
        },
        {
            "icon": "fa fa-credit-card",
            "class": "btn-visualizar btn-pagar",
            "title": "Pagar"
        }
    ];

var mapaSocio = "";
var mapaSocios = "";

function inicializarMapas() {
    mapaSocio = new ApiMaps(document.getElementById('mapa-socio'));
    mapaSocios = new ApiMaps(document.getElementById('mapa-socios'));

    mapaSocio.init()
    mapaSocios.init()
}


window.addEventListener('load', function(){



    var accionesFiltros = [
        {
            "id": "filtrar-socios",
            "icon": "fa fa-search",
            "title": "Filtrar socios",
        },
        {
            "id": "btn-reiniciar-filtros",
            "icon": "fa fa-trash",
            "title": "Descartar filtros",
        }


    ];




    document.getElementById("btns-filtros").appendChild(crearButtonsAcciones(accionesFiltros));

    cargarFiltros();
    obtenerSocios(1);
    vincularEnter("filtro_numero", "filtrar-socios");
    vincularEnter("filtro_nombre", "filtrar-socios");
    vincularEnter("filtro_tipo_documento", "filtrar-socios");
    vincularEnter("filtro_numero_documento", "filtrar-socios");
    vincularEnter("filtro_barrio", "filtrar-socios");
    vincularEnter("filtro_orden_criterio", "filtrar-socios");
    vincularEnter("filtro_orden_atributo", "filtrar-socios");
    vincularEnter("filtro_tamano_pagina", "filtrar-socios");



    $("body").on("click", "#btn-reiniciar-filtros", function(){
        limpiarFiltros();
        obtenerSocios()
    });

    $("body").on("click", "#filtrar-socios", function(){
        obtenerSocios(1);
    });


    $("body").on("click", ".page-link",function(){
        let numPag = parseInt($(this).html());
       obtenerSocios(numPag)
    });




    $("body").on("click", ".btn-visualizar-socio", function(btn){
        var id_socio = $(btn.target).closest("tr").attr("id");
        consultarSocio(id_socio);
    });


    $("body").on("click", ".btn-pagar", function(btn){
        alertSS("Aquí se mostrará la cuenta corriente del socio y se le permitirá pagar con tarjetas", "No implementado")
    });

    $("body").on("click", ".btn-ver-cuenta-corriente", function(btn){
        alertSS("Aquí se mostrará la cuenta corriente del socio y se le permitirá pagar con tarjetas", "No implementado")
    });

    $("body").on("click", ".btn-ver-ficha-completa", function(btn){
        alertSS("Aquí se mostrará todos los datos del socio y estado de la documentación", "No implementado")
    });


    $("body").on("click", "#editar-email-socio", function(){

        let input = $("#email-socio-modal");
        let btn = $("#editar-email-socio");

        if (input.hasClass("editar")){

            input.attr("disabled", false);

            input.removeClass("editar");
            input.addClass("confirmar");

            btn.removeClass("fa-edit");
            btn.addClass("fa-check")
            input.focus();

        }
        else{
            if(!edicion){
                edicion = true;
                actualizarEmailSocio()
            }

        }

    });


    $("body").on("focusout", "#email-socio-modal", function(){
        if(!edicion){
            edicion = true;
            actualizarEmailSocio()
        }
    });



    /***FILTROS***/
    $("#form-filtros-socios").on("click", ".btn-filtros", function(){
        obtenerSocios(1)
    });


    function limpiarFiltros(){
        $("#filtro_numero").val("");
        $("#filtro_nombre").val("");
        $("#filtro_tipo_documento").val("");
        $("#filtro_numero_documento").val("");
        $("#filtro_barrio").val("");

        $("#filtro_tamano_pagina").val("20");

        $("#filtro_orden_atributo").val("nombre");
        $("#filtro_orden_criterio").val("ASC");
    }




    function obtenerSocios(numPag){
        let nroSocio = $("#filtro_numero").val();

        let nombre = $("#filtro_nombre").val();
        let tipoDocumeto = $("#filtro_tipo_documento").val();
        let numeroDocumento = $("#filtro_numero_documento").val();
        let barrio = $("#filtro_barrio").val();


        let page_size = $("#filtro_tamano_pagina").val();

        let ordenAtributo = $("#filtro_orden_atributo").val();
        let ordenCriterio = $("#filtro_orden_criterio").val();


        filtros = {
            "tipo_documento": tipoDocumeto,
            "numero_documento": numeroDocumento,
            "nombre": nombre,
            "numero": nroSocio,
            "barrio": barrio,
            "ordenAtributo": ordenAtributo,
            "ordenCriterio": ordenCriterio
        };

        $.ajax({
            url: "../ctrl/ajax/obtener_socios.ajax.php",
            data: {
                'filtros': filtros,
                "tamano_pag": page_size,
                "num_pag": numPag,
            },
            //  contentType: "application/json",
            dataType: 'json',
            type: 'GET',
            success: function(socios){



                if (socios.datos.socios.length > 0){
                    if(!numPag){
                        crearTabla(socios.datos.socios, cabecera, document.getElementById('tabla-socios'), btns, socios.datos.cant_paginas, numPag);
                    }
                    crearTabla(socios.datos.socios, cabecera, document.getElementById('tabla-socios'), btns, socios.datos.cant_paginas, numPag);


                    marcarDirecciones(socios.datos.direcciones)
                }
                else {
                    alertSS("No se han encontrado socios");
                }

            },
            error: function(xhr, status){
                console.log("No se han podido obtener los clientes");
                console.log(xhr);
                console.log(status);
            }
        });

    }



    function actualizarEmailSocio(){

        let email = $("#email-socio-modal").val();
        let idSocio = $("#id-socio-modal").val();

        if (email.length == 0){
            alertSS("Debe ingresar un email");
            $("#email-socio-modal").focus();
        }


        $.ajax({
            url: "../ctrl/ajax/editar_email_socio.ajax.php",
            data: {
                'id_socio': idSocio,
                'email': email
            },
            //  contentType: "application/json",
            dataType: 'json',
            type: 'POST',
            success: function(json){

                if (json.datos.exito){
                    alertSS("El email se ha actualizado. El socio debe verificar el mismo desde su bandeja de entrada")

                    let input = $("#email-socio-modal");
                    let btn = $("#editar-email-socio");
                    input.attr("disabled", true);
                    btn.addClass("fa-edit");
                    btn.removeClass("fa-check");

                    input.addClass("editar");
                    input.removeClass("confirmar");

                }
                else{
                    alertSS(json.error.descripcion);
                }
                edicion = false;

            },
            error: function(xhr, status){
                console.log(xhr);
                alertSS("Ha ocurrido un error");
            }
        });


    }

    function consultarSocio(idSocio){



        $.ajax({
            url: "../ctrl/ajax/consultar_socio.ajax.php",
            data: {
                'id_socio': idSocio
            },
            //  contentType: "application/json",
            dataType: 'json',
            type: 'GET',
            success: function(socio){
                if (socio != -1){
                    mostrarSocio(socio.datos.socio);
                }
                else {
                    alertSS("Ha ocurrido un error en la consulta del socio")
                }


            },
            error: function(xhr, status){
                console.log("No se han podido obtener los clientes");
                console.log(xhr);
                console.log(status);
            }
        });

    }


    function mostrarSocio(socio){


        $("#id-socio-modal").val(socio.id);
        $("#nombre-socio-modal-header").text("" + socio.nombre);
        $("#numero-socio-modal").text(socio.numero);
        $("#tipo-documento-socio-modal").text(socio.tipo_documento);
        $("#numero-documento-socio-modal").text(socio.numero_documento);
        $("#nombre-socio-modal").text(socio.nombre);
        $("#telefono-socio-modal").text(socio.telefono);
        $("#direccion-socio-modal").text(socio.direccion);
        $("#email-socio-modal").val(socio.email);
        //$("#saldo-socio-modal").text("$" + socio.saldo);


        mapaSocio.agregarMarcadorDesdeDireccion(socio.direccion);

        $("#modal_socio").modal('show')

    }



    function marcarDirecciones(direcciones){
//direcciones.length;
        /*for (let i=0; i < 9 ; i++){
            let direccion = direcciones[i].direccion;


            mapaSocios.agregarMarcadorDesdeDireccion(direccion, direcciones[i].nombre, true)
                .then(function(marker){
                    marker.addListener('click', function() {
                        mostrarSocio(direcciones[i].id)
                    });
                })
                .catch(function(error){
                    console.log(error)
                })


               // sleep(1000);
                //console.log("durmiendo")

        }*/
        mapaSocios.limpiar()
        //mapaSocios.agregarDirecciones(direcciones);

        for (let i = 0; i < direcciones.length; i++) {
            let direccion = direcciones[i].direccion;


            mapaSocios.agregarMarcadorDesdeDireccion(direccion, direcciones[i].nombre, true)
                .then(function (marker) {
                    marker.addListener('click', function () {
                        consultarSocio(direcciones[i].id)
                    });


                })
                .catch(function (status) {
                    console.log(status)
                    if (status == 'OVER_QUERY_LIMIT') {
                        lost_addresses.push(direcciones[i]);

                    }
                })
        }



    }



});
