var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
      "contributors",
    maxZoom: 18,
  }
);

var municipio = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Municipios",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_municipios',
  attribution: "Natural Earth",
});

var cerros = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Cerros",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_cerros',
  attribution: "Natural Earth",
});

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
  layers: [osm, municipio, cerros, rios],
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

  
