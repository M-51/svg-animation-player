const test = new svganimation.Obj(document.getElementById('test'));

test.animation = {
    transform: [
        {
            range: [2, 6],
            translate: {
                x: t => 100 * Math.cos(2 * t),
                y: t => 100 * Math.sin(2 * t),
            },
            scale: t => Math.sin(t),
            rotate: t => t,
        },
        {
            range: [7, 10],
            translate: {
                x: t => 100 * t,
                y: t => 100 * t,
            },
        }],
    'dupa-kupa': 7,
};

svganimation.start(test);
