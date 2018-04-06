function applyAttributeAnimation(object, key, animation) {
    const { currentAttributes } = object;
    const animationFunction = (time) => {
        const { value } = animation;
        currentAttributes[key] = value(time);
        object.setAttribute(key, currentAttributes[key]);
    };
    return animationFunction;
}

export default applyAttributeAnimation;
