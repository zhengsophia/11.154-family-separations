var controller = new ScrollMagic.Controller();

// Activate title
new ScrollMagic.Scene({ triggerElement: '#main-title' })
  .setClassToggle('#main-title', 'active')
  .addTo(controller);

// Deactivate title
new ScrollMagic.Scene({
  triggerElement: '#spacer2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#main-title', 'deactive')
  .addTo(controller);

// Activate subheading
new ScrollMagic.Scene({
  triggerElement: '#reveal-subheading',
  triggerHook: 'onCenter',
})
  .setClassToggle('#reveal-subheading', 'active')
  .addTo(controller);

// Deactivate subheading
new ScrollMagic.Scene({
  triggerElement: '#main-content',
  triggerHook: 'onEnter',
})
  .setClassToggle('#reveal-subheading', 'deactive')
  .addTo(controller);

// First image
new ScrollMagic.Scene({ triggerElement: '#text1' })
  .setClassToggle('#img1', 'active')
  .addTo(controller);

// Second image
new ScrollMagic.Scene({ triggerElement: '#text2' })
  .setClassToggle('#img2', 'active')
  .addTo(controller);

// Third image
new ScrollMagic.Scene({ triggerElement: '#text3' })
  .setClassToggle('#img3', 'active')
  .addTo(controller);

// Last image
new ScrollMagic.Scene({ triggerElement: '#img4' })
  .setClassToggle('#img4', 'active')
  .addTo(controller);

// Map title
new ScrollMagic.Scene({ triggerElement: '#map', triggerHook: 'onEnter' })
  .setClassToggle('#map-title', 'active')
  .addTo(controller);

const position0 = {
  center: [-95.7129, 36.0902],
  zoom: 3.5,
  speed: 0.75,
  curve: 1.5,
};

const position1 = {
  center: [-73.9307, 40.8088],
  zoom: 10,
  speed: 0.75,
  curve: 1.5,
};

const pin = new ScrollMagic.Scene({
  triggerElement: '#map',
  triggerHook: 'onLeave',
})
  .setPin('#map')
  .setClassToggle('#cayuga-demo', 'send-to-front');

pin.addTo(controller);
// .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)

new ScrollMagic.Scene({
  triggerElement: '#scrollmap-content-1',
  triggerHook: 'onEnter',
})
  .on('enter', (event) => {
    console.log(event.type);
    map.flyTo(position1);
  })
  .on('leave', (event) => {
    console.log(event.type);
    map.flyTo(position0);
  })

  // .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: '#scrollmap-content-2' })
  .on('enter', (event) => {
    console.log(event.type);
    map.flyTo({
      center: [-85, 36],
      offset: [-200, 0],
      zoom: 7,
      speed: 0.75,
      curve: 1.5,
    });
  })
  .on('leave', (event) => {
    console.log(event.type);
    map.flyTo(position1);
  })

  // .addIndicators({name: "2 (duration: 0)"}) // add indicators (requires plugin)
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: '#last-thing' })
  .setClassToggle('#map', 'send-to-front')
  .on('enter', (event) => {
    map.flyTo(position0);
  })
  .on('leave', (event) => {
    map.flyTo(position1);
  })
  .addTo(controller);

new ScrollMagic.Scene({ triggerElement: '#last-thing' })
  .on('enter', (event) => {
    console.log('yo, entered:)');
    d3.select('#cayuga-demo').attr('class', 'send-to-back');
  })
  .on('leave', (event) => {
    d3.select('#cayuga-demo').attr('class', 'send-to-front');
  })
  .addTo(controller);
