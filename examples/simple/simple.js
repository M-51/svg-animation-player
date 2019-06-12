const simple = new SVGAnimationPlayer({
    interfaceAnimation: false,
});

simple.add({
    object: '#rect',
    animation: {
        transform: {
            range: [0, 3],
            translate: {
                x: {
                    to: 100,
                },
                y: {
                    to: 100,
                },
            },
        },
    },
});
