var localRecents = "recents";
var localRecentsTotal = 20;
var map;
var origem;
var destino;
var bounds
var vehicleUrl = "http://api.plataforma.cittati.com.br/m3p/js/vehicles/service/";
var busInterval;
var timeUpdateBus = 10000;
var busMarkers = [];



var Local = function() {

    this.get = function(id) {
        curr = JSON.parse(localStorage.getItem(localRecents)) || [];
        if (id == undefined) {
            return curr;
        }
        var tmpLocal = {};
        for (i = 0; i < curr.length; i++) {
            // console.log(curr);
            if (curr[i].id == id) {
                tmpLocal = curr[i];
                break;
            }
        }
        return tmpLocal;
    }


    this.set = function(line) {
        curr = this.get();
        if (curr.length >= localRecentsTotal) {
            curr.shift();
        }
        line.createAt = Date.now();
        curr.push(line);
        curr = JSON.stringify(curr);
        localStorage.setItem(localRecents, curr);
    }

    this.remove = function(id) {
        idExist = false;
        curr = this.get();

        curr = curr.filter(function(el) {
            if (el.id == id) {
                idExist = true;
                return false;
            }
            return true;
        });
        curr = JSON.stringify(curr);
        localStorage.setItem(localRecents, curr);
        return idExist;
    }
    this.clear = function() {
        localStorage.clear();
    }

}

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
            var mkbus = new google.maps.Marker({
                map: myMap,
                icon: 'resources/img/pin_bus.png',
                position: new google.maps.LatLng(el.lat, el.lng)
            })

            var mP = map.getProjection();
            var pos = mP.fromLatLngToPoint({
                lat: mkbus.position.lat,
                lng: mkbus.position.lng
            });

            // console.log(pos);
            // $("#map").append("<div class='vehicle' style='position:absolute;width:100px;height:100px;top:'"+pos.y+";left:></div>");
            // mkbus.addListener('click', function(ev, ev2) {
            //     infowindow.open(map, mkbus)

            // });
            busMarkers.push(mkbus);
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


local = new Local();