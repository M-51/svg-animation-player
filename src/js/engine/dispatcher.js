import transformControler from './animation-functions/transform/transform-controler';

const animationLoop = [];

function sort(key, animation, object) {
    if (key === 'transform') {
        animationLoop.push(transformControler(object, animation));
    }
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
