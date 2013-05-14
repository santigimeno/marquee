var marquee = require('../');

window.addEventListener('load', function() {
    var animation = marquee('h1');

    setTimeout(animation.stop, 1000);
});