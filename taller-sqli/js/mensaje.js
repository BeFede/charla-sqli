/**
*	Recibe el texto del mensaje y muestra un mensaje al usuario
*	por la cantidad de segundos especificada
*	@param mensaje Texto que se desea mostrar en el mensaje
*	@param contenedor El mismo no debe ser visible (display = none)
*	@param tiempo tiempo para mostrar el mensaje en milisegundos, en mensaje no se cerrará
*/
function mostrarMensaje(mensaje, contenedor, tiempo){
	contenedor.innerHTML = '<div class="mensaje alert alert-danger alert-dismissable col-xs-12">'
					+ "<span class='glyphicon glyphicon-remove' data-dismiss='alert' style='float: right; margin-right: 10px;'></span>"
					+ mensaje
					+ "</div>";
	if (tiempo != 0) {
		setTimeout(function(){
			contenedor.style.display = 'none';
		}, tiempo);
	}
}
