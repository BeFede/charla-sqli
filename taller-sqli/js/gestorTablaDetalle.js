
/***
 * ESTO ESTA RE LOCO. ESPERO QUE SIRVA =)
 * Table data es un objeto con las rows.
 * Maneja las rows desde el id 1, getRow(1) devuelve la primer fila. Esto para que corresponda con los id de detalles
 */

var GestorTablaDetalle = function(idContainer, idTable, tableColumns, deleteBoolean, modifyBoolean, modifyFunction, deleteFunction, totalizer, autoId){
  this.autoId = autoId;
  this.idContainer = idContainer;
  this.idTable = idTable;
  this.tableColumns = tableColumns;
  this.tableHTML = "";
  this.tableData = {"rows": []};
  this.tableDataHTML = "";
  this.deleteBoolean = deleteBoolean;
  this.modifyBoolean = modifyBoolean;
  this.modifyFunction = modifyFunction; //pasar una funcion para ejecutar por default como callback 
  this.deleteFunction = deleteFunction;
  this.totalizer = totalizer;
  this.createTable();
}

GestorTablaDetalle.prototype = {

    setEmptyMessage: function (mensaje){
        this.headerMessage.innerHTML = mensaje;
    },

    //función que genera la tabla desde 0 a partir de los parámetros pasados. 
    createTable: function(){
        this.tableHTML = "";
        this.tableHTML = document.createElement("div");
        this.tableHTML.classList.add("ssTableRow", "row");
        this.tableHTML.id = this.idTable + "-HTML";
        let mainWrapper = document.createElement("div"); 
        mainWrapper.classList.add("col-xs-12");

        table = document.createElement("div");
        table.className = "ssTable wraper-tabla";
        table.id = this.idTable;

        let tableFull = document.createElement('table');
        tableFull.className = "table table-responsive table-hover table-striped ";
        tableFull.appendChild(this.createHeader(this.tableDataHTML));

        this.tableDataHTML = document.createElement("tbody"); //html del body
        tableFull.appendChild(this.tableDataHTML);
        table.appendChild(tableFull);
        mainWrapper.appendChild(table);
        this.tableHTML.appendChild(mainWrapper); //html de table completa
        document.getElementById(this.idContainer).appendChild(this.tableHTML);
        
        //crear mensaje vacío
        var emptyMessage = document.createElement("div");
        emptyMessage.className = "col-xs-12";
        this.headerMessage = document.createElement("h3");
        this.headerMessage.className = "message-table-empty";
        this.headerMessage.style.fontSize = "18px";
        this.headerMessage.style.padding = "0px 15px";
        emptyMessage.appendChild(this.headerMessage);
        this.setEmptyMessage("No se registraron detalles");
        this.tableHTML.appendChild(emptyMessage);
        this.addTotalizer();
    },

    getColCount: function(param){
        let colCount = 1;
        let arr = this.tableColumns;
        if(Array.isArray(param)){
            arr = param;
        }
        arr.forEach(e => {
            colCount ++;
        });
        return colCount;
    },

    addRow: function(rowData, idRow){
        //añade a la table data y al arbol de rows

        idRow ? rowData.id = idRow : rowData.id = this.getRowCount() + 1; 
        var td = this.tableData;
        var cols = this.tableColumns;
        var agrupables = [];
        var sumables = [];
        for(var i = 0; i < cols.length; i++){
            if(cols[i].agrupable == true){
                agrupables.push(i); //columna que se va a agrupar
            }
            if(cols[i].agrupable == "sum"){
                sumables.push(i); //columna que se va a sumar
            }
        }

        var sumado = false;
        if(agrupables.length != 0){

            for(let i = 0; i < td.rows.length; i++){
                let flag = true;
                for(let j = 0; j < agrupables.length; j++){
                    if (JSON.stringify(td.rows[i][agrupables[j]]) != JSON.stringify(rowData[agrupables[j]])) flag = false;
                }
                if(flag){
                    for(let j = 0; j < sumables.length; j++){
                        td.rows[i][sumables[j]] = parseFloat(parseFloat(td.rows[i][sumables[j]]) + parseFloat(rowData[sumables[j]])).toFixed(2);
                    }
                    sumado = true;
                }
            }

        }

        if(Array.isArray(rowData)){
            if(!sumado){
                this.tableData.rows.push(rowData); 
            }
            this.printTable();
        }
        else if(!rowData){
            let rowData = [];
            for(let i = 1; i < this.getColCount(); i++){
                rowData.push("");
            }
            this.tableData.rows.push(rowData); 
            this.printTable();
        }
        else{
            console.log("Ingrese un ARRAY con Cantidad de columnas = " + this.getColCount());
        }
    },

    getTableId: function(){
        return this.idTable; //retorna el id del elemento EN STRING
    },

    getTableHTML: function(){
        return this.tableHTML;
    },
    
    getContainerId: function(){
        return this.idContainer;
    },

    //devuelve un object o un array de objects
    getRowArray: function(numRow){
        numRow = numRow - 1;
        return this.tableData.rows[numRow];
    },

    getRowObject: function(numRow){
        let row;
        this.tableData.rows.forEach(e => {
            if(e.id == numRow) {
                row = e;
            }
        });
        let obj = {};
        obj.datos = [];
        obj.id_detalle = numRow;

        for(var i = 0; i < row.length; i++){
            let objTd = {};
            if(!row[i].dato){
                objTd.dato = row[i];
                objTd.valor =  null;
                obj.datos.push(objTd);
            }
            else{
                obj.datos.push(row[i]);
            }
        }
        return obj;
    },

    delete: function(numRow){
        let id = numRow; 
        if(numRow){
            this.tableData.rows.forEach(row => {
                let rowIndex = this.tableData.rows.indexOf(row);
                if(rowIndex+1 == numRow){
                    id = this.tableData.rows[rowIndex].id;
                    this.tableData.rows.splice(rowIndex, 1);
                    this.printTable();
                }
            });
        }
        else{
            this.tableData.rows = [];
            this.printTable();
        }
        if(this.deleteFunction){
            this.deleteFunction(id);
        };
    },

    clear: function(){
        this.tableData.rows = [];
        this.printTable();
    },

    createHeader: function(){
        let header = document.createElement("thead");
        if(Array.isArray(this.tableColumns)){
        header.className = "ssThead";
        let headTr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerHTML = "Nro.";
        headTr.appendChild(td);
            this.tableColumns.forEach(col => {
                let td = document.createElement("td");
                td.innerHTML += col.nombre;
                headTr.appendChild(td);
            });
            if(this.deleteBoolean || this.modifyBoolean){
                let td = document.createElement("td");
                td.innerHTML = "Acciones";
                headTr.appendChild(td);
            }
        header.appendChild(headTr);
        }
        
        return header;
    },

    getRowCount: function(){
        return this.tableData.rows.length;
    },

    toString: function(){
        return "Contenedor: " + this.idContainer + "\nTabla: " + this.idTable + "\nColumnas: " + this.tableColumns;
    },

    printTable: function(){
        var rowCount = this.getRowCount();
        if(rowCount == 1){
            this.headerMessage.parentNode.style.display = "none";
        }
        this.tableDataHTML.innerHTML = "";
        this.tableData.rows.forEach(row => {
            let tr = document.createElement("tr");
            let td = document.createElement("td");
            if(!row.id) tr.id = parseInt(this.tableData.rows.indexOf(row)) + 1;
            else tr.id = row.id;

            td.innerHTML = parseInt(this.tableData.rows.indexOf(row)) + 1;
            tr.appendChild(td);
            row.forEach( dt => {
                let td = document.createElement("td");
                try{
                    if(dt["dato"] != undefined){
                        td.id = dt["valor"];
                        td.innerHTML = dt["dato"];
                    }
                    else{
                        td.innerHTML = dt;
                    }
                    tr.appendChild(td);
                }
                catch(e){
                    console.log("Error: " + e + " tipo de dato erroneo");
                }
            });
            if(this.deleteBoolean || this.modifyBoolean){
                let td = document.createElement("td");
                if(this.modifyBoolean){
                    td.innerHTML += '<a title="Editar" class="btn-visualizar tCModify">'+
                    '<i class="fa fa-edit"></i></a>';
                }
                if(this.deleteBoolean){
                    td.innerHTML += '<a title="Eliminar" class="btn-visualizar tCDelete">'+
                    '<i class="fa fa-trash"></i></a>';
                }
                tr.appendChild(td);
            }
            
            this.tableDataHTML.appendChild(tr);
        });
        this.addButtonListeners(this);
        if(rowCount == 0){
            this.headerMessage.parentNode.style.display = "block";
        }
        this.calculateTotalizer();
    },

    addButtonListeners: function(table){
        let numRow = 0;
        var deletes = document.getElementsByClassName("tCDelete");
        for(var i = 0; i < deletes.length; i++){
            deletes[i].addEventListener("click", function(){
                numRow = this.parentNode.parentNode.id;
                table.delete(numRow);
            });
        };
        var modif = document.getElementsByClassName("tCModify");
        var modifyF = this.modifyFunction;
        numRow = 0;
        for(var i = 0; i < modif.length; i++){
            modif[i].parentNode.parentNode.addEventListener("dblclick", function(){
                numRow = this.id;
                table.modify(modifyF, numRow);
            });
            modif[i].addEventListener("click", function(){
                numRow = this.parentNode.parentNode.id;
                table.modify(modifyF, numRow);
            });
        };
    },

    modify: function(callback, numRow){
        //aca se retorna el objeto a la funcion pasada por parametro
        let obj = this.getRowObject(numRow);
        callback(obj);
    },

    addTotalizer: function(){
        var gestor = this;
        var totalizer = this.totalizer;
        if(totalizer){
            this.tot = document.createElement("div");
            this.tot.className = "col-md-offset-7 col-md-5 col-xs-12";
            this.totalizador = document.createElement("div");
            this.totalizador.style.backgroundColor = "#444";
            this.totalizador.style.color = "white";
            this.totalizador.style.fontSize = "22px";
            this.totalizador.style.textAlign = "center";
            this.totalizador.style.marginTop = "15px";
            var num = 0.00;
            this.total = num;
            this.totalizador.innerHTML = "Total: $ " + parseFloat(num).toFixed(2);
            this.tot.appendChild(this.totalizador);
            this.tableHTML.appendChild(this.tot);
        }
    },

    calculateTotalizer: function(){
        var gestor = this;
        if(gestor.totalizer){
            var num = 0.00;
            for(var i = 0; i < gestor.getRowCount(); i++){
                num = parseFloat(num) + parseFloat(gestor.getRowArray(i+1)[gestor.totalizer-1]);
            }
            this.total = num;
            this.totalizador.innerHTML = "Total: $ " + parseFloat(num).toFixed(2);
        }
    },

    replaceRow: function(array, numRow){
        this.delete(numRow);
        this.addRow(array);
    },

    getRow: function(nroRow){
        return this.tableData.rows[nroRow];
    }

    

}


