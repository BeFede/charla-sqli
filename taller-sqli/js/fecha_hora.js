$.datetimepicker.setLocale('es');


/**
*	Setea el input pasado por parámetro
*	Hace uso de la librería ¡datetimepicker!
*	@param inputFecha elemento/s DOM donde se quiere la fecha
*	@param fechaMinima (opcional) si no se pasa, la fecha mínima es la actual
*/
function setearCampoFecha(inputFecha, fechaMinima ){
	inputFecha.datetimepicker({
      lang:'es',
      timepicker:false,
      format:'d/m/Y',
      formatDate:'Y/m/d',
      mask: true,
      minDate: fechaMinima
    });
}


/**
*	Setea el o los inputs de hora haciendo uso de la librería datetimepicker
*	El rango horario permitido es pasado por parámetro al igual que la función
*	que se ejecuta a cambiar el valor
*	@param inputsHora elementos del DOM en donde se quiere la hora
*	@paramparam horaMin hora mínima
*	@param horaMax hora máxima
*	@param cambioHoraFunction función que se ejecutará cuando algún input cambie de valor
*/
function setearCamposHora(inputsHora, horaMin, horaMax, cambioHoraFunction){


    inputsHora.datetimepicker({
      datepicker:false,
      format:'H:i',
      minTime: horaMin,
      maxTime: horaMax,
      mask: true,
      onChangeDateTime: function(){
      	cambioHoraFunction();
      },
      step:5
    });
}

/**
*	Se valida que la hora inicio sea menor a la hora fin.
*	En caso contrario, se muestra un mensaje al usuario
*	@param horaInicio
*	@param horaFin
*/
function validarHora(horaInicio, horaFin){

        if (!isNaN(horaInicio) && !isNaN(horaFin)){
          if (horaInicio >= horaFin){
            return false;
          }
        }
        return true;
}

/**
 * Devuelve un string con la fecha de hoy en formato
 * dd/mm/aaaa
 */
function getDateToday(){
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();

  if(dd < 10) dd = "0" + dd;
  if(mm < 10) mm = "0" + mm;
  
  today = dd + "/" + mm + "/" + yyyy;
  return today;
}

function getHourNow(){
  let now = new Date();
  let hours = now.getHours();
  if(hours < 10) hours = "0" + hours;
  let minutes = now.getMinutes();
  if(minutes < 10) minutes = "0" + minutes;
  let seconds = now.getSeconds();
  if(seconds < 10) seconds = "0" + seconds;


  return hours +":"+minutes+":"+seconds;
}

function getTimeNow(){
  return getDateToday() + " " + getHourNow();
}