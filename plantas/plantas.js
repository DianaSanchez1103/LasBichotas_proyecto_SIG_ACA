var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
      "contributors",
    maxZoom: 18,
  }
);

var termicas = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Termicas",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_termica',
  attribution: "Natural Earth",
});

var fuentes = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Fuentes",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_fuentes',
  attribution: "Natural Earth",
});

var solar = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Solar",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_solar',
  attribution: "Natural Earth",
});

var eolica = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Eolica",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_eolica',
  attribution: "Natural Earth",
});

var geotermica = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Geotermica",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_geotermica',
  attribution: "Natural Earth",
});

var hidroelectrica = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Hidroelectricas",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_hidroelectrica',
  attribution: "Natural Earth",
});


let config = {
  center: [13.683056, -88.926667],
  minZoom: 9,
  maxZoom: 16,
  zoom: 9,
  layers: [osm, solar, eolica, geotermica, hidroelectrica, termicas],
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
