const msgs = [];
let consoleEl;

window.DEBUG = {
  ...window.DEBUG,
  log: function() {
    setTimeout(() => {
      // log in dev console as normal
      console.log(...arguments);
      // keep track of the last 5 messages
      msgs.push([...arguments].map(e => JSON.stringify(e)).join(' '));
      while (msgs.length > 5) {
        msgs.shift();
      }
      // log last 5 messages in console UI
      consoleEl?.setAttribute('value', msgs.join('\n'));
    }, 100);
  }  
};

AFRAME.registerComponent('debug-console', {
  sceneOnly: true,
  init: function() {
    // create a console UI
    consoleEl = document.createElement('a-text');
    consoleEl.setAttribute('align', 'left');
    consoleEl.setAttribute('font', 'monoid'),
    consoleEl.setAttribute('color', 'black');
    consoleEl.setAttribute('position', '-2.25 -0.25 -3.5');

    // add it to the active camera
    const camera = document.querySelector('a-camera');
    camera.appendChild(consoleEl);
  }
});