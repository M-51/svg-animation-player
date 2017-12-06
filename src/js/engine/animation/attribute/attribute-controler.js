function applyAttributeAnimation(object, key, animation) {
    const animationFunction = (time) => {
        const { value } = animation;
        object.setAttribute(key, value(time));
    };
    return animationFunction;
}

export default applyAttributeAnimation;
