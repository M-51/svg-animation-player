
const test = new svganimation.Obj(document.getElementById('test'));
test.animation = {
    transform: {
        translate: {
            x: t => 100 * Math.cos(2 * t),
            y: t => 150 * Math.sin(2 * t),
        },
    },
    r: {
        value: t => 20 + (5 * Math.sin(t)),
    },
};

const dupa = new svganimation.Create();

dupa.init(test);
