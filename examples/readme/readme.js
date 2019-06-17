const test = new SVGAnimationPlayer({
    interfaceColor: '#666',
});

test.add({
    object: '#test1',
    animation: {
        transform: [{
            range: [0, 1],
            translate: {
                x: {
                    to: 150,
                },
                y: t => 100 + 20 * t,
            },
            rotate: {
                to: 2 * Math.PI,
            },
        }, {
            range: [1, 2],
            easing: 'easeInOutCubic',
            translate: {
                x: {
                    to: 0,
                },
            },
        }],
        opacity: [{
            range: [0, 0.5],
            value: {
                from: 1,
                to: 0.5,
            },
        }, {
            range: [1.5, 2],
            value: {
                to: 1,
            },
        }],
    },
});
