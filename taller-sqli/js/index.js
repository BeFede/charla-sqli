window.addEventListener("load", function(){

    $(".main-regresar").click(function(){
        $(".main-sub").fadeOut(200);
        setTimeout(function(){ $("#main-index").fadeIn(); }, 330);
    });

    $(".main-art").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-art").fadeIn(); }, 330);
    });

    $(".main-clientes").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-clientes").fadeIn(); }, 330);
    });

    $(".main-empleados").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-empleados").fadeIn(); }, 330);
    });

    $(".main-proveedores").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-proveedores").fadeIn(); }, 330);
    });

    $(".main-listados").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-listados").fadeIn(); }, 330);
    });

    $(".main-pedidos").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-pedidos").fadeIn(); }, 330);
    });

    $(".main-ventas").click(function () {
        $("#main-index").fadeOut(200);
        setTimeout(function () { $("#main-ventas").fadeIn(); }, 330);
    });

    $(".main-recibos").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-recibos").fadeIn(); }, 330);
    });

    $(".main-repartos").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-repartos").fadeIn(); }, 330);
    });

    $(".main-stock").click(function(){
        $("#main-index").fadeOut(200);
        setTimeout(function(){ $("#main-stock").fadeIn(); }, 330);
    });

});