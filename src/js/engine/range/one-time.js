function oneTime(animationFunction, animation, deleteItemFromLoop) {
    let rangeFunction;
    if (animation.local) {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(0);
                deleteItemFromLoop(rangeFunction);
            }
        };
    } else {
        rangeFunction = (t) => {
            if (t >= animation.range) {
                animationFunction(animation.range);
                deleteItemFromLoop(rangeFunction);
            }
        };
    }

    return rangeFunction;
}

export default oneTime;
