var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
      "contributors",
    maxZoom: 18,
  }
);


var fuentes = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Solar",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_fuentes',
  attribution: "Natural Earth",
});

// var energy = L.tileLayer.wms("http://localhost:8080/geoserver/sig/wms", {
//   layers: "total_energy",
//   format: "image/png",
//   transparent: true,
//   tiled: true,
//   styles:'style_fuentes',
//   attribution: "Natural Earth",
// });

var rios = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Rios",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles: 'style_rios',
  attribution: "Natural Earth",
});

let config = {
  center: [13.683056, -88.926667],
  minZoom: 9,
  maxZoom: 12,
  zoom: 9,
  layers: [osm, fuentes],
  scrollWheelZoom: true,
};

var map = L.map("map", config);

L.control.scale().addTo(map);
// coordinates limiting the map
function getBounds() {
  const southWest = new L.LatLng(12.867368, -87.146301);
  const northEast = new L.LatLng(14.610495, -90.661583);
  return new L.LatLngBounds(southWest, northEast);
}

// set maxBounds
map.setMaxBounds(map.getBounds());

// zoom the map to the polyline
map.fitBounds(getBounds(), { reset: true });

var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
 var div = L.DomUtil.create('div', 'info legend');
 div.innerHTML +=
 '<img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=10&HEIGHT=10&LAYER=cnr:Fuentes&legend_options=fontName:Times%20New%20Roman;fontAntiAliasing:true;fontColor:0x000033;fontSize:14;bgColor:0xFFFFEE;dpi:180">';
 return div;
};
legend.addTo(map);

// async function to load geojson
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
  }
}

