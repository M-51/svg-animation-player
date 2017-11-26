function oneTime(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(t - animation.range);
                deleteItemFromLoop(rangeFunction);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(t);
                deleteItemFromLoop(rangeFunction);
            }
        };
    }

    return rangeFunction;
}

export default oneTime;
