// The value for 'accessToken' begins with 'pk...'
mapboxgl.accessToken =
  'pk.eyJ1IjoiMTU0LWZhbWlseS1zZXBhcmF0aW9ucyIsImEiOiJja3c4MGhobjJjbW9jMm5xMXNyd21xNXI5In0.hkF5HVL6mdh7v0M0eKaYPg';
const map = new mapboxgl.Map({
  container: 'map',
  // Replace YOUR_STYLE_URL with your style URL.
  style: 'mapbox://styles/154-family-separations/ckwa9vc0m5o4y14o3sodg0oaw',
  center: [-85.7129, 37.0902],
  //center: [-96, 37.8],
  zoom: 3.5,
});

map.on('mouseover', 'facilities', () => {
  console.log(
    'A mouseover event has occurred on a visible portion of the facilities layer.'
  );
});

map.on('click', (event) => {
  const features = map.queryRenderedFeatures(event.point, {
    layers: ['facilities'],
  });
  if (!features.length) {
    return;
  }
  const feature = features[0];

  console.log(feature);

  map.flyTo({
    center: feature.geometry.coordinates,
    offset: [-200, 0],
    zoom: 9,
    speed: 0.75,
    curve: 1.5,
  });

  const popup = new mapboxgl.Popup({
    offset: [0, -15],
    //closeOnClick: true,
  })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(
      `<h3>${feature.properties.FACILITY_APPROVED}</h3><p>${feature.properties.count}</p>`
    )
    .addTo(map);
});

map.on('click', function (e) {
  var features = map.queryRenderedFeatures(e.point, {
    layers: ['facilities'],
  });

map.on("click", function (e) {
        var features = map.queryRenderedFeatures(e.point, {
            layers: ["facilities"]
        });

        if (features.length) {
            //show name and value in sidebar
            document.getElementById('tooltip-name').innerHTML = `Facility: ${features[0].properties.FACILITY_APPROVED}`;
            document.getElementById('tooltip').innerHTML = `Number of children held: ${features[0].properties.count}`;
            //for troubleshooting - show complete features info
            //document.getElementById('tooltip').innerHTML = JSON.stringify(features, null, 2);
        } else {
            //if not hovering over a feature set tooltip to empty
            document.getElementById('tooltip-name').innerHTML = "";
            document.getElementById('tooltip').innerHTML = "";
        }
    });

    if (features.length) {
      //show name and value in sidebar
      document.getElementById('tooltip-name').innerHTML =
        features[0].properties.FACILITY_APPROVED;
      document.getElementById('tooltip').innerHTML = features[0].properties.count;
      //for troubleshooting - show complete features info
      //document.getElementById('tooltip').innerHTML = JSON.stringify(features, null, 2);
    } else {
      //if not hovering over a feature set tooltip to empty
      document.getElementById('tooltip-name').innerHTML = '';
      document.getElementById('tooltip').innerHTML = '';
    }
  });
    

map.scrollZoom.disable();

var nav = new mapboxgl.NavigationControl({
  showCompass: false,
  showZoom: true,
});

map.addControl(nav, 'top-left');
