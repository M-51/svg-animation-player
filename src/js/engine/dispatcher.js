import transformControler from './animation-functions/transform/transform-controler';
import range from './range';

function applyRange(animationFunction, animation, loop) {
    if (animation.range) {
        loop.push(range(animationFunction, animation.range, animation.local, loop));
    } else {
        loop.push(animationFunction);
    }
}

function sort(key, animation, object, loop) {
    let animationFunction;
    if (key === 'transform') {
        animationFunction = transformControler(object, animation);
    }
    applyRange(animationFunction, animation, loop);
}

function separate(key, object, loop) {
    if (Array.isArray(object.animation[key])) {
        object.animation[key].forEach((item) => {
            sort(key, item, object, loop);
        });
    } else {
        sort(key, object.animation[key], object, loop);
    }
}

function prepare(objectsList) {
    const loop = [];

    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            separate(key, object, loop);
        });
    });
    return loop;
}

export default prepare;
