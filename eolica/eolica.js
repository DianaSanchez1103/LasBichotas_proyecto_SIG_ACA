var osm = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    attribution:
      '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>' +
      "contributors",
    maxZoom: 18,
  }
);

var eolica = L.tileLayer.wms("http://localhost:8080/geoserver/cnr/wms", {
  layers: "Eolica",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_eolica',
  attribution: "Natural Earth",
});

let config = {
  center: [13.683056, -88.926667],
  minZoom: 9,
  maxZoom: 16,
  zoom: 9,
  layers: [osm, eolica],
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

