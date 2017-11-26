const test = new svganimation.Obj(document.getElementById('test'));

test.animation = {
    transform:
        [{
            range: [0, 1],
            local: true,
            translate: {
                x: t => 100 * Math.cos(2 * t),
                y: t => 100 * Math.sin(2 * t),
            },
        }
        ],
    r: t => 2 * t,
};

const dupa = new svganimation.Create();

dupa.settings = {
    showInterface: false,
};

dupa.init(test);
