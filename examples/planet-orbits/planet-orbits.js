const s = new SVGAnimation();

s.add({
    object: '#test',
    animation: {
        transform: {
            translate: {
                x: t => 100 * Math.cos(5 * t),
                y: t => 100 * Math.sin(5 * t),
            },
        },
    },
}, {
    object: '#test2',
    animation: {
        transform: {
            local: true,
            range: [1],
            translate: {
                x: t => 100 * Math.cos(5 * t),
                y: t => 100 * Math.sin(5 * t),
            },
        },
    },
});

s.init();
