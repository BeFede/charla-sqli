
function ApiMaps(mapContenedor, coordenadas = {lat: -31.4030135, lng: -64.2215904}, marcador = ""){
    var mapa = {}

    mapa.contenedor = mapContenedor;
    mapa.coordenadas = coordenadas;
    mapa.marcador = marcador;
    mapa.mapa = null;
    mapa.markers = []


    mapa.init = function(){
        mapa.mapa =  new google.maps.Map(mapa.contenedor,{
            zoom: 15,
            center: this.coordenadas,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.TOP_CENTER
            },
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.LEFT_CENTER
            },
            scaleControl: true,
            streetViewControl: true,
            streetViewControlOptions: {
                position: google.maps.ControlPosition.LEFT_TOP
            }
        });
    }


    mapa.addMaker = function(location, mensaje){
        let marker = new google.maps.Marker({
            position: location.geometry.location,
            map: mapa.mapa,
            //icon: marcador,
            title: mensaje
        });
        mapa.markers.push(marker);
        return marker;
    }


    mapa.limpiar = function () {
        for (var i = 0; i < mapa.markers.length; i++) {
            mapa.markers[i].setMap(null);
        }
    }

    mapa.agregarDirecciones = function(direcciones) {
        var lost_addresses = [];
        var ok_addresses = 0;



            // sleep(1000);
            //console.log("durmiendo")


    }

    mapa.agregarMarcadorDesdeDireccion = function(address, mensaje, centroMutual = false){
        //setMapOnAll(null);
        let marker = null;
        var geocoder = new google.maps.Geocoder();
        //var location = undefined;
        // Hacemos la petición indicando la dirección e invocamos la función
        // geocodeResult enviando todo el resultado obtenido

        return new Promise(function(resolve, reject) {
            geocoder.geocode({'address': address}, function(results, status) {
                if (status === 'OK') {
                    var location = results[0];
                    marker = mapa.addMaker(location, mensaje);

                    if (!centroMutual){
                        mapa.centrar(results[0].geometry.location);
                    }

                    resolve(marker);
                } else {
                    console.log(status)

                }
            });
        });
    }


    mapa.centrar = function (centro){
        mapa.mapa.setCenter(centro);
    }

    mapa.centrarEnMutual = function(){
        mapa.mapa.setCenter(mapa.coordenadas)
    }

    return mapa;

}
/*

function ApiMaps(mapContenedor, coordenadas = {lat: -31.4201, lng: -64.1888}, marcador = ""){
    this.contenedor = mapContenedor;
    this.coordenadas = coordenadas;
    this.marcador = marcador;
    this.mapa = null;
}

ApiMaps.prototype.init = function(){
    this.mapa =  new google.maps.Map(this.contenedor,{
        zoom: 15,
        center: this.coordenadas,
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.TOP_CENTER
        },
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.LEFT_CENTER
        },
        scaleControl: true,
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }
    });
}

ApiMaps.prototype.addMaker = function(location, mensaje){
    let marker = new google.maps.Marker({
        position: location.geometry.location,
        map: this.mapa,
        //icon: marcador,
        title: mensaje
    });
    markers.push(marker);
    return marker;
}


ApiMaps.prototype.limpiar = function () {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(this.mapa);
    }
}

ApiMaps.prototype.agregarMarcadorDesdeDireccion = function(address, mensaje){
    //setMapOnAll(null);
    let marker = null;
    var geocoder = new google.maps.Geocoder();
    //var location = undefined;
    // Hacemos la petición indicando la dirección e invocamos la función
    // geocodeResult enviando todo el resultado obtenido

    return new Promise(function(resolve, reject) {
        geocoder.geocode({'address': address}, function(results, status) {
            if (status === 'OK') {
                var location = results[0];
                marker = this.addMaker(location, mensaje);
                this.centrar(results[0].geometry.location);
                resolve(marker);
            } else {
                reject(marker);
            }
        });
    });
    }


ApiMaps.prototype.centrar = function (centro){
    this.mapa.setCenter(centro);
}
*/

