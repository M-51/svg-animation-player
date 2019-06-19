const ex8 = new SVGAnimationPlayer();

const rects = Array.from(document.getElementsByClassName('ex8-rect'));

rects.forEach((rect, index) => {
    ex8.add({
        object: rect,
        animation: {
            transform: {
                range: [index / 5, (index / 5) + 1],
                translate: {
                    x: {
                        to: 80,
                    },
                },
            },
        },
    });
});
