
const circle = new svganimation.Obj(document.getElementById('test'));
circle.animation = {
    transform: {
        translate: {
            x: t => 100 * Math.cos(5 * t),
            y: t => 100 * Math.sin(5 * t),
        },
    },
    r: {
        value: t => 20 + (5 * Math.sin(t)),
    },
};

const animation1 = new svganimation.Create();

animation1.init(circle);
