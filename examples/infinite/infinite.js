const ex7 = new SVGAnimationPlayer();

ex7.add({
    object: '#ex7',
    animation: {
        transform: {
            translate: {
                x: t => 30 * Math.cos(t),
                y: t => 30 * Math.sin(t),
            },
        },
    },
});
