const ex1 = new SVGAnimationPlayer();
ex1.add({
    object: '#ex3',
    animation: {
        transform: {
            range: [0, 3],
            translate: {
                x: {
                    to: 100,
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
