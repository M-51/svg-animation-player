
const test = new svganimation.Obj(document.getElementById('test'));
const test2 = new svganimation.Obj(document.getElementById('test2'));

test.animation = {
    transform: {
        translate: {
            x: t => 100 * Math.cos(2 * t),
            y: t => 200 * Math.sin(2 * t),
        },
    },
    r: t => t,
};
test2.animation = {
    transform: {
        translate: {
            x: t => -100 * Math.cos(2 * t),
            y: t => -200 * Math.sin(2 * t),
        },
    },
    r: t => t,
};

svganimation.add(test, test2);
