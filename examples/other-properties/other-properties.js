const ex2 = new SVGAnimationPlayer();

ex2.add({
    object: '#ex2',
    animation: {
        width: {
            range: [0, 4],
            value: {
                to: 50,
            },
        },
        'stroke-width': {
            range: [0, 4],
            value: t => 1 + Math.sin(t),
        },
    },
});
