// Add console.log to check to see if our code is working.
console.log("working");
// console.log(cities)

const cityData = cities
// Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//     L.marker(city.location).addTo(map);
// });



// var map = L.map('mapid').setView([30, 30], 2);

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     maxZoom: 19,
//     attribution: '© OpenStreetMap'
// }).addTo(map);

// var marker = L.marker([34.0522, -118.2437]).addTo(map);
// L.circle([34.0522, -118.2437], {
//     color: 'black',
//     fillColor: '#ffffa1',
//     fillOpacity: 0.5,
//     radius: 300
//  }).addTo(map);

// L.geoJSON(sanFranAirport, {
//     pointToLayer: function(feature, latlng) {
//         console.log(feature);
//         return L.marker(latlng).bindPopup("<h2>" + feature.properties.city + "</h2>");
//     }
// }).addTo(map);

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
// Create a base layer that holds both maps.
let baseMaps = {
    Street: streets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
let airportData = "https://raw.githubusercontent.com/Olibabba/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GEOJSON_Points/static/js/majorAirports.json";
// for (let i = 0; i < cityData.length; i++){
//     console.log(cityData[i].location)
//     L.marker(cityData[i].location).addTo(map);
// }
// cityData.forEach(function(city) {
//     console.log(city.location)
//     L.circle(city.location, {
//         color: 'orange',
//         fillColor: 'orange',
//         fillOpacity: 0.75,
//         radius: city.population/40
//     })
//     .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
//     .addTo(map);
// });

// Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport).addTo(map);
// Grabbing our GeoJSON data.
d3.json(airportData).then(function(data) {
    for (i = 0; i < data.features.length; i++) { 
    console.log(data.features[i].properties.faa);
  // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data)
    .bindPopup(function (layer) {
        console.log(layer.feature);
        return ("<h2>"+ "Airport Code: " + layer.feature.properties.faa + "</h2> <hr> <h3>Airport Name: " + layer.feature.properties.name + "</h3>")
    })
        .addTo(map)
    }
    ;
})
