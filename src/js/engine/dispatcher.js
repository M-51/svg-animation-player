import transformControler from './animation-functions/transform/transform-controler';

const animationLoop = [];

function sort(key, object) {
    if (key === 'transform') {
        if (Array.isArray(object.animation.transform)) {
            object.animation.transform.forEach((item) => {
                animationLoop.push(transformControler(object, item));
            });
        } else {
            animationLoop.push(transformControler(object, object.animation.transform));
        }
    } else {
        console.log(key);
    }
}

function prepare(objectsList) {
    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            sort(key, object);
        });
    });
}

export { prepare, animationLoop };
