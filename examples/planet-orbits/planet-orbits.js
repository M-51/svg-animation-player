

const test = new svganimation.Obj(document.getElementById('test'));


test.animation = {
    transform: {
        translate: {
            x: t => 100 * Math.cos(2 * t),
            y: t => 100 * Math.sin(2 * t),
        },
        scale: t => Math.sin(t),
        rotate: t => t,
    },
};


svganimation.start(test);
