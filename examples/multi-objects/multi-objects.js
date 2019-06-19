const ex4 = new SVGAnimationPlayer();

ex4.add({
    object: '#ex4-1',
    animation: {
        transform: {
            range: [0, 1],
            translate: {
                x: {
                    to: 70,
                },
            },
        },
    },
}, {
    object: '#ex4-2',
    animation: {
        transform: {
            range: [0.2, 1.2],
            translate: {
                x: {
                    to: 70,
                },
            },
        },
    },
}, {
    object: '#ex4-3',
    animation: {
        transform: {
            range: [0.4, 1.4],
            translate: {
                x: {
                    to: 70,
                },
            },
        },
    },
});
