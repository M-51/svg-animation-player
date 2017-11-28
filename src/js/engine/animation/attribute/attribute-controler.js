function applyAttributeAnimation(object, key) {
    const animationFunction = (time) => {
        const { value } = object.animation[key];
        object.setAttribute(key, value(time));
    };
    return animationFunction;
}

export default applyAttributeAnimation;
