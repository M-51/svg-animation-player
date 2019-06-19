const ex6 = new SVGAnimationPlayer();

ex6.add({
    object: '#ex6',
    animation: {
        width: [
            {
                range: 1,
                value: 20,
            },
            {
                range: 2,
                value: 40,
            },
            {
                range: 3,
                value: 10,
            },
            {
                range: 4,
                value: 50,
            },
        ],
    },
});
