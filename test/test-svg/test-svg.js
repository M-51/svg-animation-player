const testSvg = new SVGAnimationPlayer({
    interfaceAnimation: false,
});

testSvg.add({
    object: '#rect',
    animation: {
        transform: {
            range: [0, 0.1],
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
