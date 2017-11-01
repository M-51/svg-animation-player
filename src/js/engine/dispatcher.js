import transformControler from './animation-functions/transform/transform-controler';

const animationLoop = [];

function prepare(objectsList) {
    objectsList.forEach((object) => {
        const keys = Object.keys(object.animation);
        keys.forEach((key) => {
            if (key === 'transform') {
                animationLoop.push(transformControler(object));
            }
        });
    });
}

export { prepare, animationLoop };
