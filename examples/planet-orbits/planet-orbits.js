const s = new SVGAnimation();

s.add({
    object: '#test',
    animation: {
        transform: [{
            range: [0, 1],
            translate: {
                x: t => 100 + (100 * t),
                y: () => 0,
            },
        }, {
            range: [1, 3],
            local: true,
            translate: {
                x: t => 200 - (100 * t),
                y: () => 0,
            },
        }],
    },
});
