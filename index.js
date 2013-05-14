(function (root, factory) {
    if (typeof exports === 'object') {
        module.exports = factory(require('animator'));
    } else if (typeof define === 'function' && define.amd) {
        define(['animator'], factory);
    } else {
        root.marquee = factory(root.animator);
    }
}(this, function(animator){

    function manifestUnicorn(el) {
        // create a canvas for the el
        var css = getComputedStyle(el),
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            width = canvas.width = parseFloat(css.width),
            height = canvas.height = parseFloat(css.height);


        context.font = [
            css.fontVariant,
            css.fontWeight,
            css.fontSize,
            css.fontFamily
        ].join(' ');

        context.fillStyle = css.color;
        context.textBaseline = 'middle';
        context.fillText(el.innerText, 0, height / 2);

        // add the canvas
        el.parentNode.insertBefore(canvas, el);

        // save the original node
        canvas._original = el;

        // remove the element from the dom
        el.parentNode.removeChild(el);

        return canvas;
    }

    function marquee(targets) {
        var items;

        function restoreItems() {
            items.forEach(function(canvas) {
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
        items = targets.map(manifestUnicorn);

        return {
            items: items, 
            stop:  restoreItems
        };
    }

    return marquee;
}));