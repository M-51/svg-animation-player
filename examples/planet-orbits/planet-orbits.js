const test = new svganimation.Obj(document.getElementById('test'));

test.animation = {
    transform:
        {
            range: 1,
            local: true,
            translate: {
                x: t => 100 * Math.cos(2 * t),
                y: t => 100 * Math.sin(2 * t),
            },
            // scale: t => Math.sin(t),
            // rotate: t => t,
        },
};

const dupa = new svganimation.Create();

dupa.settings = {
    showInterface: false,
};

dupa.init(test);
