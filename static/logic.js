
var map = L.map("map").setView([35, -99], 4.3);

// Add a tile layer
L.tileLayer('https://api.maptiler.com/maps/positron/{z}/{x}/{y}.png?key=G18kR4B5cKkYaH1F1cW3',
{attribution:'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}
).addTo(map)




var data = clinicalTrials[0];
console.log(data);

var myURL = ("https://i.ibb.co/VNqwM47/icon-512x512-2x.png")

var myIcon = L.icon({
  iconUrl: myURL,
  iconSize: [48, 48]
});

var markerClusters = L.markerClusterGroup();

for (var i = 0; i < data.length; ++i) {
  var popupContent = 
    '<br/><b>FACILITY:<b>   ' + data[i].facility +
    '<br/><b>Brief Title:<b>' + data[i].brieftitle +
    '<br/><b>Enrollment Count:</b> ' + data[i].enrollmentcount +
    '<br/><b>Contact Name:</b> ' + data[i].contactname +
    '<br/><b>Contact Phone:</b> ' + data[i].contactphone;

    var popupOptions =
    {
      'maxWidth': '500',
      'className': 'another-popup'
    }
  var m = L.marker([data[i].latitude, data[i].longitude], { icon: myIcon })
    .bindPopup(popupContent, popupOptions);

  markerClusters.addLayer(m);
}

map.addLayer(markerClusters);
