function infiniteEndpoint(animationFunction, animation) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range[0]) {
                animationFunction(t - animation.range[0]);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range[0]) {
                animationFunction(t);
            }
        };
    }
    return rangeFunction;
}

export default infiniteEndpoint;
