// Add console.log to check to see if our code is working.
console.log("working");
// console.log(cities)

const cityData = cities
// Loop through the cities array and create one marker for each city.
// cities.forEach(function(city) {
//     L.marker(city.location).addTo(map);
// });

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  // This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  };
  // This function determines the radius of the earthquake marker based on its magnitude.
  // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
  function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
  }
  function getColor(magnitude) {
    if (magnitude >= 0 && magnitude <= 1) {
      return "#e9d8a6";
    }
    if (magnitude > 1 && magnitude <= 2) {
      return "#ffb703";
    }
    if (magnitude > 2 && magnitude <= 3) {
      return "#fb8500";
    }
    if (magnitude > 3 && magnitude <= 4) {
      return "#8ecae6";
    }
    if (magnitude > 4 && magnitude <= 5) {
      return "#4361ee";
    }
    if (magnitude > 5) {
      return "#ffd60a";
    }
  }
  L.geoJSON(data, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng)
    },
    onEachFeature: function(feature, layer) {
        layer.bindPopup((`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h4>Location: ${feature.properties.place}</h4>`)); 
    },
    style: styleInfo
  }).addTo(map);
});

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
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let navStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-night-v1/tiles/{z}/{x}/{y}?access_token={accessToken}', {
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

let satStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
// streets.addTo(map);
// Create a base layer that holds both maps.
let baseMaps = {
    Light: light,
    Street: navStreets,
    Satellite: satStreets,
    Dark: dark
  };

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [satStreets]
})

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/Olibabba/Mapping_Earthquakes/Mapping_GeoJSON_Points/Mapping_GEOJSON_Points/static/js/majorAirports.json";
// let torontoData = "https://raw.githubusercontent.com/Olibabba/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json"

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
// d3.json(torontoData).then(function(data) {
//     console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
//   L.geoJSON(data).addTo(map);
// });
    
    
