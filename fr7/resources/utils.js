var map;
var origem;
var destino;
var bounds
var vehicleUrl = "http://api.plataforma.cittati.com.br/m3p/js/vehicles/service/";
var busInterval;
var timeUpdateBus = 10000;
var busMarkers = [];

function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var geocoder = new google.maps.Geocoder();
    var geocoder2 = new google.maps.Geocoder();
    var flightPlanCoordinates = [];
    var marker;
    var totalStops = mapConfig.details.stops.length;

    origem = mapConfig.details.stops[0].location;
    destino = mapConfig.details.stops[totalStops - 1].location;
    bounds = new google.maps.LatLngBounds();
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 1,
        center: origem
    });

    directionsDisplay.setMap(map);

    mapConfig.details.stops.forEach(function(el, idx) {
        flightPlanCoordinates.push(el.location);

        if (idx == 0 || idx == (totalStops - 1)) {
            // console.log(idx);
        } else {
            var infowindow = new google.maps.InfoWindow({
                content: el.mnemonic
            });
            var mk;
            mk = new google.maps.Marker({
                map: map,
                icon: 'resources/img/bus_stop.png',
                position: el.location,
                title: el.mnemonic
            });

            mk.addListener('click', function() {
                infowindow.open(map, mk);
            });

        }
        bounds.extend(new google.maps.LatLng(el.location.lat, el.location.lng));

    });

    marker = new google.maps.Marker({
        map: map,
        icon: 'resources/img/pin-origem.png',
        position: origem
    });
    marker = new google.maps.Marker({
        map: map,
        icon: 'resources/img/pin-destino.png',
        position: destino
    });

    var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 1.0,
        strokeWeight: 2
    });


    flightPath.setMap(map);
    // calculateAndDisplayRoute(directionsService, directionsDisplay, origem, destino);
    map.fitBounds(bounds);
    updateBusMarkers(map, mapConfig);

    busInterval = setInterval(function() {
        updateBusMarkers(map, mapConfig);
    }, timeUpdateBus);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, origem, destino) {
    directionsService.route({
        origin: origem,
        destination: destino,
        transitOptions: {
            modes: [google.maps.TransitMode.BUS],
        },
        travelMode: google.maps.TravelMode.TRANSIT
    }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            console.log(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function setBusMarkers(myMap, myLine) {
    busMarkers = [];
    $.ajax({
        method: "GET",
        url: vehicleUrl + myLine.id
    }).done(function(data) {
        data.forEach(function(el, idx) {
            var infowindow = new google.maps.InfoWindow({
                content: "<div>" + el.plate + "</div><div>" + el.prefix + "</div>"
            });
            mk = new google.maps.Marker({
                map: myMap,
                icon: 'resources/img/pin_bus.png',
                position: new google.maps.LatLng(el.lat, el.lng)
            })
            mk.addListener('click', function(ev) {
                infowindow.open(map, mk)
            });
            busMarkers.push(mk);
        });
    }).fail(function(err) {
        console.log(err)

    });
}

function removeBusMarkers() {
    for (var i = 0; i < busMarkers.length; i++) {
        busMarkers[i].setMap(null);
    }
}

function updateBusMarkers(myMap, myLine) {
    console.log("updateBusMarkers");
    removeBusMarkers();
    setBusMarkers(myMap, myLine);

}

function removeBusInterval(valInterval) {
    clearInterval(valInterval);
}