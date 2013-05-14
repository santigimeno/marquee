# marquee

Marquee all the things!  

First, start by adding elements to your page.  Just like any other normal day:

```html
<h1>This is a test</h1>
```

Then, make everything better with marquee:

```js
marquee('h1');
```

There are some configuration options also:

```js
// initialise the speed
marquee('h1', { 
    speed: 250, // default speed = 1000, set speed to 4x
    freezeDelay: 1000 // freeze for a second once one marquee iteration is complete
});
```