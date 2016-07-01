var map;

function initMap(a, b) {
    var myLatLng = window.mapConfig.localizacao.origem;
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 11
    });
    var marker1 = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: "resources/img/pin-origem.png",
        title: 'Origem'
    });
    var marker2 = new google.maps.Marker({
        position: window.mapConfig.localizacao.destino,
        map: map,
        icon: "resources/img/pin-destino.png",
        title: 'Destino'
    });

    var flightPlanCoordinates = [
        window.mapConfig.localizacao.origem,
        window.mapConfig.localizacao.destino

    ];
    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });

    flightPath.setMap(map);
}