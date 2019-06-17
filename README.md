# svg-animation-player

Simple animation library for SVG. With player included.

## Install
#### NPM
```javascript
$ npm install svg-animation-player --save
```

## Usage

SVG:
```html
<svg viewBox="-100 -100 200 200" xmlns="http://www.w3.org/2000/svg" version="1.1">
    <rect id="test1" x="-10" y="-10" width="20" height="20" transform="translate(0, 100)"/>
</svg>
```

Javascript:
```javascript
const test = new SVGAnimationPlayer({
    interfaceColor: '#666',
});

test.add({
    object: '#test1',
    animation: {
        transform: [{
            range: [0, 1],
            translate: {
                x: {
                    to: 150,
                },
                y: t => 100 + 20 * t,
            },
            rotate: {
                to: 2 * Math.PI,
            },
        }, {
            range: [1, 2],
            easing: 'easeInOutCubic',
            translate: {
                x: {
                    to: 0,
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
[Example demo](https://m-51.github.io/svg-animation/readme-example/readme.svg)


#### Options
* `showInterface` - Boolean (True/False), default - `True`, Enable or disable interface
* `interfaceAnimation` - Boolean (True/False), default - `True`, Enable or diable interface animation
* `interfaceSize` - Number (0 - 10), default - `1`, Size of interface
* `interfaceColor` - Color (HTML color or "none"), default - `#000`, Color of interface or `none` - Use CSS to style
* `interfacePosition` - Array ([x, y]) or `auto` (bottom left), default `auto`, Position of interface

#### Methods
* `SVGAnimationPlayer.play()` - Start animation
* `SVGAnimationPlayer.pause()` - Pause animation
* `SVGAnimationPlayer.end()` - End animation
* `SVGAnimationPlayer.refresh()` - Refresh animation
* `SVGAnimationPlayer.add()` - Add objects to animation


