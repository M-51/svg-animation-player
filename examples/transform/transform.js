const ex1 = new SVGAnimationPlayer();
ex1.add({
    object: '#ex1',
    animation: {
        transform: {
            range: [0, 3],
            translate: {
                x: {
                    to: 80,
                },
                y: t => 10 * Math.sin(4 * t),
            },
            rotate: {
                to: 2 * Math.PI,
            },
            scale: t => Math.sin(t) + 1,
        },
    },
});
