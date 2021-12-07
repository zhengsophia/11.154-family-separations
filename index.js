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

// Activate Caption
new ScrollMagic.Scene({
  triggerElement: '#spacer2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#bubble_caption', 'active')
  .addTo(controller);

// Deactivate Caption
new ScrollMagic.Scene({
  triggerElement: '#spacer3',
  triggerHook: 'onEnter',
})
  .setClassToggle('#bubble_caption', 'deactive')
  .addTo(controller);

// Activate First Body of Text + Image
new ScrollMagic.Scene({
  triggerElement: '#content-1',
  triggerHook: 'onEnter',
})
  .setClassToggle('#heading-1a', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-1',
  triggerHook: 'onEnter',
})
  .setClassToggle('#heading-1b', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-1',
  triggerHook: 'onEnter',
})
  .setClassToggle('#text1', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-1',
  triggerHook: 'onEnter',
})
  .setClassToggle('#img1', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-1',
  triggerHook: 'onEnter',
})
  .setClassToggle('#image_caption1', 'active')
  .addTo(controller);

// Deactivate First Body of Text + Image
new ScrollMagic.Scene({
  triggerElement: '#spacer4',
  triggerHook: 'onCenter',
})
  .setClassToggle('#heading-1a', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer4',
  triggerHook: 'onCenter',
})
  .setClassToggle('#heading-1b', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer4',
  triggerHook: 'onCenter',
})
  .setClassToggle('#text1', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer4',
  triggerHook: 'onCenter',
})
  .setClassToggle('#img1', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer4',
  triggerHook: 'onCenter',
})
  .setClassToggle('#image_caption1', 'deactive')
  .addTo(controller);

// Activate Second Body of Text + Image
new ScrollMagic.Scene({
  triggerElement: '#content-2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#heading-2', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#text2', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#img2', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-2',
  triggerHook: 'onEnter',
})
  .setClassToggle('#image_caption2', 'active')
  .addTo(controller);

// Deactivate Second Body of Text + Image
new ScrollMagic.Scene({
  triggerElement: '#spacer5',
  triggerHook: 'onCenter',
})
  .setClassToggle('#heading-2', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer5',
  triggerHook: 'onCenter',
})
  .setClassToggle('#text2', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer5',
  triggerHook: 'onCenter',
})
  .setClassToggle('#img2', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer5',
  triggerHook: 'onCenter',
})
  .setClassToggle('#image_caption2', 'deactive')
  .addTo(controller);

// Activate Third Body of Text + Image
new ScrollMagic.Scene({
  triggerElement: '#content-3',
  triggerHook: 'onEnter',
})
  .setClassToggle('#heading-3', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-3',
  triggerHook: 'onEnter',
})
  .setClassToggle('#text3', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-3',
  triggerHook: 'onEnter',
})
  .setClassToggle('#img3', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#content-3',
  triggerHook: 'onEnter',
})
  .setClassToggle('#image_caption3', 'active')
  .addTo(controller);

// Deactivate Third Body of Text + Image

new ScrollMagic.Scene({
  triggerElement: '#spacer6',
  triggerHook: 'onCenter',
})
  .setClassToggle('#heading-3', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer6',
  triggerHook: 'onCenter',
})
  .setClassToggle('#text3', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer6',
  triggerHook: 'onCenter',
})
  .setClassToggle('#img3', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer6',
  triggerHook: 'onCenter',
})
  .setClassToggle('#image_caption3', 'deactive')
  .addTo(controller);

// Activate Fourth Image

new ScrollMagic.Scene({
  triggerElement: '#img4',
  triggerHook: 'onEnter',
})
  .setClassToggle('#img4', 'active')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#img4',
  triggerHook: 'onEnter',
})
  .setClassToggle('#image_caption4', 'active')
  .addTo(controller);

// Deactivate Fourth Image

new ScrollMagic.Scene({
  triggerElement: '#spacer7',
  triggerHook: 'onCenter',
})
  .setClassToggle('#img4', 'deactive')
  .addTo(controller);

new ScrollMagic.Scene({
  triggerElement: '#spacer7',
  triggerHook: 'onCenter',
})
  .setClassToggle('#image_caption4', 'deactive')
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

// Cayuga
const position1 = {
  center: [-73.9307, 40.8088],
  offset: [-500, 0],
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

// Scene 1, on enter, fly to Cayuga
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

// Scene 2, stay at Cayuga, show sidebar
new ScrollMagic.Scene({ triggerElement: '#scrollmap-content-2' })
  .setClassToggle('#cayuga-demo', 'active')
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
