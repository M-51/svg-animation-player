# svg-animation

Simple animation framework for SVG.

## Usage

SVG
```html
<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
<rect id="test1" x="-10" y="-10" width="20" height="20" transform="translate(-100, 0)"/>
</svg>
```

Javascript
```javascript
const test = new SVGAnimation({
    interfaceColor: '#f66',
});

test.add({
    object: '#test1',
    animation: {
        transform: [{
            range: [0, 1],
            translate: {
                x: {
                    to: 100,
                },
                y: t => 20 * t,
            },
            rotate: {
                to: 2 * Math.PI,
            },
        }, {
            range: [1, 2],
            easing: 'easeInOutCubic',
            translate: {
                x: {
                    to: -100,
                },
            },
        }],
        opacity: [{
            range: [0, 0.5],
            value: {
                from: 1,
                to: 0.5,
            },
        }, {
            range: [1.5, 2],
            value: {
                to: 1,
            },
        }],
    },
});
```

