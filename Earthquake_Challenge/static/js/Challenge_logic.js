// Add console.log to check to see if our code is working.
console.log("working");



// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
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
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng)
    },
    onEachFeature: function (feature, layer) {
      layer.bindPopup((`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h4>Location: ${feature.properties.place}</h4>`));
    },
    style: styleInfo
  }).addTo(earthquakes);
  earthquakes.addTo(map)

  //Create legend for all earthquakes
  let legend1 = L.control({
    position: 'bottomright'
  });

  legend1.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
      magnitudes = [0, 1, 2, 3, 4, 5];
    colors = [
      "#e9d8a6",
      "#ffb703",
      "#fb8500",
      "#8ecae6",
      "#4361ee",
      "#ffd60a"
    ];
    title = "All";

    // put header on legend
    div.innerHTML += "<p>" + title + "</p> ";
    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
      console.log(colors[i]);
      div.innerHTML +=
        "<i style='background: " + colors[i] + "'></i> " +
        magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }
    return div;
  };

  // 3. Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (data) {
    console.log(data)
    L.geoJSON(data, {
      style: {
        weight: 2,
        color: 'maroon'
      }
    }
    ).addTo(tectonicPlates)
    tectonicPlates.addTo(map)
  });


  // Create Major Earthquake Layer
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(function (data) {

    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor2(feature.properties.mag),
        color: "#000000",
        radius: getRadius2(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    };
    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
    function getRadius2(magnitude) {
      if (magnitude >= 6) {
        return magnitude * 7;
      }
      else if (magnitude > 5) {
        return magnitude * 5;
      }
      else {
        return magnitude * 3;
      }
    };
    function getColor2(magnitude) {
      if (magnitude >= 6) {
        return "red";
      }
      else if (magnitude > 5) {
        return "orange";
      }
      else {
        return "blueviolet";
      }
    }
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng)
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup((`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h4>Location: ${feature.properties.place}</h4>`));
      },
      style: styleInfo
    }).addTo(bigOnes);
    bigOnes.addTo(map)
    //close the major quakes get json
  });

  // Create +30 days significant Earthquake Layer
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson").then(function (data) {

    function styleInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor3(feature.properties.mag),
        color: "#000000",
        radius: getRadius3(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    };
    // This function determines the radius of the earthquake marker based on its magnitude.

    function getRadius3(magnitude) {
      if (magnitude >= 6) {
        return magnitude * 7;
      }
      else if (magnitude > 5) {
        return magnitude * 5;
      }
      else {
        return magnitude * 3;
      }
    };
    function getColor3(magnitude) {
      if (magnitude >= 6) {
        return "red";
      }
      else if (magnitude > 5) {
        return "orange";
      }
      else {
        return "blueviolet";
      }
    }
    L.geoJSON(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng)
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup((`<h3>Magnitude: ${feature.properties.mag}</h3><hr><h4>Location: ${feature.properties.place}</h4>`));
      },
      style: styleInfo
    }).addTo(monthBack);

    let legend2 = L.control({
      position: 'bottomright'
    });

    legend2.onAdd = function () {

      var div = L.DomUtil.create('div', 'info legend');
      magnitudes = [4.5, 5, 6];
      colors = [
        "blueviolet",
        "orange",
        "red"
      ];
      title = "Major & Significant";

      // put header on legend
      div.innerHTML += "<p>" + title + "</p> ";
      // loop through our density intervals and generate a label with a colored square for each interval
      for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
      }

      return div;

    };
    // Add major quakes legend when selected
    map.on('overlayadd', function (eventLayer) {
      if (eventLayer.name === "Significant Quakes (< Month)" || eventLayer.name === "Major Earthquakes (< Week)") {
        legend2.addTo(map);
      }
    });
    // remove major quakes legend when deselected
    map.on('overlayremove', function (eventLayer) {
      if ((eventLayer.name === "Significant Quakes (< Month)" && map.hasLayer(bigOnes) !== true)
        || (eventLayer.name === "Major Earthquakes (< Week)" && map.hasLayer(monthBack) !== true)
      ) {
        this.removeControl(legend2);
      }
    });
    legend2.addTo(map)
    //close the monthback get json
  });
  // Add all quakes legend when selected
  map.on('overlayadd', function (eventLayer) {
    if (eventLayer.name === "All Earthquakes (< Week)") {
      legend1.addTo(map);
    }
  });
  // remove all quakes legend when deselected
  map.on('overlayremove', function (eventLayer) {
    if (eventLayer.name === "All Earthquakes (< Week)") {
      this.removeControl(legend1);
    }
  });
  legend1.addTo(map);

  // close all earthquakes json
});


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
  DarkNav: navStreets,
  Satellite: satStreets,
  Dark: dark
};

// Create the earthquake layer for our map.
var earthquakes = new L.layerGroup();
var tectonicPlates = new L.layerGroup();
var bigOnes = new L.layerGroup();
var monthBack = new L.layerGroup();

var overlays = {
  "Tectonic Plates": tectonicPlates,
  "All Earthquakes (< Week)": earthquakes,
  "Major Earthquakes (< Week)": bigOnes,
  "Significant Quakes (< Month)": monthBack

};


// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
  center: [0, 0],
  zoom: 3,
  layers: [navStreets]
})


// We define an object that contains the overlays.
// This overlay will be visible all the time.

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// map.on('overlayadd', function (eventLayer) {
//   // Switch to the Significant quakes legend...
//      if (eventLayer.name === "Significant Quakes (< Month)") {
//         //  this.removeControl(legend1);
//          legend2.addTo(map);
//         }
//     // else { // Or switch to the all quakes legend...
//     //      this.removeControl(legend2);
//     //      legend1.addTo(this);
//     //     }
//   });  