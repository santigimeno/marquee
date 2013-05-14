(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('animator'));
    } else if (typeof define === 'function' && define.amd) {
        define(['animator'], factory);
    } else {
        root.marquee = factory(root.animator);
    }
}(this, function(animator){

    function manifestUnicorn(el, options) {
        // create a canvas for the el
        var opts = options || {},
            css = getComputedStyle(el),
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            width = canvas.width = parseFloat(css.width),
            height = canvas.height = parseFloat(css.height),
            speed = opts.speed || 1,
            xPos = 0;

        context.font = [
            css.fontVariant,
            css.fontWeight,
            css.fontSize,
            css.fontFamily
        ].join(' ');

        context.fillStyle = css.color;
        context.textBaseline = 'middle';

        // add the canvas
        el.parentNode.insertBefore(canvas, el);

        // save the original node
        canvas._original = el;

        // create the animation
        canvas._animation = animator(function(tick) {
            var text = el.innerText;

            context.clearRect(0, 0, width, height);

            // draw the two marquee sections
            context.fillText(text, xPos, height / 2);
            context.fillText(text, xPos + width, height / 2);

            // increment the xpos
            xPos -= speed;

            if (xPos < -width) {
                xPos = 0;
            }
        });

        // remove the element from the dom
        el.parentNode.removeChild(el);

        return canvas;
    }

    function marquee(targets, opts) {
        var items;

        function restoreItems() {
            items.forEach(function(canvas) {
                // stop the animation
                canvas._animation.stop();

                canvas.parentNode.insertBefore(canvas._original, canvas);
                canvas.parentNode.removeChild(canvas);
            });
        }

        // if the target is a string, then get qsa that puppy
        if (typeof targets == 'string' || (targets instanceof String)) {
            targets = [].slice.call(document.querySelectorAll(targets));
        }

        // ensure we have an array for targets
        targets = [].concat(targets || []);

        // iterate through the targets and make magic happen
        items = targets.map(function(target) {
            return manifestUnicorn(target, opts);
        });

        return {
            items: items, 
            stop:  restoreItems
        };
    }

    return marquee;
}));