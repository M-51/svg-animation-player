import transformControler from './animation-functions/transform/transform-controler';
import range from './range';

const animationLoop = [];

function applyRange(animationFunction, animation) {
    if (animation.range) {
        animationLoop.push(range(animationFunction, animation.range));
    } else {
        animationLoop.push(animationFunction);
    }
}

function sort(key, animation, object) {
    let animationFunction;
    if (key === 'transform') {
        animationFunction = transformControler(object, animation);
    }
    applyRange(animationFunction, animation);
}

function separate(key, object) {
    if (Array.isArray(object.animation[key])) {
        object.animation[key].forEach((item) => {
            sort(key, item, object);
        });
    } else {
        sort(key, object.animation[key], object);
    }
}

function prepare(objectsList) {
    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            separate(key, object);
        });
    });
}

export { prepare, animationLoop };
