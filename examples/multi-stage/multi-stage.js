const ex3 = new SVGAnimationPlayer();

ex3.add({
    object: '#ex3',
    animation: {
        transform: [{
            range: [0, 1],
            translate: {
                x: {
                    to: 70,
                },
            },
        }, {
            range: [1, 2],
            translate: {
                y: {
                    to: 70,
                },
            },
        }, {
            range: [2, 3],
            translate: {
                x: {
                    to: 0,
                },
            },
        }, {
            range: [3, 4],
            translate: {
                y: {
                    to: 0,
                },
            },
        }],
    },
});
