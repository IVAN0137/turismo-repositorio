// Inicializar el mapa y establecer la vista inicial
var map = L.map('map').setView([21.1397, -99.6266], 13);

// Añadir la capa de tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Añadir controles de zoom y escala
L.control.scale({
    position: 'topright'
}).addTo(map);

var currentRoute = null;

// Array de marcadores
var markers = [
    { coords: [21.13480, -99.62855], name: 'PINAL DE AMOLES', popup: '<a href="pinal.html"><b>PINAL DE AMOLES</b><br><img src="res/PINAL.jpg" alt="Mirador Pinal" width="150" height="100"></a>' },
    { coords: [21.18546, -99.61196], name: 'PUENTE DE DIOS', popup: '<a href="pinal.html"><b>PUENTE DE DIOS</b><br><img src="res/puente de dios.jpg" alt="Puente De Dios" width="150" height="100"></a>' },
    { coords: [21.08033, -99.66208], name: 'MIRADOR CUATRO PALOS', popup: '<a href="pinal.html"><b>MIRADOR CUATRO PALOS</b><br><img src="res/mirador-cuatro-palos.jpg" alt="Mirador Cuatro Palos" width="150" height="100"></a>' },
    { coords: [21.13461, -99.62533], name: 'PARROQUIA SAN JOSE PINAL DE AMOLES', popup: '<a href="pinal.html"><b>PARROQUIA SAN JOSE PINAL DE AMOLES</b><br><img src="res/parroquia-san-jose.jpg" alt="Parroquia San Jose" width="150" height="100"></a>' },
    { coords: [21.13434, -99.62746], name: 'MUSEO COMUNITARIO PINAL DE AMOLES', popup: '<a href="pinal.html"><b>MUSEO COMUNITARIO PINAL DE AMOLES</b><br><img src="res/museo-comunitario.jpg" alt="Museo Comunitario" width="150" height="100"></a>' },
    { coords: [21.13324, -99.62546], name: 'AUDITORIO MUNICIPAL', popup: '<a href="pinal.html"><b>AUDITORIO MUNICIPAL</b><br><img src="res/auditorio-municipal.jpg" alt="Auditorio Municipal" width="150" height="100"></a>' },
    { coords: [21.161765, -99.561271], name: 'CASCADA EL CHUVEJE', popup: '<a href="pinal.html"><b>CASCADA EL CHUVEJE</b><br><a href="#"><img src="res/chuveje.jpg" alt="Cascada El Chuveje" width="150" height="100"></a>' },
    { coords: [21.126811, -99.637523], name: 'PUERTA DEL CIELO', popup: '<a href="pinal.html"><b>PUERTA DEL CIELO</b><br><img src="res/puerta-del-cielo.jpg" alt="Puerta del Cielo" width="150" height="100">' },
    { coords: [21.035866, -99.619614], name: 'CAMPAMENTO EL MANGAL, BUCARELI', popup: '<a href="pinal.html"><b>CAMPAMENTO EL MANGAL, BUCARELI</b><br><img src="res/campamento-el-mangal.jpg" alt="Campamento El Mangal" width="150" height="100"></a>' },
    { coords: [21.196211, -99.516402], name: 'CUEVA DE LOS RISCOS', popup: '<a href="pinal.html"><b>CUEVA DE LOS RISCOS</b><br><img src="res/cueva-de-los-riscos.jpg" alt="Cueva de los Riscos" width="150" height="100"></a>' },
    { coords: [21.233713,-99.6251149], name: 'CAÑON DEL INFIERNILLO', popup: '<a href="pinal/html"><b>CAÑON DEL INFIERNILLO</b><br><img src="" alt="Cañon del Infiiernillo" width="150" height="100"></a>' },
    { coords: [21.11297, -99.62452], name: 'MIRADOR DE LAS GUACAMAYAS ', popup: '<a href="pinal.html"><b>MIRADOR DE LAS GUACAMAYAS</b><br><img src="" alt="Mirador De Las Guacamayas(Mirador De Cristal)" width="150" height="100"></a>' },
    { coords: [21.04085, -99.61413], name: 'BUCARELI', popup: '<a href="pinal.html"><b>BUCARELI</b><br><img src="" alt="Bucareli" width="150" height="100"></a>' },
    { coords: [21.037164, -99.614668], name: 'EX CONVENTO BUCARELI', popup: '<a href="pinal.html"><b>EX CONVENTO BUCARELI</b><br><img src="res/" alt="Ex Convento Bucareli" width="150" height="100"></a>' },
    { coords: [21.134362, -99.626095], name: 'MONUMENTO HACIA LOS MINEROS', popup: '<a href="pinal.html"><b>MONUMENTO HACIA LOS MINEROS</b><br><img src="res/" alt="Monumento Hacia Los Mineros" width="150" height="100"></a>' },
    { coords: [21.134545, -99.624812], name: 'CENTRO COMUNITARIO', popup: '<a href="pinal.html"><b>CENTRO COMUNITARIO</b><br><img src="res/" alt="Centro comunitario" width="150" height="100"></a>' },
    { coords: [], name:'CASA DEL ESTUDIANTE PEÑAMILLER', popup: '<a href="pinal.html"><b>CASA DEL ESTUDIANTE PEÑAMILLER</b><br><>img src="" alt="casa del estudiante pinal de amoles" width="150" height="100"><a/>'},
    // Jalpan de Serra     
    { coords: [21.217321, -99.473034], name: 'JALPAN DE SERRA', popup: '<a href="pinal.html"><b>JALPAN DE SERRA</b><br><img src="res/" alt="Jalpan De serra" width="150" height="100"></a>' },
    { coords: [21.216758, -99.473858], name: 'MISIÓN DE SANTIANGO', popup: '<a href="jalpan.html"><b>MISIÓN DE SANTIAGO</b><br><img src="res/" alt="Jalpan" width="150" height="100"></a>' },
    { coords: [21.20622, -99.47230], name: 'PRESA JALPAN', popup: '<a href="jalpan.html"><b>PRESA JALPAN</b><br><img src="res/" alt="Presa Jalpan" width="150" height="100"></a>' },
    { coords: [21.217263, -99.472253], name: 'ANDADOR EL SALTO', popup: '<a href="jalpan.html"><b>ANDADOR EL SALTO</b><br><img src="res/" alt="Andador El Salto" width="150" height="100"></a>' },
    { coords: [21.217768, -99.473729], name: 'MUSEO HISTORICO DE LA SIERRA GORDA', popup: '<a href="jalpan.html"><b>MUSEO HISTORICO DE LA SIERRA GORDA</b><br><img src="res/" alt="Museo Historico De La Sierra Gorda" width="150" height="100"></a>' },
    { coords: [21.18390, -99.32157], name: 'LANDA DE MATAMOROS', popup: '<b>LANDA DE MARAMOROS</b><br><img src="res/landa-de-matamoros.jpg" alt="Landa de Matamoros" width="150" height="100">' },
];

// Crear marcadores y añadir eventos
markers.forEach(function(marker) {
    // Crear un marcador y añadirlo al mapa
    var leafletMarker = L.marker(marker.coords).addTo(map);
    leafletMarker.bindPopup(marker.popup);

    // Añadir a la lista de direcciones
    var listItem = document.createElement('li');
    listItem.innerHTML = `<a href="#" data-lat="${marker.coords[0]}" data-lng="${marker.coords[1]}">${marker.name}</a>`;
    document.getElementById('directions-list').appendChild(listItem);

    // Evento de clic en el marcador del mapa
    leafletMarker.on('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var userLocation = [position.coords.latitude, position.coords.longitude];
                
                // Eliminar la ruta actual si existe
                if (currentRoute) {
                    map.removeControl(currentRoute);
                }

                // Crear y añadir la nueva ruta
                currentRoute = L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation),
                        L.latLng(marker.coords)
                    ],
                    routeWhileDragging: true,
                    language: 'es'
                }).addTo(map);
            }, function(error) {
                alert("Error al obtener la ubicación: " + error.message);
            });
        } else {
            alert("Geolocalización no es soportada por este navegador.");
        }
    });
});

// Añadir eventos de clic para la lista de destinos
document.getElementById('directions-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        event.preventDefault();
        var lat = parseFloat(event.target.getAttribute('data-lat'));
        var lng = parseFloat(event.target.getAttribute('data-lng'));
        var destination = [lat, lng];

        if (!isNaN(lat) && !isNaN(lng)) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    var userLocation = [position.coords.latitude, position.coords.longitude];
                    
                    // Eliminar la ruta actual si existe
                    if (currentRoute) {
                        map.removeControl(currentRoute);
                    }

                    // Crear y añadir la nueva ruta
                    currentRoute = L.Routing.control({
                        waypoints: [
                            L.latLng(userLocation),
                            L.latLng(destination)
                        ],
                        routeWhileDragging: true,
                        language: 'es'
                    }).addTo(map);

                    // Centramos el mapa en el destino y abrimos el popup
                    map.setView(destination, 14); // Ajusta el nivel de zoom según sea necesario

                    // Buscar el marcador correspondiente y abrir su popup
                    markers.forEach(function(marker) {
                        if (marker.coords[0] === lat && marker.coords[1] === lng) {
                            leafletMarker = L.marker(marker.coords).addTo(map);
                            leafletMarker.bindPopup(marker.popup).openPopup();
                        }
                    });
                }, function(error) {
                    alert("Error al obtener la ubicación: " + error.message);
                });
            } else {
                alert("Geolocalización no es soportada por este navegador.");
            }
        } else {
            alert("Coordenadas del destino no válidas.");
        }
    }
});

