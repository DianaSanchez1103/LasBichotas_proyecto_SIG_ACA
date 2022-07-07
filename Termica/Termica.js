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
  layers: "Termicas",
  format: "image/png",
  transparent: true,
  tiled: true,
  styles:'style_fuentes',
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

// fetching data from geojson
const poiLayers = L.layerGroup().addTo(map);

// center map on the clicked marker
function clickZoom(e) {
  map.setView(e.target.getLatLng(), zoom);
}

let geojsonOpts = {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.divIcon({
        className: feature.properties.amenity,
        iconSize: L.point(16, 16),
        html: feature.properties.amenity[0].toUpperCase(),
        popupAnchor: [3, -5],
      }),
    })
      .bindPopup(
        feature.properties.amenity +
          "<br><b>" +
          feature.properties.name +
          "</b>"
      )
      .on("click", clickZoom);
  },
};

const layersContainer = document.querySelector(".layers");

const layersButton = "all layers";

function generateButton(name) {
  const id = name === layersButton ? "all-layers" : name;

  const templateLayer = `
    <li class="layer-element">
      <label for="${id}">
        <input type="checkbox" id="${id}" name="item" class="item" value="${name}" checked>
        <span>${name}</span>
      </label>
    </li>
  `;

  layersContainer.insertAdjacentHTML("beforeend", templateLayer);
}

generateButton(layersButton);

// add data to geoJSON layer and add to LayerGroup
// const arrayLayers = ["Hidroélectrica", "Eólica", "Geotérmica","Térmica", "Solar"];

// arrayLayers.map((json) => {
//   generateButton(json);
//   fetchData(`./data/${json}.json`).then((data) => {
//     window["layer_" + json] = L.geoJSON(data, geojsonOpts).addTo(map);
//   });
// });

document.addEventListener("click", (e) => {
  const target = e.target;

  const itemInput = target.closest(".item");

  if (!itemInput) return;

  showHideLayer(target);
});

function showHideLayer(target) {
  if (target.id === "all-layers") {
    arrayLayers.map((json) => {
      checkedType(json, target.checked);
    });
  } else {
    checkedType(target.id, target.checked);
  }

  const checkedBoxes = document.querySelectorAll("input[name=item]:checked");

  document.querySelector("#all-layers").checked =
    checkedBoxes.length <= 3 ? false : true;
}

function checkedType(id, type) {
  map[type ? "addLayer" : "removeLayer"](window["layer_" + id]);

  map.fitBounds(window[["layer_" + id]].getBounds(), { padding: [50, 50] });

  document.querySelector(`#${id}`).checked = type;
}
 
