mapboxgl.accessToken = 'pk.eyJ1IjoiMTU0LWZhbWlseS1zZXBhcmF0aW9ucyIsImEiOiJja3c4MGhobjJjbW9jMm5xMXNyd21xNXI5In0.hkF5HVL6mdh7v0M0eKaYPg';

const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/154-family-separations/ckwa9vc0m5o4y14o3sodg0oaw', // style URL
center: [-98.58, 39.8], // starting position [lng, lat]
zoom: 3.8 // starting zoom
});

map.scrollZoom.disable();

/* 
    Add an event listener that runs
      when a user clicks on the map element.
    */
    // map.on('click', (event) => {
    //   // If the user clicked on one of your markers, get its information.
    //   const features = map.queryRenderedFeatures(event.point, {
    //     layers: ['YOUR_LAYER_NAME'] // replace with your layer name
    //   });
    //   if (!features.length) {
    //     return;
    //   }
    //   const feature = features[0];

      // Code from the next step will go here.
    // });