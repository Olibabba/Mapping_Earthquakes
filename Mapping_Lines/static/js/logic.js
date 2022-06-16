// Add console.log to check to see if our code is working.
console.log("working");
console.log(cities)

const cityData = cities
// Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//     L.marker(city.location).addTo(map);
// });



var map = L.map('mapid').setView([38.0522, -99.2437], 4);

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
// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// for (let i = 0; i < cityData.length; i++){
//     console.log(cityData[i].location)
//     L.marker(cityData[i].location).addTo(map);
// }
cityData.forEach(function(city) {
    console.log(city.location)
    L.circle(city.location, {
        color: 'orange',
        fillColor: 'orange',
        fillOpacity: 0.75,
        radius: city.population/40
    })
    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population.toLocaleString() + "</h3>")
    .addTo(map);
});
// Coordinates for each point to be used in the line.
let line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];
// Create a polyline using the line coordinates and make the line red.
L.polyline(line, {
    color: "yellow"
  }).addTo(map);
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);