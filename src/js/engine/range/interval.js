function interval(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range[0] && t <= animation.range[1]) {
                animationFunction(t - animation.range[0]);
            } else if (t > animation.range[1]) {
                deleteItemFromLoop(rangeFunction);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range[0] && t <= animation.range[1]) {
                animationFunction(t);
            } else if (t > animation.range[1]) {
                deleteItemFromLoop(rangeFunction);
            }
        };
    }
    return rangeFunction;
}

export default interval;
