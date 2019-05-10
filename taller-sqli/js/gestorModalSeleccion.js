//filtro ([input: boolean, valor: , nombre:, nombreHeader], filtroObjeto, ajax:, unicacionInterna, titulo:, callback) 
//filtros on screen atributo
var GestorModalSeleccion = function(parametros){
  this.ajaxURL = parametros.ajaxURL;
  this.filtros = parametros.filtros;
  this.callback = parametros.callback;
  this.ubicacionData = parametros.ubicacionData; //array con la ubicacion en orden, con los lementos en un string con los nombres de cada nodo de la ruta
  this.titulo = parametros.titulo;
  this.callback = parametros.callback; 
  this.tratamientoDatos = parametros.tratamientoDatos; // funcion que trata el json que devuelve el ajax, tiene que devolver un json con EL MISMO FORMATO.
  this.data = {};
  this.modal = "";
  this.filtroPaginacion;
  this.filtros.forEach(fl => {
    if("paginacion" in fl){
      this.filtroPaginacion = fl.nombre;
      this.numeroPagina = 1;
    }
  });
  this.peticion = "POST";
  if(parametros.peticion == "GET"){
    this.peticion = "GET";
  }
  this.crearModalSeleccion();
  this.cantPaginas = parametros.cantPaginas;
}

GestorModalSeleccion.prototype = {
  crearModalSeleccion: function(){
    let fcsed = document.querySelector( ':focus' );
    if( fcsed ) fcsed.blur();
    this.modal = document.createElement("div");
    this.modal.classList.add("modal");
    this.modal.style.paddingRight = "0px";
    var dialog = document.createElement("div");
    dialog.classList.add("modal-dialog");
    var content = document.createElement("div");
    content.classList.add("modal-content");
    var modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
    var rowSeleccion = document.createElement("div");
    rowSeleccion.classList.add("row");
    this.tablaSeleccion = document.createElement("div");
    this.tablaSeleccion.classList.add("col-xs-12");
    /*Creo los filtros*/
    modalBody.appendChild(this.createFilters());
    rowSeleccion.appendChild(this.tablaSeleccion);
    modalBody.appendChild(rowSeleccion);
    modalBody.appendChild(this.createFooter());
    content.innerHTML += this.createHeader();
    content.appendChild(modalBody);
    dialog.appendChild(content);
    this.modal.appendChild(dialog);
    document.getElementsByClassName("contenido")[0].appendChild(this.modal);
    this.setKeysListeners();
    this.setLinkListener();
    this.executeAjax();
  },

  createFilters: function(){
    var gestor = this;
    var divFiltros = document.createElement("div");
    var rowFilter = document.createElement("div");
    rowFilter.classList.add("row");
    var flagFilter = false;
    this.filtros.forEach(e => {
      if(e.input){
        var iFilter = document.createElement("div");
        iFilter.classList.add("col-xs-6");
        var htmlFilter =
        "<label class='placeholder-select'>" + e.nombreHeader + "</label>" +
        "<input type="+ e.input + "' onblur='onBlurSelect()' onfocus='focusSelect()' class='form-control form-modal-seleccion filter-modal-controller modal-filtro-"+ e.nombre +"'>";
        iFilter.innerHTML += htmlFilter;
        rowFilter.appendChild(iFilter);
        flagFilter = true;
      }
    });
    if(flagFilter){
      /*Creación de buttons*/
      var cancelButtonC = document.createElement("div");
      cancelButtonC.className = "col-xs-4";
      var inputCancel = document.createElement("input");
      inputCancel.className = "btn btn-primary btn-modal-cancelar";
      inputCancel.style.marginTop = "0px !important";
      inputCancel.style.fontSize = "17px";
      inputCancel.style.width = "100%";
      inputCancel.setAttribute("type", "button");
      inputCancel.value="Mostrar todos";
      var filterButtonC = document.createElement("div");
      filterButtonC.className = "col-xs-8";
      filterButtonC.style.paddingLeft = "0px"
      var inputFilter = document.createElement("input");
      inputFilter.className = "btn btn-primary btn-filtros";

      inputCancel.addEventListener("click", function(){
        gestor.setPageNumber();
        gestor.cleanFilters();
      });

      inputFilter.addEventListener("click", function(){
        gestor.setPageNumber();
        gestor.filter();
      });

      inputFilter.style.marginTop = "0px !important";
      inputFilter.style.fontSize = "17px";
      inputFilter.style.width = "100%";
      inputFilter.setAttribute("type", "button");
      inputFilter.value="Filtrar";

      /*Appends*/
      cancelButtonC.appendChild(inputCancel);
      filterButtonC.appendChild(inputFilter);
      rowFilter.appendChild(cancelButtonC);
      rowFilter.appendChild(filterButtonC);
      divFiltros.appendChild(rowFilter);
    }
    return divFiltros;
  },

  executeAjax: function(){
    this.data = this.createData();
    var gestor = this;
    $.ajax({
      url: this.ajaxURL,
      data: this.data,
      dataType: 'json',
      type: this.peticion,
      success: function (json) {
        this.jsonActual = json;
        gestor.createSelectionTable(json);
      },
      error: function (xhr, status) {
        console.log("Error al acceder a los datos");
        console.log(xhr);
        console.log(status);
      }
    });
  },

  createData: function(){
    this.data = {};
    var dt = this.data;
    this.filtros.forEach( fl => {
      if("objeto" in fl){
        if(!dt[fl["objeto"]]) dt[fl["objeto"]] = {};
        dt[fl["objeto"]][fl.nombre] = fl.valor;
      }
      else{
        dt[fl.nombre] = fl.valor;
      }
    });
    return this.data;
  },

  createHeader: function(){
    var header = "<div class='panel-heading'>" +
    "<div class='panel-portrait'>" +
    "<i class='material-icons portrait'>search</i></div>";
    if (this.titulo != null) {
      header += "<div class='panel-header'>" + this.titulo + "</div></div>";
    }
    else {
      header += "<div class='panel-header'>Seleccione</div></div>";
    }
    return header;
  },

  createFooter: function(){
      let gestor = this;
      var footer = document.createElement("div");
      footer.className = "row";
      var footerCol = document.createElement("div");
      footerCol.className = "col-xs-12";
      var cerrar = document.createElement("div");
      cerrar.className = "btn btn-primary btn-modal-cancelar-nomrg";
      cerrar.style.width = "100%";
      cerrar.addEventListener("click", function(){
        gestor.closeModal();
      });
      cerrar.innerHTML = "Cerrar";
    
      footerCol.appendChild(cerrar);
      footer.appendChild(footerCol);
      return footer;
  },

  createSelectionTable: function(json){
      if(this.tratamientoDatos){
        json = this.tratamientoDatos(json);
      }
      var ubicacionPaginas = this.cantPaginas;
      var cantPaginas = json;
      if(ubicacionPaginas){
        for(var i = 0; i < ubicacionPaginas.length; i++){
          cantPaginas = cantPaginas[ubicacionPaginas[i]];
        }
      }

      var ubicacion = this.ubicacionData;
      for(var i = 0; i < ubicacion.length; i++){
        json = json[ubicacion[i]];
      }

      var objeto = json[0];
      var header = [];
      for (var key in objeto){
        if (objeto.hasOwnProperty(key)) {
          if(key != "id"){
            key = this.mayusculasPrimerLetra(key.split("_").join(" "));
            header.push(key);
          }
        }
      }
      crearTabla(json, header, this.tablaSeleccion, [] , cantPaginas, this.numeroPagina);
      var trs = this.modal.getElementsByTagName("tr");
      for(var i = 1; i < trs.length; i++){
        trs[i].style.cursor = "pointer";
      };
      this.getSelectionListener();
  },

  getSelectionListener: function(){
    let gestor = this;
      $(this.tablaSeleccion).find('tbody tr').click(function () {
        gestor.seleccionActualModal = {};
        var header = [];
        $(gestor.tablaSeleccion).find('tr').first().find("td").each(function(){
          header.push(gestor.minusculasPrimerLetra(($(this).html()).split(" ").join("_")));
        });
        gestor.seleccionActualModal.id = $(this).attr("id");
    
        let i = 0;
        $(this).find("td").each(function(){
          gestor.seleccionActualModal[header[i]] = $(this).html();
          i++;
        })
        gestor.closeModal();
        gestor.callback(gestor.seleccionActualModal);
    });
    this.showModal(gestor.modal);
  },

  mayusculasPrimerLetra: function(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },
  
  minusculasPrimerLetra: function(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  },

  cleanFilters: function(){
    var inputs = this.modal.getElementsByClassName("form-modal-seleccion");
    Array.prototype.forEach.call(inputs, function(ip) {
      ip.value = "";
    });
    this.filtros.forEach(fl => {
      if("input" in fl){
        fl.valor = "";
      }
    });
    this.setPageNumber();
    this.executeAjax();
  },

  setPageNumber: function(num){
    var gestor = this;
    gestor.filtros.forEach(fl => {
      if("paginacion" in fl){
        if(num){
          fl.valor = gestor.numeroPagina = num;
        }
        else{
          num = 1;
          fl.valor = gestor.numeroPagina = num;
        }
      } 
    });
  },

   setLinkListener: function(){
      var gestor = this;
      $(this.modal).on("click", ".page-link", function(){
        gestor.setPageNumber(parseInt($(this).html()));
        gestor.executeAjax();
    });
   },

   filter: function(){

    let modal = this.modal;
    this.filtros.forEach(fl => {
      if("input" in fl){
        let nomInput = "modal-filtro-" + fl.nombre;
        fl.valor = modal.getElementsByClassName(nomInput)[0].value;
      }
    });
    this.executeAjax();
   },

   setKeysListeners: function(){
    var gestor = this;
    var inputs = gestor.modal.getElementsByClassName("filter-modal-controller");

    gestor.modal.addEventListener("keydown", function(event){
      if(event.keyCode == '27'){
        gestor.closeModal();
      }
    });

    for(var i = 0; i < inputs.length; i++){
      inputs[i].addEventListener("keydown", function(event){
        if(event.keyCode == 13){
          gestor.filter();
          event.stopPropagation();
        }             
      });
    }

    gestor.modal.addEventListener("keydown", function(event){
      if(event.key == 'Delete'){
        gestor.cleanFilters();
      }
    });
   },

   showModal: function(e){
     $(e).modal("show");
     var inputs = this.modal.getElementsByTagName("input");
     if(inputs.length > 0)
     inputs[0].focus();
   },

   closeModal: function(){
     $(this.modal).modal("hide");
     $('body:first *:input[type!=hidden]:first').focus();
   },
}