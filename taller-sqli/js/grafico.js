function generarGrafico(datos, nombreLabel, nombreData, nombreEtiqueta, modal, tipo){
    //reset del canvas

    $(modal).modal({
        onOpen: function (dialog) {
            dialog.data.show();
            dialog.container.show();
            dialog.overlay.fadeIn('fast');}
    });
    
    $('#grafico').replaceWith('<canvas id="grafico" style="opacity: 0.7"></canvas>');
    var ctxChart = document.getElementById("grafico").getContext("2d");
    var ctx = document.getElementById("grafico");

    var colores = [];
    var data = []; 
    var labels = [];
    var borders = [];
    
    
    
    var colorActual;
    for(var i = 0; i < datos.length; i++){
        labels.push($(JSON.parse(JSON.stringify(datos))[i]).attr(nombreLabel));
        data.push($(JSON.parse(JSON.stringify(datos))[i]).attr(nombreData));
        colorActual = getRandomColor();
        colores.push(colorActual);
        borders.push("#eee");
    }  
        var myChart = new Chart(ctx, {
        type: tipo,
        data: {
            labels: labels,
            datasets: [{
                label: nombreEtiqueta,
                data: data,
                backgroundColor: colores,
                borderColor: borders,
                borderWidth: 2,
            }]
        },
        options: {
            legend: {
                display: false
             },
            scales: {
                pointLabelFontSize: 20,
                yAxes: [{
                    ticks: {
                        beginAtZero:true,
                    }
                }], 
                xAxes: [
                    {
                      ticks: {
                        autoSkip: true,
                        maxRotation: 0,
                      }
                    }
                  ]
            }
        }
    });
}

  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    
    return color;
    }
