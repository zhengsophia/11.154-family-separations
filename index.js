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
