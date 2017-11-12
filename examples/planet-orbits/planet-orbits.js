const test = new svganimation.Obj(document.getElementById('test'));

test.animation = {
    transform: [
        {
            range: [0, 4],
            translate: {
                x: t => 100 * Math.cos(2 * t),
                y: t => 100 * Math.sin(2 * t),
            },
            scale: t => Math.sin(t),
            rotate: t => t,
        },
        {
            range: [3, 5],
            translate: {
                x: t => 10 * t,
                y: t => 10 * t,
            },
        }],
};

svganimation.start(test);
