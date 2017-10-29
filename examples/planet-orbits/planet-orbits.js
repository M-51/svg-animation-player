svganimation.settings = {
    interfaceSize: 0.75,
};

const test = new svganimation.Obj(document.getElementById('test'));
test.animation = {
    transform: {
        translate: {
            x: t => 100 * Math.cos(2 * t),
            y: t => 200 * Math.sin(2 * t),
        },
    },
};

svganimation.add(test);
