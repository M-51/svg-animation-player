const ex5 = new SVGAnimationPlayer();

const obj1 = {
    object: '#ex5-1',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'linear',
                },
            },
        },
    },
};

const obj2 = {
    object: '#ex5-2',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeInQuad',
                },
            },
        },
    },
};

const obj3 = {
    object: '#ex5-3',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeOutQuad',
                },
            },
        },
    },
};

const obj4 = {
    object: '#ex5-4',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeInOutQuad', // default easing
                },
            },
        },
    },
};

const obj5 = {
    object: '#ex5-5',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeInCubic',
                },
            },
        },
    },
};

const obj6 = {
    object: '#ex5-6',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeOutCubic',
                },
            },
        },
    },
};

const obj7 = {
    object: '#ex5-7',
    animation: {
        transform: {
            range: [0, 2],
            translate: {
                x: {
                    to: 80,
                    easing: 'easeInOutCubic',
                },
            },
        },
    },
};


ex5.add(obj1, obj2, obj3, obj4, obj5, obj6, obj7);
